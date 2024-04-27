import Navbar from "@/app/components/Navbar/Navbar";
import getBook from "../../../../lib/getBook";
import Link from "next/link";

import getChapterData from "../../../../lib/getChapterData";




export default async function singleBook({params}) {

  const bookData = await getBook() ;
  const allChapters = bookData?.success?.data?.items?.data;

  const chapterID = params?.id;
  const chapterInfo = await getChapterData(chapterID);
  const chapterContent = chapterInfo?.success?.data?.item;
 
  


  return (
    <main className="">
      <Navbar  />

      {/* ------------ ------------ Main Content ------------------------*/}
      <div className="flex flex-col lg:flex-row w-12/12 justify-between gap-4 mt-3">
        {/* -------------Content Menu------------- */}
        <div className="w-12/12 lg:w-3/12 hidden lg:block">
          <h2 className="bg-[#075F8F] font-bold text-[22px] text-white px-2 py-1">
            Chapters
          </h2>
          <ul className=" bg-[#dbeafeb0]  pb-10 chapters ">
          {
              allChapters?.map( chapter => <li key={chapter?.id}><Link  href={`./${chapter?.id}`}>{chapter?.title}</Link></li>)
            }
            
          </ul>
        </div>
        {/* ----------- Main Content Here---------------- */}
        
      </div>
    </main>
  );
}


export async function generateMetadata({ params }) {
  const chapterID = params?.id;
  const chapterInfo = await getChapterData(chapterID);
  const chapterContent = chapterInfo?.success?.data?.item;
  const chapterTitle = chapterContent?.title;
  const chapterDescription = chapterContent?.short_details;
  const pageKeyword = chapterContent?.keyword.split(', ') ;
  const pageFocusKeyword = chapterContent?.focus_keyword;

  return {
    title: `${chapterTitle}`,
    description: `${chapterDescription}`,
    keywords: [pageFocusKeyword, ...pageKeyword],
    robots: "ALL",
    robots: "index, follow",
    googleBot: "index, follow",
    googleBotNews: "index, follow",
    distribution: "Global",
  };
}
