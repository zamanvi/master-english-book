'use client';
import React, { useState } from "react";
import { FaPhone, FaLocationDot, FaWhatsapp } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65">
      <div className="bg-white p-6 rounded-lg w-[92%] max-w-[520px] shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Contact Information</h2>
        <div className="space-y-3">
          <p className="flex items-center gap-2">
            Author. H MD NOROZZAMAN 
          </p>
          <p className="flex items-center gap-2">
            <FaWhatsapp className="text-lg" />
            <a href="https://wa.me/+8801826192179" target="_blank" className="text-blue-600 hover:underline">+880 1826192179</a>
          </p>
          <p className="flex items-center gap-2">
            <FaPhone />
            <a href="tel:+8801826192179" target="_blank" className="text-blue-600 hover:underline">+880 1826192179</a>
          </p>
          <p className="flex items-center gap-2">
            <IoIosMail />
            <a href="mailto:norozzaman996@gmail.com" target="_blank" className="text-blue-600 hover:underline">norozzaman996@gmail.com</a>
          </p>
          <p className="flex items-center gap-2">
            <FaLocationDot />
            <span>2 floor, Nobaron school, Shonir-Akhra, Jatrabari, Dhaka</span>
          </p>
        </div>
        <button 
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const FooterWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <h2
        className="font-bold text-white text-lg lg:text-xl my-4 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        Get Contact Info
      </h2>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FooterWithModal;
