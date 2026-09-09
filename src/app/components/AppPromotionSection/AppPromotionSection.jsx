import Image from "next/image";
import Link from "next/link";
import appLogo from "../../../../public/image/appLogo.png";
import { FaAndroid, FaGraduationCap, FaVideo, FaHeadphones } from "react-icons/fa6";

const AppPromotionSection = () => {
  const features = [
    { icon: FaGraduationCap, text: "২০০+ ইন্টারেক্টিভ পাঠ" },
    { icon: FaVideo, text: "ভিডিও সহ প্রতিটি পাঠ" },
    { icon: FaHeadphones, text: "নেটিভ স্পিকার অডিও" },
    { icon: FaAndroid, text: "সম্পূর্ণ অফলাইন অ্যাক্সেস" },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-slate-50 via-blue-50 to-green-50 py-12 md:py-16 px-6">
      <div className="max-w-[1366px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-green-600 font-grotesk font-semibold text-sm uppercase tracking-widest mb-3">
            📱 আমাদের মোবাইল অ্যাপ
          </p>
          <h2 className="font-baloo font-extrabold text-3xl md:text-4xl text-slate-900 mb-4">
            যেকোনো সময়, যেকোনো জায়গায় শিখুন
          </h2>
          <p className="font-hind text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            আমাদের বিনামূল্যে English Grammar Book অ্যাপ ডাউনলোড করুন এবং অফলাইনে শিখতে থাকুন। কোনো ইন্টারনেট প্রয়োজন নেই!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center mb-12">
          {/* Left: App Icon & CTA */}
          <div className="flex flex-col items-center md:items-start gap-8">
            {/* App Icon */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-3xl blur-xl"></div>
              <Link
                href="https://play.google.com/store/apps/details?id=com.abmn.englishhub&pcampaignid=web_share"
                target="_blank"
                className="relative block hover:scale-110 transition-transform duration-300"
              >
                <Image
                  src={appLogo}
                  width={140}
                  alt="English Grammar Book App"
                  className="rounded-3xl shadow-2xl"
                />
              </Link>
            </div>

            {/* Download Button */}
            <Link
              href="https://play.google.com/store/apps/details?id=com.abmn.englishhub&pcampaignid=web_share"
              target="_blank"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-grotesk font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl group w-full md:w-auto justify-center"
            >
              <FaAndroid className="text-xl group-hover:scale-110 transition-transform" />
              <span>এখনই ডাউনলোড করুন</span>
            </Link>

            {/* Social Proof */}
            <div className="text-center md:text-left">
              <p className="text-slate-600 font-hind text-sm mb-2">⭐ ১০,০০০+ শিক্ষার্থী বিশ্বাস করেন</p>
              <p className="text-slate-500 font-hind text-xs">
                বিনামূল্যে • কোনো বিজ্ঞাপন নেই • সম্পূর্ণ নিরাপদ
              </p>
            </div>
          </div>

          {/* Right: Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-3 flex-shrink-0">
                      <IconComponent className="text-2xl text-green-600" />
                    </div>
                    <p className="font-hind text-slate-700 font-semibold text-sm leading-snug">
                      {feature.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 md:p-12 text-center shadow-xl">
          <h3 className="font-baloo font-bold text-2xl md:text-3xl text-white mb-3">
            এখনই শুরু করুন - সম্পূর্ণ বিনামূল্যে!
          </h3>
          <p className="font-hind text-blue-100 mb-6">
            প্রথম ৫০ পাঠ তাৎক্ষণিক অ্যাক্সেস পান। প্রিমিয়াম কন্টেন্ট আনলক করতে ঘুরে দেখুন।
          </p>
          <Link
            href="https://play.google.com/store/apps/details?id=com.abmn.englishhub&pcampaignid=web_share"
            target="_blank"
            className="inline-flex items-center gap-2 bg-white text-green-600 font-grotesk font-bold px-8 py-3 rounded-xl hover:bg-slate-50 transition-colors duration-300 shadow-lg"
          >
            Play Store এ যান →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AppPromotionSection;
