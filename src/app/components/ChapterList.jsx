'use client';
import { useState } from "react";
import Link from "next/link";

const ChapterList = ({ chapter, chapterContent }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleContent = showAll ? chapterContent : chapterContent.slice(0, 20);

  return (
    <li key={chapter?.slug}>
      <h3 className="text-[15px] lg:text-[16px] font-semibold mb-1 lg:mb-2">
        {chapter?.title}
      </h3>
      {/* -----------Display limited chapter content initially----------- */}
      {visibleContent?.map((content, index) => (
        <Link
          key={content?.slug}
          className="cursor-pointer block mb-3 xl:mb-4 hover:text-blue-400 text-[16px]"
          href={`../book/${content?.slug}`}
          title={content?.title}
        >
          <span className="font-bold">{index + 1}. </span> {content?.title}
        </Link>
      ))}

      {/* -----------"See More" Button----------- */}
      {!showAll && chapterContent.length > 20 && (
        <button
          className="text-blue-500 hover:text-blue-700 font-semibold mb-2"
          onClick={() => setShowAll(true)}
        >
          See More
        </button>
      )}
      {/*----------- "See Less" Button -----------*/}
      {showAll &&  (
        <button
          className="text-blue-500 hover:text-blue-700 font-semibold mb-2"
          onClick={() => setShowAll(false)}
        >
          See Less
        </button>
      )}
    </li>
  );
};

export default ChapterList;
