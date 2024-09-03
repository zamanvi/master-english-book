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

export default function Navbar() {
  const [menuClicked, setMenuClicked] = useState(false);
  const [allChapters, setAllChapters] = useState(null);
  const [chapterContents, setChapterContents] = useState({});

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
        <div>
          <div className="flex items-end gap-2 text-white">
            <p>Book Name:</p>
            <div className="">
              <select
                className="text-xl font-bold bg-[#075F8F] text-white border-0 focus:outline-none"
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (selectedValue) {
                    window.location.href = selectedValue;
                  }
                }}
              >
                <option value="#" selected>
                  দূর্বলদের Master English Book Part - I
                </option>
                <option value="https://audio-vocabulary.vercel.app">
                  Audio vocabulary
                </option>
              </select>
            </div>
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

          <div>
            <h2 className="font-bold text-white text-xl"></h2>
          </div>
        </div>
      </div>

      {/* -----------------Nav Items for small Screen--------------- */}
      <div className="flex md:hidden justify-between items-center relative">
        <div>
          <div className="font-bold text-white text-lg ">
            <select
              className="font-bold bg-[#075F8F] text-white border-0 focus:outline-none"
              onChange={(e) => {
                const selectedValue = e.target.value;
                if (selectedValue) {
                  window.location.href = selectedValue;
                }
              }}
            >
              <option value="#" selected>
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
          <li className="font-bold text-lg mb-2 hover:text-blue-400 cursor-pointer">
            <Link href={"/"}> Home</Link>
          </li>

          {allChapters?.map((chapter) => (
            <li key={chapter?.slug}>
              <h3 className="font-semibold text-lg mb-1 ">{chapter?.title}</h3>

              {/*------ Display chapter content ----------- */}

              {chapterContents[chapter.slug]?.map((content, index) => (
                <Link
                  key={content?.slug}
                  className="cursor-pointer block hover:text-blue-400  mb-3 w-full"
                  href={`../book/${content?.slug}`}
                  title={content?.title}
                  onClick={() => setMenuClicked(false)}
                >
                  <span className="font-bold"> {index + 1} .</span>{" "}
                  {content?.title}
                </Link>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
