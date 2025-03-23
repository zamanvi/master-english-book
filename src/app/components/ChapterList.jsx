"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 

const ChapterList = ({ chapter, chapterContent }) => {
  const [showAll, setShowAll] = useState(false);
  const pathname = usePathname(); // Get current URL path
  const visibleContent = showAll ? chapterContent : chapterContent.slice(0, 20);

  return (
    <li key={chapter?.slug}>
      <h3 className="text-[15px] lg:text-[16px] font-semibold mb-1 lg:mb-2">
        {chapter?.title}
      </h3>
      {/* ----------- Display limited chapter content initially ----------- */}
      {visibleContent?.map((content, index) => {
        const isActive = pathname === `/book/${content?.slug}`;

        return (
          <Link
            key={content?.slug}
            className={`cursor-pointer block mb-3 xl:mb-4 text-[16px] py-[2px] hover:text-blue-500 
              ${isActive ? "bg-blue-100 text-blue-500 font-semibold rounded" : ""}`}
            href={`../book/${content?.slug}`}
            title={content?.title}
          >
            <span className="font-bold">{index + 1}. </span> {content?.title}
          </Link>
        );
      })}

      {/* ----------- "See More" Button ----------- */}
      {!showAll && chapterContent.length > 20 && (
        <button
          className="text-blue-500 hover:text-blue-700 font-semibold mb-2"
          onClick={() => setShowAll(true)}
        >
          See More
        </button>
      )}

      {/* ----------- "See Less" Button ----------- */}
      {showAll && (
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
