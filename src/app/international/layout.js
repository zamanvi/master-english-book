import InternationalFooter from "../components/InternationalFooter/InternationalFooter";
import getWebSection from "../../../lib/getWebSection";
import getWebChapterData from "../../../lib/getWebChapterData";
import InternationalNavbar from "../components/InternationalNavbar/InternationalNavbar";
import InternationalSidebar from "../components/InternationalSidebar/InternationalSidebar";
import cardImage from "../../../public/image/bookCoverFs.jpg";

// International - fully separate environment from (main) (Bangladesh):
// its own header/sidebar/footer components, and its own Website Section
// ("international") for content - see the Learnify backend's
// WebSectionController for that structure.

const siteURL = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://www.masterenglishbook.com";

export const metadata = {
  title: "Master English Book — International",
  description:
    "Master English Book (International) — a free, structured English learning resource by Red Rose Corporation. Read chapters, watch video lessons, and improve your English step by step.",
  keywords: "master english book, learn english, english grammar, english lessons online, red rose corporation",
  alternates: {
    canonical: `${siteURL}/international`,
  },
  openGraph: {
    title: "Master English Book — International",
    description: "A free, structured English learning resource by Red Rose Corporation.",
    url: `${siteURL}/international`,
    siteName: "Master English Book",
    images: [{ url: cardImage.src, width: 1200, height: 630, alt: "Master English Book cover" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Master English Book — International",
    description: "A free, structured English learning resource by Red Rose Corporation.",
    images: [cardImage.src],
  },
};

export default async function InternationalLayout({ children }) {
  const bookData = await getWebSection("international");
  const allChapters = bookData?.success?.data?.chapters?.data;

  const chapterDataPromises = allChapters?.map(async (chapter) => {
    const chapterData = await getWebChapterData(chapter.slug);
    return { chapter, chapterContent: chapterData?.success?.data?.lessons?.data };
  }) || [];

  const chaptersWithContent = await Promise.all(chapterDataPromises);

  return (
    <>
      <div className="max-w-[1366px] lg:w-11/12 mx-auto">
        <InternationalNavbar chaptersWithContent={chaptersWithContent} />
        <div className="flex md:max-h-[95vh]">
          <InternationalSidebar chaptersWithContent={chaptersWithContent} />
          <main className="flex-1 overflow-y-auto bg-white min-h-[80vh]">
            {children}
          </main>
        </div>
      </div>
      <InternationalFooter />
    </>
  );
}
