import Image from "next/image";
import Link from "next/link";
import getBook from "../../lib/getBook";
import getChapterData from "../../lib/getChapterData";
import appLogo from "../../public/image/appLogo.jpg";
import newApp1 from "../../public/image/NewApp1.jpg";
import newApp2 from "../../public/image/NewApp2.jpg";

export default async function Home() {
  const bookData = await getBook();
  const firstChapter = bookData?.success?.data?.chapters?.data?.[0];
  let firstLessonSlug = null;
  if (firstChapter) {
    const chapterData = await getChapterData(firstChapter.slug);
    firstLessonSlug = chapterData?.success?.data?.items?.data?.[0]?.slug;
  }

  const ctaHref = firstLessonSlug ? `/book/${firstLessonSlug}` : "/";

  return (
    <div className="flex flex-col min-h-[80vh]">
      {/* Hero */}
      <section className="flex-1 px-6 md:px-10 py-12 md:py-16">
        <p className="text-blue-600 font-grotesk font-semibold text-xs uppercase tracking-widest mb-4">
          সম্পূর্ণ বিনামূল্যে · বাংলায় ব্যাখ্যা
        </p>

        <h1 className="font-baloo font-extrabold text-3xl md:text-4xl xl:text-5xl text-slate-900 leading-tight mb-4">
          ইংরেজি শেখার সহজ পথ
        </h1>

        <p className="font-hind text-slate-600 text-base md:text-lg max-w-lg mb-8 leading-relaxed">
          বাংলায় ব্যাখ্যা করা Master English Book — ব্যাকরণ থেকে কথোপকথন
          পর্যন্ত ধাপে ধাপে শিখুন।
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { value: "২০০+", label: "পাঠ উপলব্ধ" },
            { value: "বিনামূল্যে", label: "সম্পূর্ণ ফ্রি" },
            { value: "ভিডিও", label: "প্রতিটি পাঠে" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-3"
            >
              <p className="font-baloo font-bold text-blue-700 text-lg leading-tight">
                {stat.value}
              </p>
              <p className="font-hind text-slate-500 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={ctaHref}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-grotesk font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
        >
          পড়া শুরু করুন →
        </Link>

        {/* Mobile chapter hint */}
        <p className="md:hidden mt-6 text-slate-400 text-xs font-grotesk">
          সব পাঠ দেখতে উপরের মেনু ব্যবহার করুন ↑
        </p>
      </section>

      {/* App Downloads */}
      <section className="border-t border-slate-100 px-6 md:px-10 py-8 bg-slate-50">
        <p className="font-hind text-slate-500 text-sm mb-5 text-center">
          আমাদের App সমূহ Play Store থেকে ডাউনলোড করুন
        </p>
        <div className="flex justify-center gap-5">
          <a
            href="https://play.google.com/store/apps/details?id=com.abmn.englishhub&pcampaignid=web_share"
            target="_blank"
            rel="noreferrer"
            title="Master English Book App"
          >
            <Image
              src={appLogo}
              width={64}
              alt="Master English Book App"
              className="rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.abmn.learnify&pcampaignid=web_share"
            target="_blank"
            rel="noreferrer"
            title="Learnify App"
          >
            <Image
              src={newApp1}
              width={64}
              alt="Learnify App"
              className="rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.abmn.redrosechating&pcampaignid=web_share"
            target="_blank"
            rel="noreferrer"
            title="Red Rose Chatting App"
          >
            <Image
              src={newApp2}
              width={64}
              alt="Red Rose Chatting App"
              className="rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            />
          </a>
        </div>
      </section>
    </div>
  );
}
