import { Space_Grotesk, Hind_Siliguri, Baloo_Da_2 } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import getBook from "../../lib/getBook";
import getChapterData from "../../lib/getChapterData";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Script from "next/script";
import cardImage from "../../public/image/bookCoverFs.jpg";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const balooDa2 = Baloo_Da_2({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo-da-2",
  display: "swap",
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
          crossOrigin="anonymous"
        ></Script>
      </head>
      <body
        className={`${hindSiliguri.variable} ${balooDa2.variable} ${spaceGrotesk.variable} font-hind bg-slate-50`}
      >
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
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Red Rose Corporation",
                "url": "https://corporation.redrosebd.com",
                "logo": `${siteURL}/image/logoDark.png`,
                "sameAs": ["https://www.masterenglishbook.com"],
              },
            ]),
          }}
        />
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
        <GoogleAnalytics gaId="G-YM9TZWWD6D" />
      </body>
    </html>
  );
}
