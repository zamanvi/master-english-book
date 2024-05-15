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

export default function Navbar() {
  const [menuClicked, setMenuClicked] = useState(false);
  const [pathname, setPathname] = useState("");
  const [allChapters, setAllChapters] = useState(null);
  const [chapterContent, setChapterContent] = useState({});

  const key = process.env.NEXT_PUBLIC_API_Public_Key;

  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }

    // Fetch all chapters
    fetch(
      `https://redrosebd.tech/api/v2/app/book/chapter/index?book_id=1&public_key=${key}`
    )
      .then((res) => res.json())
      .then((data) => {
        const bookData = data;
        setAllChapters(bookData?.success?.data?.chapters?.data);
      });
  }, []);

  useEffect(() => {
    // Load chapter data whenever allChapters changes
    if (allChapters) {
      allChapters.forEach((chapter) => {
        loadChapterData(chapter.id);
      });
    }
  }, [allChapters]);

  const loadChapterData = (id) => {
    fetch(
      `https://redrosebd.tech/api/v2/app/book/item/index?chapter_id=${id}&public_key=${key}`
    )
      .then((res) => res.json())
      .then((data) => {
        const chapterData = data;
        setChapterContent((prevContent) => ({
          ...prevContent,
          [id]: chapterData?.success?.data?.items?.data,
        }));
      });
  };

  return (
    <div className="bg-[#075F8F] p-2  z-10 lg:my-1 lg:rounded">
      {/* ----------------Nav Items For Big Screen ---------- */}
      <div className="hidden md:flex justify-between items-center">
        <div>
          <ul className="flex items-end gap-2   text-white ">
            <li>Book Name: </li>
            <li className="text-xl font-bold">
              {" "}
              <span className="text-[#FBE050]">দূর্বলদের</span> Master English
              Book <span className="text-[#FBE050]">Part - I</span>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-10">
          <div className="text-white text-xl flex gap-3">
            <span title="Share with">
              <FaShare />
            </span>
            <a href="#">
              <FaFacebookSquare />{" "}
            </a>
            <a href="#">
              <FaInstagramSquare />{" "}
            </a>
            <a href="#">
              <FaLinkedin />{" "}
            </a>
            <a href="#">
              <FaTwitterSquare />{" "}
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
          <h2 className="font-bold text-white text-lg ">
            <span className="text-[#FBE050]">দূর্বলদের</span> Master English
            Book <span className="text-[#FBE050]">Part - I</span>
          </h2>
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
          <li className="font-bold">
            <Link href={"/"}> Home</Link>
          </li>
          {allChapters?.map((chapter) => (
            <li key={chapter?.id}>
              <h3 className="font-semibold mb-1 ">
                {chapter?.title}
              </h3>
              {/* Display chapter content */}
              {chapterContent[chapter.id]?.map((content, index) => (
                <Link
                  key={content?.id}
                  className="cursor-pointer block hover:text-blue-400 text-[14px] mb-1"
                  href={
                    pathname.includes("/book")
                      ? `./${content?.id}`
                      : `book/${content?.id}`
                  }
                  title={content?.title}
                >
                 <span className="font-bold"> {index + 1 } .</span> {content?.title}
                </Link>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
