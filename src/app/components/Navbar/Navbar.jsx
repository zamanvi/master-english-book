"use client";
import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ chaptersWithContent }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMoreMap, setShowMoreMap] = useState({});
  const pathname = usePathname();

  const toggleShowMore = (slug) => {
    setShowMoreMap((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const bookSelector = (
    <select
      className="bg-transparent text-white font-grotesk font-semibold text-sm border-0 focus:outline-none cursor-pointer max-w-[220px] md:max-w-none truncate"
      onChange={(e) => {
        if (e.target.value) window.location.href = e.target.value;
      }}
    >
      <option value="#" className="bg-[#0f172a]">
        Master English Book Part - I
      </option>
      <option value="https://audio-vocabulary.vercel.app" className="bg-[#0f172a]">
        Audio Vocabulary
      </option>
      <option
        value="https://www.englishspeakingcourseinbangladesh.com"
        className="bg-[#0f172a]"
      >
        Speaking English Course
      </option>
    </select>
  );

  return (
    <nav className="bg-[#0f172a] border-b border-slate-700/60 px-4 py-3 relative z-20">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-xs font-grotesk uppercase tracking-wider">
            Book:
          </span>
          {bookSelector}
        </div>
        <Link
          href="/"
          className="text-slate-400 hover:text-white text-sm font-grotesk transition-colors"
        >
          Home
        </Link>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between">
        <div className="flex-1 min-w-0 mr-3">{bookSelector}</div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl flex-shrink-0"
          aria-label="Toggle menu"
        >
          {menuOpen ? <RxCross2 /> : <IoMenu />}
        </button>
      </div>

      {/* Mobile drawer backdrop */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-20"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden absolute right-0 top-full w-full max-h-[80vh] overflow-y-auto bg-[#0f172a] border-t border-slate-700/60 shadow-2xl z-30">
          <ul className="py-2">
            <li>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-grotesk font-semibold transition-colors ${
                  pathname === "/"
                    ? "text-blue-400 bg-slate-800"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                Home
              </Link>
            </li>

            {chaptersWithContent?.map(({ chapter, chapterContent }) => {
              const showAll = showMoreMap[chapter.slug];
              const contents = chapterContent || [];
              const visible = showAll ? contents : contents.slice(0, 20);

              return (
                <li key={chapter.slug} className="mb-2">
                  <p className="px-4 py-2 text-[10px] font-grotesk font-bold uppercase tracking-widest text-slate-500">
                    {chapter.title}
                  </p>
                  {visible.map((content, i) => {
                    const isActive = pathname === `/book/${content.slug}`;
                    return (
                      <Link
                        key={content.slug}
                        href={`/book/${content.slug}`}
                        onClick={() => setMenuOpen(false)}
                        title={content.title}
                        className={`flex items-start gap-2 px-4 py-2 text-sm font-hind leading-snug transition-colors ${
                          isActive
                            ? "bg-blue-600 text-white font-semibold"
                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        <span className="text-slate-500 text-xs mt-0.5 font-grotesk w-5 text-right shrink-0">
                          {i + 1}.
                        </span>
                        <span>{content.title}</span>
                      </Link>
                    );
                  })}
                  {contents.length > 20 && (
                    <button
                      onClick={() => toggleShowMore(chapter.slug)}
                      className="w-full text-left px-4 py-2 text-xs text-blue-400 hover:text-blue-300 font-grotesk"
                    >
                      {showAll
                        ? "↑ See less"
                        : `↓ ${contents.length - 20} more`}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
