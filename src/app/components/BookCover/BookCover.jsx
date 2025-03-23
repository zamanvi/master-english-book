import React from "react";
import coverPhoto from "../../../../public/image/bookCoverFs.jpg";
import appLogo from "../../../../public/image/appLogo.jpg"
import newApp1 from "../../../../public/image/NewApp1.jpg";
import newApp2 from "../../../../public/image/NewApp2.jpg";
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
        <span className="font-semibold text-lg text-blue-500">
          আমাদের App সমূহ play store থেকে ডাউনলোড করতে লিংকে ক্লিক করুন
        </span>
        <div className="flex gap-x-5">
          <Link href="https://play.google.com/store/apps/details?id=com.abmn.englishhub&pcampaignid=web_share">
            <Image
              className="rounded-md shadow-lg"
              width={55}
              src={appLogo}
              alt="Master English Book"
            />
          </Link>
          <Link href="https://play.google.com/store/apps/details?id=com.abmn.learnify&pcampaignid=web_share">
            <Image
              className="rounded-md shadow-lg"
              width={55}
              src={newApp1}
              alt="Learnify"
            />
          </Link>
          <Link href="https://play.google.com/store/apps/details?id=com.abmn.redrosechating&pcampaignid=web_share">
            <Image
              className="rounded-md shadow-lg"
              width={55}
              src={newApp2}
              alt="App logo2"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCover;
