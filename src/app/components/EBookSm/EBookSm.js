"use client"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';

import bookFrontPage from "../../../../public/image/bookCoverFs.jpg";
import bookBackPage from "../../../../public/image/bookCoverBs.jpg";

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

export default function EBookSm() {
  return (
    <>
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {/* ---------------Book First Cover page --------------- */}
        <SwiperSlide >
          <div className='w-full mx-auto bg-red-500 rounded-md'>
          <div className="h-[80vh]  rounded-md">
              <div className="w-full h-full rounded-md">
                <Image
                  src={bookFrontPage}
                  className="w-full mx-auto  rounded-md"
                ></Image>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide >
          <div className='w-full mx-auto h-[80vh] bg-red-500 rounded-md'>
             <p className=''>Slide 1</p>
          </div>
        </SwiperSlide>

        
        {/* ---------------Book End Cover page --------------- */}
        <SwiperSlide >
          <div className='w-full mx-auto  bg-red-500 rounded-md'>
          <div className="h-[80vh]  rounded-md">
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
    </>
  )
}
