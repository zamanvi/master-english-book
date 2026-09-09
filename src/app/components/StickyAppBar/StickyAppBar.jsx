"use client";

import { useEffect, useState } from "react";
import { FaAndroid, FaXmark } from "react-icons/fa6";

// Dismissible bottom bar, mobile only, shown site-wide. Mobile web -> app
// is the single highest-converting placement for this audience (~95%
// Android). Dismissal is remembered in localStorage so it is not
// annoying on repeat visits.
//
// The Play Store link carries its own install `referrer` (utm_medium =
// sticky_bar) so Play Console can attribute installs to this placement
// separately from the in-content card.

const STORAGE_KEY = "meb_app_bar_dismissed";
const REFERRER = encodeURIComponent(
  "utm_source=masterenglishbook&utm_medium=sticky_bar&utm_campaign=web2app"
);
const PLAY_URL = `https://play.google.com/store/apps/details?id=com.abmn.englishhub&referrer=${REFERRER}`;

export default function StickyAppBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    } catch (e) {
      // private mode / storage blocked - just show it
    }
    if (!dismissed) setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {
      /* ignore */
    }
  };

  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur px-3 py-2 shadow-[0_-4px_16px_rgba(15,23,42,0.08)]">
      <div className="flex items-center gap-3">
        <button
          onClick={dismiss}
          aria-label="বন্ধ করুন"
          className="shrink-0 p-1.5 text-slate-400 hover:text-slate-600"
        >
          <FaXmark className="text-base" />
        </button>

        <p className="flex-1 font-hind text-xs text-slate-700 leading-snug">
          পুরো Master English Book — ফ্রি অ্যাপে, অফলাইনে
        </p>

        <a
          href={PLAY_URL}
          target="_blank"
          rel="noopener nofollow"
          onClick={dismiss}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 font-grotesk text-xs font-bold text-white shadow"
        >
          <FaAndroid className="text-sm" />
          <span>ডাউনলোড</span>
        </a>
      </div>
    </div>
  );
}
