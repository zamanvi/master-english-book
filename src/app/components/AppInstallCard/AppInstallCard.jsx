import Image from "next/image";
import appLogo from "../../../../public/image/appLogo.png";
import { FaAndroid } from "react-icons/fa6";

// In-content app-install call-to-action, dropped at the end of a lesson
// on the /book/[slug] pages - that is where all the organic search
// traffic lands and, until now, there was nothing to convert it.
//
// The Play Store link carries an install `referrer` (URL-encoded UTM
// string). Play Console -> User acquisition -> Acquisition reports
// breaks installs down by utm_source / utm_medium / utm_campaign, so we
// can see how many installs the website (and each placement) actually
// drives. `medium` distinguishes this card from the sticky bar.
export default function AppInstallCard({ medium = "book_card", campaign = "web2app" }) {
  const referrer = encodeURIComponent(
    `utm_source=masterenglishbook&utm_medium=${medium}&utm_campaign=${campaign}`
  );
  const href = `https://play.google.com/store/apps/details?id=com.abmn.englishhub&referrer=${referrer}`;

  return (
    <aside className="not-prose my-10 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-5 md:p-6">
      <div className="flex flex-col sm:flex-row items-center gap-5">
        <a
          href={href}
          target="_blank"
          rel="noopener nofollow"
          className="shrink-0"
          aria-label="Get the English Grammar Book app on Google Play"
        >
          <Image
            src={appLogo}
            width={72}
            height={72}
            alt="English Grammar Book App icon"
            className="rounded-2xl shadow-lg"
          />
        </a>

        <div className="flex-1 text-center sm:text-left">
          <p className="font-baloo font-bold text-base md:text-lg text-slate-900 leading-snug">
            পুরো বইটি আমাদের ফ্রি অ্যাপে — অফলাইনে পড়ুন, কুইজ খেলে অনুশীলন করুন
          </p>
          <p className="font-hind text-slate-600 text-xs md:text-sm mt-1">
            ২০০+ পাঠ · ভিডিও · নেটিভ স্পিকার অডিও · কোনো ইন্টারনেট লাগে না
          </p>
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener nofollow"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 font-grotesk font-bold text-white shadow-lg transition-colors hover:from-green-600 hover:to-green-700 w-full sm:w-auto justify-center"
        >
          <FaAndroid className="text-lg" />
          <span>ফ্রি ডাউনলোড</span>
        </a>
      </div>
    </aside>
  );
}
