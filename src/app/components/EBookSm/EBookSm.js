"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";

import bookFrontPage from "../../../../public/image/bookCoverFs.jpg";
import bookBackPage from "../../../../public/image/bookCoverBs.jpg";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function EBookSm({ chapterContent }) {
  return (
    <div className="">
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {/* ---------------Book First Cover page --------------- */}
        <SwiperSlide>
          <div className="w-full mx-auto bg-red-500 rounded-md">
            <div className="h-[72vh]  rounded-md">
              <div className="w-full h-full rounded-md">
                <Image
                  src={bookFrontPage}
                  className="w-full mx-auto  rounded-md"
                ></Image>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* ---------- Publisher and Author Page ---------------- */}
        <SwiperSlide>
          <div className="w-full  h-[72vh] rounded-md mx-1 shadow-md shadow-[#00000054] mb-2 hover:shadow-[#00000071] p-2">
            <div className="page-border h-full  rounded-md  px-3 py-2  text-justify flex justify-center items-center">
              {/* ---------Main Text content--------- */}
              <div className="z-[2] text-[15px] text-gray-700 flex justify-center items-center">
                <div>
                  <h2 className=" font-bold text-[#075F8F]">
                    Published By:{" "}
                    <a
                      className="text-md text-black"
                      href="https://www.redrosebd.com/"
                      target="_blank"
                    >
                      RedRose Academy
                    </a>
                  </h2>
                  <h2 className="text-[#287099] font-bold">
                    Writer: <span className="text-black">MD. Norozzaman</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* -------------- Dynamic Page --------------------  */}

        <SwiperSlide >
            <div className="w-full  h-[72vh] rounded-md mx-1 shadow-md shadow-[#00000054] mb-2 hover:shadow-[#00000071] p-2">
              <div className="page-border h-full  rounded-md  px-3 py-2  text-justify ">

                <div>
                <h3 className="text-center font-bold  my-2">
                  {chapterContent?.title}
                </h3>

                <div dangerouslySetInnerHTML={{__html: chapterContent?.details}} className="z-[2] text-[13px] text-gray-700">
                  
                </div>
                </div>

                <span className="page-counter">1</span>
              </div>
            </div>
          </SwiperSlide>

        {/* ---------------Book End Cover page --------------- */}
        <SwiperSlide>
          <div className="w-full mx-auto  bg-red-500 rounded-md">
            <div className="h-[72vh]  rounded-md">
              <div className="w-full h-full  rounded-md">
                <Image
                  src={bookBackPage}
                  className="w-full mx-auto  rounded-md"
                ></Image>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
