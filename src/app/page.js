import Link from "next/link";
import getBook from "../../lib/getBook";
import Ebook from "./components/EBook/EBook";
import Navbar from "./components/Navbar/Navbar";
import BookCover from "./components/BookCover/BookCover";


export default async function Home() {

  const bookData = await getBook() ;
  const allChapters = bookData?.success?.data?.chapters?.data;
 
  


  return (
    <main className="">
      <Navbar />

      {/* ------------ ------------ Main Content ------------------------*/}
      <div className="flex flex-col lg:flex-row w-12/12 justify-between gap-4 mt-3">
        {/* -------------Content Menu------------- */}
        <div className="w-12/12 lg:w-3/12 hidden lg:block">
          <h2 className="bg-[#075F8F] font-bold text-[22px] text-white px-2 py-1">
            Chapters
          </h2>
          <ul className=" bg-[#dbeafeb0]  pb-10 chapters ">
            {
              allChapters?.map( chapter => <li key={chapter?.id} className="font-semibold">{chapter?.title}</li>)
            }
            
          </ul>
        </div>
        {/* -----------Content ---------------- */}
        <div className="w-12/12 lg:w-9/12 bg-[#dbeafeb0] ">
          <Link href={`book/1`}>
           <BookCover></BookCover>
          </Link>
        </div>
      </div>
    </main>
  );
}
