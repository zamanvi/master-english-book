import Link from "next/link";
import getBook from "../../lib/getBook";
import getChapterData from "../../lib/getChapterData"; // Import the function to fetch chapter data
import Navbar from "./components/Navbar/Navbar";
import BookCover from "./components/BookCover/BookCover";

export default async function Home() {
  const bookData = await getBook();
  const allChapters = bookData?.success?.data?.chapters?.data;

  return (
    <main className="">
      <Navbar />
      <div className="flex flex-col lg:flex-row w-12/12 justify-between gap-4 mt-3">
        {/* Content Menu */}
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
                      href={`book/${content?.id}`}
                      
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
        {/* Content */}
        <div className="w-12/12 lg:w-9/12 bg-[#dbeafeb0] ">
          <Link href={`book/54`}>
            <BookCover></BookCover>
          </Link>
        </div>
      </div>
    </main>
  );
}
