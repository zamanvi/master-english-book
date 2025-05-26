import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import getBook from "../../lib/getBook";
import getChapterData from "../../lib/getChapterData";
import Navbar from "./components/Navbar/Navbar";
import ChapterList from "./components/ChapterList";
import Script from "next/script";
const cardImage = `https://i.ibb.co/MPnmqw3/book-Cover-Fs.webp`;
import CookieConsent from "./components/CookieConsent/CookieConsent";


const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
//check this is an new deploy
export const metadata = {
  title: "দূর্বলদের Master English Book Part - I",
  description:
    "Easy English learning master book for all of us. Effective and Very attractive.",
  verification: {
    google: "M0MK3nrHsamo73lbLU8-lwBKzCFfoSBfyLi-kL0z160",
  },
  openGraph: {
    images: [cardImage],
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
        <CookieConsent />
        <Footer />
        <GoogleAnalytics gaId="G-YM9TZWWD6D" />
      </body>
    </html>
  );
}
