import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import getBook from "../../lib/getBook";
import getChapterData from "../../lib/getChapterData";
import Navbar from "./components/Navbar/Navbar";
import ChapterList from "./components/ChapterList";
import Script from "next/script";
import cardImage from "../../public/image/bookCoverFs.jpg";


const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
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

export default async function RootLayout({ children }) {
  const bookData = await getBook();
  const allChapters = bookData?.success?.data?.chapters?.data;

  // Fetch all chapter data concurrently
  const chapterDataPromises = allChapters?.map(async (chapter) => {
    const chapterData = await getChapterData(chapter.slug);
    return { chapter, chapterContent: chapterData?.success?.data?.items?.data };
  }) || [];

  const chaptersWithContent = await Promise.all(chapterDataPromises);

  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7889299981957538"
          crossorigin="anonymous"
        ></Script>
      </head>
      <body className={`${ubuntu.className} max-w-[1366px] lg:w-11/12 mx-auto`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Master English Book",
                "url": siteURL,
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": { "@type": "EntryPoint", "urlTemplate": `${siteURL}/book/{search_term_string}` },
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Red Rose Corporation",
                "url": "https://corporation.redrosebd.com",
                "logo": `${siteURL}/image/logoDark.png`,
                "sameAs": [
                  "https://www.masterenglishbook.com"
                ]
              }
            ])
          }}
        />
        <Navbar chaptersWithContent={chaptersWithContent} />
        <div className="flex flex-col md:flex-row w-12/12 justify-between gap-3 md:mt-3">
          <div className="w-12/12 md:w-3/12 hidden md:block md:max-h-[95vh] overflow-y-auto">
            <h2 className="bg-[#075F8F] font-bold md:text-lg lg:text-xl xl:text-[22px] text-white px-2 py-1">
              Chapters
            </h2>
            <ul className="bg-[#dbeafeb0] pb-10 chapters">
              {chaptersWithContent.map(({ chapter, chapterContent }) => (
                <ChapterList
                  key={chapter.slug}
                  chapter={chapter}
                  chapterContent={chapterContent}
                />
              ))}
            </ul>
          </div>
          <div className="w-12/12 md:w-9/12 md:max-h-[95vh] bg-[#dbeafe7e] overflow-y-auto p-3 md:p-4">
            {children}
          </div>
        </div>
        <Footer />
        <GoogleAnalytics gaId="G-YM9TZWWD6D" />
      </body>
    </html>
  );
}
