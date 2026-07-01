import Link from "next/link";
import getPostData from "../../../../lib/getPostData";

const siteURL = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://www.masterenglishbook.com";

export default async function page({ params }) {
  const postSlug = params?.slug;
  const postInfo = await getPostData(postSlug);
  const postContent = postInfo?.success?.data?.item;

  const getEmbedLink = (url) => {
    if (!url) return null;
    let videoId;
    if (url.includes("youtube.com")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const canonicalUrl = `${siteURL}/book/${postSlug}`;

  return (
    <article className="px-5 md:px-8 py-6 md:py-8 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: postContent?.title,
            description: postContent?.short_details,
            url: canonicalUrl,
            isPartOf: {
              "@type": "Book",
              name: "দূর্বলদের Master English Book Part - I",
              url: siteURL,
            },
            publisher: {
              "@type": "Organization",
              name: "Red Rose Corporation",
              url: "https://corporation.redrosebd.com",
            },
          }),
        }}
      />

      {/* Breadcrumb */}
      <nav className="text-xs font-grotesk text-slate-400 mb-5 flex items-center gap-1 overflow-hidden">
        <Link href="/" className="hover:text-blue-600 transition-colors shrink-0">
          Home
        </Link>
        <span className="shrink-0">/</span>
        <span className="text-slate-500 truncate min-w-0">{postContent?.title}</span>
      </nav>

      {/* Title */}
      <h1 className="font-baloo font-bold text-2xl md:text-3xl text-slate-900 leading-tight mb-6">
        {postContent?.title}
      </h1>

      {/* Lesson HTML content */}
      <div className="revert-tailwind">
        <div
          className="revert-tailwind"
          dangerouslySetInnerHTML={{ __html: postContent?.details }}
        />
      </div>

      {/* YouTube embed */}
      {postContent?.link && (
        <div className="relative w-full md:w-10/12 mx-auto my-10 aspect-video">
          <iframe
            className="absolute inset-0 w-full h-full rounded-xl shadow-lg"
            src={getEmbedLink(postContent?.link)}
            title={`${postContent?.title} — Video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}
    </article>
  );
}

export async function generateMetadata({ params }) {
  const postSlug = params?.slug;
  const postInfo = await getPostData(postSlug);
  const postContent = postInfo?.success?.data?.item;
  const canonicalUrl = `${siteURL}/book/${postSlug}`;

  return {
    title: postContent?.title,
    description: postContent?.short_details,
    keywords: postContent?.keyword,
    robots: "index, follow",
    googleBot: "index, follow",
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: postContent?.title,
      description: postContent?.short_details,
      url: canonicalUrl,
      siteName: "Master English Book",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: postContent?.title,
      description: postContent?.short_details,
    },
  };
}
