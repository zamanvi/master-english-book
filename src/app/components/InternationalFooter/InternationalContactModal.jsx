'use client';
import React, { useState } from "react";
import { IoIosMail } from "react-icons/io";

// International's own contact modal - deliberately separate from
// Footer/FooterWithModal.jsx (Bangladesh's), which hardcodes a Dhaka
// office address and a +880 BD-only phone/WhatsApp number. Neither is
// relevant to an international (US/UK/global) audience, so this keeps
// only what applies everywhere: email.
const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65 z-50">
      <div className="bg-white p-6 rounded-lg w-[92%] max-w-[520px] shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Contact Information</h2>
        <div className="space-y-3">
          <p className="flex items-center gap-2">
            <IoIosMail />
            <a
              href="mailto:norozzaman996@gmail.com"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              norozzaman996@gmail.com
            </a>
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

const InternationalContactModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-1.5 font-bold text-white text-lg lg:text-xl my-4 hover:text-blue-400 transition-colors"
      >
        <IoIosMail className="text-base" />
        Get Contact Info
      </button>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default InternationalContactModal;
