import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import getBook from "../../lib/getBook";
import getChapterData from "../../lib/getChapterData";
import Navbar from "./components/Navbar/Navbar";

const cardImage = `https://i.ibb.co/MPnmqw3/book-Cover-Fs.webp`;

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

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
  const allChapters = bookData?.success?.data?.chapters?.data
  return (
    <html lang="en">
      <body className={`${ubuntu.className} max-w-[1366px] lg:w-11/12 mx-auto`}>
        {/* ----------Navbar For Small and Medium Device ------------- */}
        <Navbar />
        {/* ------------Navbar End---------- */}
        <div className="flex flex-col md:flex-row w-12/12 justify-between gap-3 md:mt-3">
          {/*-------------- Content Menu for large Device only-------------------- */}
          <div className="w-12/12 md:w-3/12 hidden md:block md:max-h-[88vh] overflow-y-auto ">
            <h2 className="bg-[#075F8F] font-bold md:text-lg lg:text-xl xl:text-[22px] text-white px-2 py-1">
              Chapters
            </h2>

            <ul className="bg-[#dbeafeb0] pb-10 chapters">
              {allChapters?.map(async (chapter) => {
                // Fetch chapter content for each chapter
                const chapterData = await getChapterData(chapter.slug);
                const chapterContent = chapterData?.success?.data?.items?.data;

                return (
                  <li key={chapter?.slug}>
                    <h3 className="text-[15px] lg:text-[16px] font-semibold mb-1 lg:mb-2">
                      {chapter?.title}
                    </h3>
                    {/* Display chapter content */}
                    {chapterContent?.map((content, index) => (
                      <Link
                        key={content?.slug}
                        className="cursor-pointer block mb-3 xl:mb-4 hover:text-blue-400 text-[16px]"
                        href={`../book/${content?.slug}`}
                        title={content?.title}
                      >
                        <span className="font-bold">{index + 1}. </span>{" "}
                        {content?.title}
                      </Link>
                    ))}
                  </li>
                );
              })}
            </ul>
          </div>

          {/*------------Main Content content -----------------*/}
          <div className="w-12/12 md:w-9/12 md:max-h-[88vh] bg-[#dbeafe7e] overflow-y-auto p-3 md:p-4 ">
            {children}
          </div>
        </div>

        {/* ------------------Global Footer ------------------- */}
        <Footer />
        <GoogleAnalytics gaId="G-YM9TZWWD6D" />
      </body>
    </html>
  );
}
