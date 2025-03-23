import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../../public/image/logoDark.png";
import "./style.css";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import "./style.css";
import appLogo from "../../../../public/image/appLogo.webp";


const Footer = () => {
  return (
    <div className="bg-[#16103F] w-full mx-auto py-5">
      <div className="max-w-[1366px] mx-auto">
        <div className="w-full px-5 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6 lg:gap-8 ">
          {/* ----------First Column ------------*/}
          <div>
            <div>
              <div>
                <Image
                  src={logo}
                  alt="logo"
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
              <a href="#" className="icon-style">
                <FaTwitter />
              </a>
              <a
                href="https://www.youtube.com/@redroseacademy5364"
                className="icon-style"
                target="_blank"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* ----------Last Column ------------*/}
          <div>
            <h2 className="font-bold text-white text-lg lg:text-xl  mb-4">
              Download Our App
            </h2>

            <div className="text-3xl font-bold text-white flex items-center gap-4 ">
              <a
                href="https://play.google.com/store/apps/details?id=com.abmn.englishhub&pcampaignid=web_share"
                target="_blank"
                className="bg-white rounded-lg"
              >
                <Image className="p-2 rounded-xl" width={70} src={appLogo} alt="App Logo" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.abmn.englishhub&pcampaignid=web_share"
                target="_blank"
                className="bg-white rounded-lg"
              >
                <Image className="p-2 rounded-xl" width={70} src={appLogo} alt="App Logo2" />
              </a>
            </div>
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

export default Footer;
