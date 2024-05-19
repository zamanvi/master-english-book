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
      <div className="flex flex-col md:flex-row w-12/12 justify-between gap-4 md:mt-3">
        {/* Content Menu */}
        <div className="w-12/12 md:w-3/12 hidden md:block md:max-h-[88vh] overflow-y-auto ">
          <h2 className="bg-[#075F8F] font-bold md:text-lg lg:text-xl xl:text-[22px] text-white px-2 py-1">
            Chapters
          </h2>

          <ul className="bg-[#dbeafeb0] pb-10 chapters">
            {allChapters?.map(async (chapter) => {
              // Fetch chapter content for each chapter
              const chapterData = await getChapterData(chapter.id);
              const chapterContent = chapterData?.success?.data?.items?.data;

              return (
                <li key={chapter?.id}>
                  <h3 className="text-[15px] lg:text-[16px] font-semibold mb-1 lg:mb-2">
                    {chapter?.title}
                  </h3>
                  {/* Display chapter content */}
                  {chapterContent?.map((content, index) => (
                    <Link
                      key={content?.id}
                      className="cursor-pointer block mb-3 xl:mb-4 hover:text-blue-400 text-[15px] xl:text-[16px]"
                      href={`book/${content?.id}`}
                      title={content?.title}
                    >
                       <span className="font-bold">{ index + 1 }. </span>  { content?.title}
                    </Link>
                  ))}
                </li>
              );
            })}
          </ul>
        </div>
        {/* Content */}
        <div className="w-12/12 md:w-9/12 md:max-h-[88vh] bg-[#dbeafe7e] overflow-y-auto">
          <Link href={`book/54`}>
            <BookCover></BookCover>
          </Link>
        </div>
      </div>
    </main>
  );
}
