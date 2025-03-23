import React from "react";
import coverPhoto from "../../../../public/image/bookCoverFs.jpg";
import appLogo from "../../../../public/image/appLogo.webp";
import Image from "next/image";
import Link from "next/link";
const BookCover = () => {
  return (
    <div className="w-11/12 md:w-10/12 lg:w-full mx-auto pt-5 ">
      <Image
        src={coverPhoto}
        className="mx-auto md:w-7/12 lg:w-5/12  rounded-md shadow-md shadow-[#0000008f]"
        alt="English Book Cover"
      />

      <div className="flex flex-col justify-center items-center gap-y-4 my-7">
        <div className="flex gap-x-5">
          <Link href="https://play.google.com/store/apps/details?id=com.abmn.englishhub&pcampaignid=web_share">
            <Image
              className="rounded-md"
              width={55}
              src={appLogo}
              alt="App logo"
            />
          </Link>
          <Link href="https://play.google.com/store/apps/details?id=com.abmn.englishhub&pcampaignid=web_share">
            <Image
              className="rounded-md"
              width={55}
              src={appLogo}
              alt="App logo2"
            />
          </Link>
        </div>
        <span className="font-semibold text-xl md:text-2xl text-blue-500">
          Download Our Apps
        </span>
      </div>
    </div>
  );
};

export default BookCover;
