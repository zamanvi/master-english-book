import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../../public/image/logoDark.png";
import "../Footer/style.css";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";
import InternationalContactModal from "./InternationalContactModal";

// International's own footer - separate component from Footer.jsx
// (Bangladesh's). Same brand/company info (shared across both), but its
// own file so future edits to one audience's footer never touch the other.
const InternationalFooter = () => {
  return (
    <div className="bg-[#16103F] w-full mx-auto py-5">
      <div className="max-w-[1366px] mx-auto">
        <div className="w-full px-5 mx-auto grid md:grid-cols-2 gap-10 md:gap-6 lg:gap-8 ">
          {/* ----------First Column ------------*/}
          <div>
            <div>
              <div>
                <Image
                  src={logo}
                  alt="Red Rose Corporation logo"
                  width={100}
                  className=" w-12 xl:w-16"
                />
              </div>
              <a
                href="https://corporation.redrosebd.com"
                className="text-[#FF016E] font-bold text-lg lg:text-xl "
                target="_blank"
              >
                Red Rose Corporation
              </a>
              <p className="text-sm text-slate-300 font-bold">
                Providing reliable since 2023
              </p>
            </div>
            <div className="text-white mt-4 text-[15px]">
              <p>
                <Link
                  href={"/TermsAndConditions"}
                  className="link link-hover font-bold"
                >
                  Terms of use
                </Link>
              </p>

              <p>
                <Link
                  href={"/PrivacyPolicy"}
                  className="link link-hover font-bold"
                >
                  Privacy policy
                </Link>
              </p>
            </div>
          </div>

          {/* ----------Middle Column ------------*/}
          <div className="">
            <h2 className="font-bold text-white text-lg lg:text-xl  mb-4">
              Get in Touch
            </h2>

            <div className="text-2xl font-bold text-white flex items-center gap-4 ">
              <a
                href="https://www.facebook.com/redroseacademyofficial"
                target="_blank"
                className="icon-style"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com/company/red-rose-academy"
                target="_blank"
                className="icon-style"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.youtube.com/@redroseacademy5364"
                className="icon-style"
                target="_blank"
              >
                <FaYoutube />
              </a>
            </div>
            {/* -------------Footer Contact Modal (international - email only, no BD address/phone) ----------------- */}
            <InternationalContactModal />
          </div>
        </div>

        <div className="w-full mx-auto border-t mt-5 border-[#ccc]   ">
          <p className="text-center mt-5 text-stone-300 font-bold">
            {" "}
            &copy; {new Date().getFullYear()} Red Rose Corporation, All Right
            Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InternationalFooter;
