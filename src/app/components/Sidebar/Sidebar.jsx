"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ chaptersWithContent }) {
  const [search, setSearch] = useState("");
  const [showMoreMap, setShowMoreMap] = useState({});
  const pathname = usePathname();

  const toggleShowMore = (slug) => {
    setShowMoreMap((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const filtered =
    chaptersWithContent
      ?.map(({ chapter, chapterContent }) => {
        const items = (chapterContent || []).filter(
          (c) =>
            !search.trim() ||
            c.title?.toLowerCase().includes(search.toLowerCase())
        );
        return { chapter, items };
      })
      .filter(({ items }) => items.length > 0) || [];

  return (
    <aside className="hidden md:flex flex-col w-72 bg-[#0f172a] flex-shrink-0 overflow-hidden">
      {/* Search header */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-700/50 flex-shrink-0">
        <p className="text-[10px] font-grotesk font-semibold uppercase tracking-widest text-slate-500 mb-2">
          Chapters &amp; Lessons
        </p>
        <input
          type="search"
          placeholder="Search lessons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-800 text-slate-200 placeholder-slate-500 text-sm px-3 py-2 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors"
        />
      </div>

      {/* Scrollable lesson list */}
      <nav className="flex-1 overflow-y-auto py-2 pb-16">
        {filtered.map(({ chapter, items }) => {
          const showAll = showMoreMap[chapter.slug];
          const visible = showAll ? items : items.slice(0, 20);

          return (
            <div key={chapter.slug} className="mb-2">
              <p className="px-4 py-2 text-[10px] font-grotesk font-bold uppercase tracking-widest text-slate-400">
                {chapter.title}
              </p>

              {visible.map((content, i) => {
                const isActive = pathname === `/book/${content.slug}`;
                return (
                  <Link
                    key={content.slug}
                    href={`/book/${content.slug}`}
                    title={content.title}
                    className={`flex items-start gap-2 px-4 py-2 text-sm font-hind leading-snug transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white font-semibold"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <span className="text-slate-500 text-xs mt-0.5 shrink-0 font-grotesk tabular-nums w-5 text-right">
                      {i + 1}.
                    </span>
                    <span className="flex-1 min-w-0">{content.title}</span>
                  </Link>
                );
              })}

              {items.length > 20 && (
                <button
                  onClick={() => toggleShowMore(chapter.slug)}
                  className="w-full text-left px-4 py-2 text-xs text-blue-400 hover:text-blue-300 font-grotesk"
                >
                  {showAll
                    ? "↑ See less"
                    : `↓ ${items.length - 20} more lessons`}
                </button>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && search && (
          <p className="px-4 py-10 text-center text-slate-500 text-sm font-hind">
            &ldquo;{search}&rdquo; — কোনো পাঠ পাওয়া যায়নি
          </p>
        )}
      </nav>
    </aside>
  );
}
