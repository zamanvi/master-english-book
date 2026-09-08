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
      {/* Hero */}
      <section className="flex-1 px-6 md:px-10 py-12 md:py-16">
        <p className="text-blue-600 font-grotesk font-semibold text-xs uppercase tracking-widest mb-4">
          100% Free · Learn English Online
        </p>

        <h1 className="font-baloo font-extrabold text-3xl md:text-4xl xl:text-5xl text-slate-900 leading-tight mb-4">
          The Easy Path to Learning English
        </h1>

        <p className="font-hind text-slate-600 text-base md:text-lg max-w-lg mb-8 leading-relaxed">
          Master English Book — from grammar basics to everyday conversation,
          learn step by step, completely free.
        </p>

        {/* CTA */}
        {ctaHref ? (
          <Link
            href={ctaHref}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-grotesk font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Start Reading →
          </Link>
        ) : (
          <p className="font-hind text-slate-500 text-sm bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 max-w-md">
            Lessons for the International edition are being prepared and will
            be published here soon. In the meantime, check out our{" "}
            <Link href="/" className="text-blue-600 hover:underline font-semibold">
              Bangladesh edition
            </Link>
            .
          </p>
        )}

        {/* Mobile chapter hint */}
        {ctaHref && (
          <p className="md:hidden mt-6 text-slate-400 text-xs font-grotesk">
            Use the menu above to see all lessons ↑
          </p>
        )}
      </section>
    </div>
  );
}
