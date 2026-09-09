'use client';
import { useEffect, useRef } from 'react';

// The OSHA tool's markup (public/osha-safety-tool.html) is injected via
// dangerouslySetInnerHTML. That's fine for a full page load, but on a
// client-side Next.js navigation (any in-site <Link> click - the sidebar,
// the homepage card, the mobile menu), React sets this content through the
// DOM innerHTML API - and per the HTML spec, <script> tags inserted that
// way never execute. So all interactivity lives here instead, in a
// useEffect that re-runs on every real mount regardless of how the page
// was reached.
export default function OshaToolClient({ htmlContent }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const cleanupFns = [];

    function loadHtml2Pdf() {
      return new Promise((resolve, reject) => {
        if (window.html2pdf) {
          resolve();
          return;
        }
        const existing = document.querySelector('script[data-osha-html2pdf]');
        if (existing) {
          existing.addEventListener('load', () => resolve());
          existing.addEventListener('error', reject);
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.async = true;
        script.dataset.oshaHtml2pdf = 'true';
        script.addEventListener('load', () => resolve());
        script.addEventListener('error', reject);
        document.head.appendChild(script);
      });
    }

    function setup() {
      const root = containerRef.current;
      if (!root || cancelled) return;

      const $ = (id) => root.querySelector(`#${id}`);
      const dateInput = $('date');
      const companyInput = $('company');
      const locationInput = $('location');
      const supervisorInput = $('supervisor');
      const customNotesInput = $('customNotes');
      const crewCountInput = $('crewCount');
      const previewCompany = $('previewCompany');
      const previewLocation = $('previewLocation');
      const previewSupervisor = $('previewSupervisor');
      const previewDate = $('previewDate');
      const previewTopics = $('previewTopics');
      const previewNotes = $('previewNotes');
      const previewTable = $('previewTable');
      const successMsg = $('successMsg');
      const preview = $('preview');

      // Activate the two manual AdSense ad units in this markup. Loading
      // adsbygoogle.js (done site-wide in the root layout) is not enough
      // by itself for manually-placed <ins class="adsbygoogle"> slots -
      // each one needs its own push({}) call to actually request an ad,
      // same reasoning as everything else in this file: a <script> doing
      // this inline inside the injected HTML would never run on a
      // client-side navigation, so it happens here instead.
      root.querySelectorAll('ins.adsbygoogle').forEach((ins) => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          // Ad blocker or adsbygoogle.js failed to load - fail silently,
          // the rest of the tool doesn't depend on ads working.
        }
      });

      if (!dateInput) return; // markup not present (shouldn't happen)

      // Default date
      dateInput.valueAsDate = new Date();

      const topicsMap = {
        fall: 'Fall Protection & Ladder Safety',
        ppe: 'Personal Protective Equipment (PPE)',
        heat: 'Heat Illness Prevention',
        electrical: 'Electrical Hazard Awareness',
        scaffolding: 'Scaffolding Safety',
        excavation: 'Excavation & Trenching Safety',
        confined: 'Confined Space Entry',
      };

      function updatePreview() {
        previewCompany.textContent = companyInput.value || 'Company';
        previewLocation.textContent = locationInput.value || 'Location';
        previewSupervisor.textContent = supervisorInput.value || 'Supervisor';

        if (dateInput.value) {
          previewDate.textContent = new Date(dateInput.value).toLocaleDateString('en-US');
        }

        const topics = [];
        Object.keys(topicsMap).forEach((key) => {
          const box = $(key);
          if (box && box.checked) topics.push(topicsMap[key]);
        });
        previewTopics.innerHTML = topics.length > 0
          ? topics.map((t) => `<li>${t}</li>`).join('')
          : '<li>No topics selected</li>';

        previewNotes.textContent = customNotesInput.value || 'Site hazards here...';

        const crewCount = parseInt(crewCountInput.value, 10) || 10;
        let tableHTML = '';
        for (let i = 1; i <= crewCount; i++) {
          tableHTML += `<tr><td>${i}</td><td></td><td></td><td></td></tr>`;
        }
        previewTable.innerHTML = tableHTML;
      }

      const watched = [
        [companyInput, 'input'],
        [locationInput, 'input'],
        [dateInput, 'change'],
        [supervisorInput, 'input'],
        [customNotesInput, 'input'],
        [crewCountInput, 'change'],
      ];
      watched.forEach(([el, evt]) => {
        if (!el) return;
        el.addEventListener(evt, updatePreview);
        cleanupFns.push(() => el.removeEventListener(evt, updatePreview));
      });

      root.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.addEventListener('change', updatePreview);
        cleanupFns.push(() => checkbox.removeEventListener('change', updatePreview));
      });

      updatePreview();

      // html2canvas (bundled in html2pdf.js 0.10.1) cannot parse the CSS
      // oklch() color function and throws
      // "Attempting to parse an unsupported color function oklch",
      // which made "Download PDF" silently do nothing. This page renders
      // inside the main site, whose CSS (DaisyUI 4 theme tokens) sets
      // oklch() colors on :root / html / body; `color` then inherits into
      // every node, and html2canvas also chokes while cloning decorative
      // ::before/::after pseudo-elements that inherited it - a stage that
      // runs *before* its onclone hook, so onclone alone can't fix it.
      //
      // Fix: for the duration of the capture only, flip a data attribute
      // on <html> that activates an override stylesheet forcing every
      // colour-valued property (incl. -webkit-text-fill-color, which is
      // what html2canvas actually reads for text) to a plain rgb value.
      // The rgb is the browser's own conversion of the real inherited
      // colour, so on-screen nothing visibly changes; the attribute and
      // <style> are removed as soon as the PDF worker settles.
      function oklchToRgb(value, fallback) {
        try {
          const cx = document.createElement('canvas').getContext('2d');
          cx.fillStyle = fallback;
          cx.fillStyle = value; // invalid values leave fallback in place
          return cx.fillStyle;
        } catch (e) {
          return fallback;
        }
      }

      const PDF_FIX_ATTR = 'data-osha-pdf-capture';
      let pdfFixStyle = null;

      function enablePdfColorFix() {
        const text = oklchToRgb(getComputedStyle(document.body).color, '#334155');
        if (!pdfFixStyle) {
          pdfFixStyle = document.createElement('style');
          pdfFixStyle.dataset.oshaPdfFix = 'true';
        }
        // NB: the selector must include `html[attr]` itself, not just
        // `html[attr] *` - html2canvas reads the root element's own colour
        // and would still hit the un-overridden oklch there otherwise.
        pdfFixStyle.textContent =
          `html[${PDF_FIX_ATTR}], html[${PDF_FIX_ATTR}] *, ` +
          `html[${PDF_FIX_ATTR}] *::before, html[${PDF_FIX_ATTR}] *::after {` +
          `color:${text} !important;-webkit-text-fill-color:${text} !important;` +
          `-webkit-text-stroke-color:${text} !important;caret-color:${text} !important;` +
          `outline-color:${text} !important;text-decoration-color:${text} !important;` +
          `text-emphasis-color:${text} !important;column-rule-color:${text} !important;}` +
          `html[${PDF_FIX_ATTR}], html[${PDF_FIX_ATTR}] body { background-color:#ffffff !important; }`;
        if (!pdfFixStyle.isConnected) document.head.appendChild(pdfFixStyle);
        document.documentElement.setAttribute(PDF_FIX_ATTR, '');
      }

      function disablePdfColorFix() {
        document.documentElement.removeAttribute(PDF_FIX_ATTR);
        if (pdfFixStyle && pdfFixStyle.isConnected) pdfFixStyle.remove();
      }
      cleanupFns.push(disablePdfColorFix);

      // Exposed for the markup's onclick="downloadPDF()" / onclick="printDocument()"
      window.downloadPDF = function downloadPDF(event) {
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Generating...';
        btn.disabled = true;

        const restoreBtn = () => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        };
        const flash = (msg, isError) => {
          successMsg.textContent = msg;
          successMsg.style.background = isError ? '#fef2f2' : '';
          successMsg.style.color = isError ? '#991b1b' : '';
          successMsg.style.borderLeftColor = isError ? '#ef4444' : '';
          successMsg.classList.add('show');
          setTimeout(() => successMsg.classList.remove('show'), isError ? 6000 : 3000);
        };

        setTimeout(() => {
          if (typeof window.html2pdf !== 'function') {
            flash('PDF tool did not load — use the Print button and choose "Save as PDF".', true);
            restoreBtn();
            return;
          }

          const opt = {
            margin: 5,
            filename: `Safety-Briefing-${dateInput.value || 'Document'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, backgroundColor: '#ffffff' },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          };

          enablePdfColorFix();
          Promise.resolve(window.html2pdf().set(opt).from(preview).save())
            .then(() => {
              flash('Document downloaded successfully.', false);
            })
            .catch((err) => {
              console.error('OSHA tool: PDF generation failed', err);
              flash('Could not generate the PDF in this browser — use the Print button and choose "Save as PDF".', true);
            })
            .then(
              () => { disablePdfColorFix(); restoreBtn(); },
              () => { disablePdfColorFix(); restoreBtn(); }
            );
        }, 300);
      };

      // Prints the current page directly - a print-only stylesheet
      // (public/osha-safety-tool.html, @media print) hides everything
      // except #preview so only the document itself comes out. No popup
      // window involved, so there's nothing for a popup blocker to kill.
      // (The previous window.open()-based approach crashed with
      // "Cannot read properties of null" whenever the popup was blocked -
      // confirmed reproducible - because it never checked whether
      // window.open() actually returned a window.)
      window.printDocument = function printDocument() {
        window.print();
      };
    }

    loadHtml2Pdf()
      .then(() => {
        if (!cancelled) setup();
      })
      .catch(() => {
        // html2pdf failed to load (e.g. offline/CDN blocked) - still wire
        // up the live preview so the form isn't completely dead.
        if (!cancelled) setup();
      });

    return () => {
      cancelled = true;
      cleanupFns.forEach((fn) => fn());
      if (window.downloadPDF) delete window.downloadPDF;
      if (window.printDocument) delete window.printDocument;
    };
  }, [htmlContent]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
