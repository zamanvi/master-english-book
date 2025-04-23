"use client";
import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import {
  FaShare,
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import Link from "next/link";
import getBook from "../../../../lib/getBook";
import getChapterData from "../../../../lib/getChapterData";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuClicked, setMenuClicked] = useState(false);
  const [allChapters, setAllChapters] = useState(null);
  const [chapterContents, setChapterContents] = useState({});
  const [showMoreMap, setShowMoreMap] = useState({});
  const pathname = usePathname();

  const toggleShowMore = (slug) => {
    setShowMoreMap((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  useEffect(() => {
    async function fetchData() {
      const bookData = await getBook();
      const chapters = bookData?.success?.data?.chapters?.data;
      setAllChapters(chapters);

      if (chapters) {
        const chapterDataPromises = chapters.map((chapter) =>
          getChapterData(chapter.slug)
        );
        const chapterDataArray = await Promise.all(chapterDataPromises);

        const contents = chapterDataArray.reduce((acc, data, index) => {
          acc[chapters[index].slug] = data?.success?.data?.items?.data || [];
          return acc;
        }, {});

        setChapterContents(contents);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-[#075F8F] p-2  z-10 lg:my-1 lg:rounded">
      {/* ----------------Nav Items For Big Screen ---------- */}
      <div className="hidden md:flex justify-between items-center">
        <div className="flex items-end gap-2 text-white">
          <p>Book Name:</p>
          <div>
            <select
              className="text-xl font-bold bg-[#075F8F] text-white border-0 focus:outline-none"
              onChange={(e) => {
                const selectedValue = e.target.value;
                if (selectedValue) {
                  window.location.href = selectedValue;
                }
              }}
            >
              <option value="#" defaultValue>
                দূর্বলদের Master English Book Part - I
              </option>
              <option value="https://audio-vocabulary.vercel.app">
                Audio vocabulary
              </option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="text-white text-xl flex gap-3">
            <span title="Share with">
              <FaShare />
            </span>
            <a href="#">
              <FaFacebookSquare />
            </a>
            <a href="#">
              <FaInstagramSquare />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
            <a href="#">
              <FaTwitterSquare />
            </a>
          </div>
        </div>
      </div>

      {/* -----------------Nav Items for small Screen--------------- */}
      <div className="flex md:hidden justify-between items-center relative">
        <div>
          <div className="font-bold text-white text-lg">
            <select
              className="font-bold bg-[#075F8F] text-white border-0 focus:outline-none"
              onChange={(e) => {
                const selectedValue = e.target.value;
                if (selectedValue) {
                  window.location.href = selectedValue;
                }
              }}
            >
              <option value="#" defaultValue>
                দূর্বলদের Master English Book Part - I
              </option>
              <option value="https://audio-vocabulary.vercel.app">
                Audio vocabulary
              </option>
            </select>
          </div>
        </div>

        <div onClick={() => setMenuClicked(!menuClicked)}>
          {menuClicked ? (
            <RxCross2 className="font-bold text-3xl text-white" />
          ) : (
            <IoMenu className="font-bold text-3xl text-white" />
          )}
        </div>
      </div>

      <div
        className={`${
          menuClicked ? "block" : "hidden"
        } lg:hidden min-w-32 max-w-[90%] mx-auto min-h-40 max-h-[75vh] overflow-auto bg-[#2a7daa] absolute right-[10px] top-12 rounded-lg shadow-2xl z-20`}
      >
        <ul className="text-white p-4">
          <li
            className={`font-bold text-lg mb-2 hover:text-blue-400 cursor-pointer ${
              pathname === "/" ? "text-blue-500 bg-white p-1" : ""
            }`}
          >
            <Link href="/">Home</Link>
          </li>

          {allChapters?.map((chapter) => {
            const slug = chapter?.slug;
            const contents = chapterContents[slug] || [];
            const showAll = showMoreMap[slug];
            const displayedContents = showAll
              ? contents
              : contents.slice(0, 20);

            return (
              <li key={slug} className="mb-4">
                <h3 className="font-semibold text-lg mb-1">{chapter?.title}</h3>

                {displayedContents.map((content, index) => (
                  <Link
                    key={content?.slug}
                    className={`cursor-pointer block mb-2 w-full hover:text-blue-400 ${
                      isActive ? "text-blue-500 bg-white p-1 font-bold" : ""
                    }`}
                    href={`../book/${content?.slug}`}
                    title={content?.title}
                    onClick={() => setMenuClicked(false)}
                  >
                    <span className="font-bold">{index + 1}.</span>{" "}
                    {content?.title}
                  </Link>
                ))}

                {contents.length > 20 && (
                  <button
                    className="text-sm text-blue-500 bg-white rounded-md px-3 py-1 underline mt-2"
                    onClick={() => toggleShowMore(slug)}
                  >
                    {showAll ? "See less" : "See more"}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
