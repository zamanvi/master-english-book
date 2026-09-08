import Footer from "../components/Footer/Footer";
import getWebSection from "../../../lib/getWebSection";
import getWebChapterData from "../../../lib/getWebChapterData";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import cardImage from "../../../public/image/bookCoverFs.jpg";

// Bangladesh - the site's default audience/section. Fully separate
// environment from international/layout.js: its own header, sidebar,
// footer, and its own Website Section ("bangladesh") for content -
// see the Learnify backend's WebSectionController for that structure.

const siteURL = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://www.masterenglishbook.com";

export const metadata = {
  title: "দূর্বলদের Master English Book Part - I",
  description:
    "দূর্বলদের Master English Book Part I — a free structured English learning resource in Bengali by Red Rose Corporation. Read chapters, watch video lessons, and improve your English step by step.",
  keywords: "master english book, english learning bengali, ইংরেজি শিক্ষা, english grammar bangla, red rose corporation",
  verification: {
    google: "M0MK3nrHsamo73lbLU8-lwBKzCFfoSBfyLi-kL0z160",
  },
  alternates: {
    canonical: siteURL,
  },
  openGraph: {
    title: "দূর্বলদের Master English Book Part - I",
    description: "A free structured English learning resource in Bengali by Red Rose Corporation.",
    url: siteURL,
    siteName: "Master English Book",
    images: [{ url: cardImage.src, width: 1200, height: 630, alt: "Master English Book cover" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "দূর্বলদের Master English Book Part - I",
    description: "A free structured English learning resource in Bengali by Red Rose Corporation.",
    images: [cardImage.src],
  },
};

export default async function MainLayout({ children }) {
  const bookData = await getWebSection("bangladesh");
  const allChapters = bookData?.success?.data?.chapters?.data;

  const chapterDataPromises = allChapters?.map(async (chapter) => {
    const chapterData = await getWebChapterData(chapter.slug);
    return { chapter, chapterContent: chapterData?.success?.data?.lessons?.data };
  }) || [];

  const chaptersWithContent = await Promise.all(chapterDataPromises);

  return (
    <>
      <div className="max-w-[1366px] lg:w-11/12 mx-auto">
        <Navbar chaptersWithContent={chaptersWithContent} />
        <div className="flex md:max-h-[95vh]">
          <Sidebar chaptersWithContent={chaptersWithContent} />
          <main className="flex-1 overflow-y-auto bg-white min-h-[80vh]">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
