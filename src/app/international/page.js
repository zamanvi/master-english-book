import Link from "next/link";
import getWebSection from "../../../lib/getWebSection";
import getWebChapterData from "../../../lib/getWebChapterData";

export default async function InternationalHome() {
  const bookData = await getWebSection("international");
  const firstChapter = bookData?.success?.data?.chapters?.data?.[0];
  let firstLessonSlug = null;
  if (firstChapter) {
    const chapterData = await getWebChapterData(firstChapter.slug);
    firstLessonSlug = chapterData?.success?.data?.lessons?.data?.[0]?.slug;
  }

  const ctaHref = firstLessonSlug ? `/international/book/${firstLessonSlug}` : null;

  return (
    <div className="flex flex-col min-h-[80vh]">
      {/* Hero - dark premium banner, positions the section as a tools hub */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-6 md:px-10 py-16 md:py-24">
        {/* decorative glow accents */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-3xl">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-300 font-grotesk font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            100% Free · Instant Tools
          </span>

          <h1 className="font-baloo font-extrabold text-4xl md:text-5xl xl:text-6xl text-white leading-[1.1] mb-5">
            One Page. One Problem.
            <br className="hidden md:block" />{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Solved.
            </span>
          </h1>

          <p className="font-hind text-slate-300 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
            No sign-up, no app — pick a tool, fill it in, download. Free forever.
          </p>

          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <Link
              href="/international/osha-safety-tool"
              className="inline-flex items-center gap-2 bg-white text-slate-900 font-grotesk font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors text-sm"
            >
              Browse Free Tools →
            </Link>

            {ctaHref && (
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-grotesk font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors text-sm"
              >
                Start Reading →
              </Link>
            )}

            <Link
              href="/"
              className="text-slate-400 hover:text-white text-sm font-hind transition-colors"
            >
              or see our Bangladesh edition
            </Link>
          </div>

          {/* Mobile chapter hint */}
          {ctaHref && (
            <p className="md:hidden mt-6 text-slate-500 text-xs font-grotesk">
              Use the menu above to see all lessons ↑
            </p>
          )}
        </div>
      </section>

      {/* Free Tools */}
      <section className="flex-1 px-6 md:px-10 py-12 md:py-16 bg-slate-50">
        <div className="max-w-5xl">
          <p className="text-blue-600 font-grotesk font-semibold text-xs uppercase tracking-widest mb-2">
            Free Tools
          </p>
          <h2 className="font-baloo font-bold text-2xl md:text-3xl text-slate-900 mb-8">
            Pick a tool, get it done
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Link
              href="/international/osha-safety-tool"
              className="group flex flex-col bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg rounded-2xl p-6 transition-all"
            >
              <span
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 text-2xl mb-4"
                aria-hidden="true"
              >
                ⚠️
              </span>
              <h3 className="font-grotesk font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                OSHA Safety Briefing &amp; Sign-In Sheet Generator
              </h3>
              <p className="font-hind text-slate-600 text-sm mb-4 flex-1">
                Generate a compliant safety briefing &amp; crew sign-in sheet as a
                printable PDF — free, in 30 seconds.
              </p>
              <span className="font-grotesk font-semibold text-blue-600 text-sm inline-flex items-center gap-1">
                Open Tool{" "}
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </Link>

            {/* Roadmap hint - more single-page tools are planned */}
            <div className="flex flex-col items-center justify-center bg-white/60 border border-dashed border-slate-300 rounded-2xl p-6 text-center">
              <span className="text-2xl mb-3" aria-hidden="true">
                ✨
              </span>
              <p className="font-grotesk font-semibold text-sm text-slate-500">
                More tools coming soon
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
