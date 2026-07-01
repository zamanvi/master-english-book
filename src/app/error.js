"use client";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="text-5xl mb-4">😕</div>
      <h2 className="font-baloo font-bold text-2xl text-slate-800 mb-2">
        কিছু একটা ভুল হয়েছে
      </h2>
      <p className="font-hind text-slate-500 mb-6 max-w-sm">
        পাঠটি লোড করা সম্ভব হয়নি। ইন্টারনেট কানেকশন চেক করে আবার চেষ্টা করুন।
      </p>
      <button
        onClick={reset}
        className="bg-blue-600 hover:bg-blue-700 text-white font-grotesk font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
      >
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
