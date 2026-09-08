import React from "react";
import coverPhoto from "../../../../public/image/bookCoverFs.jpg";
import appLogo from "../../../../public/image/appLogo.jpg"
import Image from "next/image";
import Link from "next/link";
const BookCover = () => {
  return (
    <div className="w-11/12 md:w-10/12 lg:w-full mx-auto pt-5 ">
      <Image
        src={coverPhoto}
        loading="lazy"
        width={290}
        className="mx-auto md:w-7/12 lg:w-5/12  rounded-md shadow-md shadow-[#0000008f]"
        alt="English Book Cover"
      />

      <div className="flex flex-col justify-center items-center gap-y-5 my-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 md:p-8">
        <div>
          <p className="font-semibold text-lg md:text-xl text-slate-900 text-center mb-2">
            📱 অফলাইনে শেখার জন্য আমাদের অ্যাপ ডাউনলোড করুন
          </p>
          <p className="text-sm text-slate-600 text-center">
            বিনামূল্যে • ২০০+ পাঠ • সম্পূর্ণ অফলাইন অ্যাক্সেস
          </p>
        </div>
        <Link
          href="https://play.google.com/store/apps/details?id=com.abmn.englishhub&pcampaignid=web_share"
          target="_blank"
          className="group hover:scale-110 transition-transform duration-300"
        >
          <Image
            className="rounded-2xl shadow-lg group-hover:shadow-2xl"
            width={70}
            src={appLogo}
            alt="English Grammar Book App"
          />
        </Link>
        <Link
          href="https://play.google.com/store/apps/details?id=com.abmn.englishhub&pcampaignid=web_share"
          target="_blank"
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300 text-sm"
        >
          Play Store এ যান →
        </Link>
      </div>
    </div>
  );
};

export default BookCover;
