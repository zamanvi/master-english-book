import Navbar from "@/app/components/Navbar/Navbar";
import getBook from "../../../../lib/getBook";
import Link from "next/link";

import getChapterData from "../../../../lib/getChapterData";
import getPostData from "../../../../lib/getPostData";




export default async function singleBook({params}) {

  const bookData = await getBook();
  const allChapters = bookData?.success?.data?.chapters?.data;

  const postID = params?.id;
  const postInfo = await getPostData(postID);
  const postContent = postInfo?.success?.data?.item;
 
  
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
          <ul className="bg-[#dbeafeb0] pb-10 chapters">
            {allChapters?.map(async (chapter) => {
              // Fetch chapter content for each chapter
              const chapterData = await getChapterData(chapter.id);
              const chapterContent = chapterData?.success?.data?.items?.data;

              return (
                <li key={chapter?.id}>
                  <h3 className="font-semibold">{chapter?.title}</h3>
                  {/* Display chapter content */}
                  {chapterContent?.map((content) => (
                    <Link
                      key={content?.id}
                      className="cursor-pointer inline-block hover:text-blue-400"
                      href={`./${content?.id}`}
                    >
                      <span>
                       {content?.title.slice(0, 38) + "..."}
                      </span>
                    </Link>
                  ))}
                </li>
              );
            })}
          </ul>
        </div>
        {/* ----------- Main Content Here---------------- */}
        <div className="w-12/12 lg:w-9/12 bg-[#dbeafe8c] p-5">
          <h1 className="font-bold text-2xl">{postContent?.title}</h1>

          <div  dangerouslySetInnerHTML={{__html: postContent?.details}} className="mt-8">
            
          </div>
        </div>
      </div>
    </main>
  );
}


export async function generateMetadata({ params }) {
  const postID = params?.id;
  const postInfo = await getPostData(postID);
  const postContent = postInfo?.success?.data?.item;
  const postTitle = postContent?.title;
  const postDescription = postContent?.short_details;
  const pageKeyword = postContent?.keyword.split(', ') ;
  const pageFocusKeyword = postContent?.focus_keyword;

  return {
    title: `${postTitle}`,
    description: `${postDescription}`,
    robots: "ALL",
    robots: "index, follow",
    googleBot: "index, follow",
    googleBotNews: "index, follow",
    distribution: "Global",
  };
}
