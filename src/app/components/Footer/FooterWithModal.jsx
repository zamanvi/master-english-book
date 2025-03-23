'use client';
import React, { useState } from "react";
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Contact Information</h2>
        <div className="space-y-3">
          <p className="flex items-center gap-2">
            <FaPhone />
            <a href="tel:+8801234567890" className="text-blue-600 hover:underline">+880 1234 567 890</a>
          </p>
          <p className="flex items-center gap-2">
            <IoIosMail />
            <a href="mailto:info@redrosebd.com" className="text-blue-600 hover:underline">info@redrosebd.com</a>
          </p>
          <p className="flex items-center gap-2">
            <FaLocationDot />
            <span>123 Business Street, Dhaka, Bangladesh</span>
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
        Contact Us
      </h2>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FooterWithModal;
