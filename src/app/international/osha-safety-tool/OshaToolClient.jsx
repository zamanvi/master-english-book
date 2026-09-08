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

      // Exposed for the markup's onclick="downloadPDF()" / onclick="printDocument()"
      window.downloadPDF = function downloadPDF(event) {
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Generating...';
        btn.disabled = true;

        setTimeout(() => {
          const opt = {
            margin: 5,
            filename: `Safety-Briefing-${dateInput.value || 'Document'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          };

          window.html2pdf().set(opt).from(preview).save();

          successMsg.classList.add('show');
          setTimeout(() => successMsg.classList.remove('show'), 3000);

          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 300);
      };

      window.printDocument = function printDocument() {
        const printWindow = window.open('', '', 'height=800,width=800');
        const previewHTML = preview.innerHTML;
        const fullHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Safety Briefing Sheet</title>
                    <style>
                        body { font-family: Arial, sans-serif; font-size: 11px; margin: 10px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 8px; }
                        th, td { border: 1px solid #000; padding: 4px; text-align: left; }
                        th { background: #f0f0f0; font-weight: bold; }
                        @media print { body { margin: 0; } }
                    </style>
                </head>
                <body>${previewHTML}</body>
                </html>
            `;
        printWindow.document.write(fullHTML);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
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
