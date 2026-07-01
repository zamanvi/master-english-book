import getPostData from "../../../../lib/getPostData";

const siteURL = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://www.masterenglishbook.com";

export default async function page({ params }) {
  const postSlug = params?.slug;
  const postInfo = await getPostData(postSlug);
  const postContent = postInfo?.success?.data?.item;

  // Function to convert a regular YouTube URL to an embeddable format
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": postContent?.title,
            "description": postContent?.short_details,
            "url": canonicalUrl,
            "isPartOf": { "@type": "Book", "name": "দূর্বলদের Master English Book Part - I", "url": siteURL },
            "publisher": {
              "@type": "Organization",
              "name": "Red Rose Corporation",
              "url": "https://corporation.redrosebd.com"
            }
          })
        }}
      />
      <h1 className="font-bold  text-lg lg:text-xl xl:text-2xl mb-5 xl:mb-8">
        {postContent?.title}
      </h1>

      <div className="revert-tailwind">
        <div
          className="revert-tailwind"
          dangerouslySetInnerHTML={{ __html: postContent?.details }}
        ></div>
      </div>

      <div className="w-full md:w-10/12 mx-auto my-10 lg:my-16">
        {postContent?.link && (
          <iframe
            className="w-full mx-auto rounded-lg h-[230px] md:h-[240px] lg:h-[300px] xl:h-[440px]"
            src={getEmbedLink(postContent?.link)}
            title={`${postContent?.title}--Video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </>
  );
}

export async function generateMetadata({ params }) {
  const postSlug = params?.slug;
  const postInfo = await getPostData(postSlug);
  const postContent = postInfo?.success?.data?.item;
  const postTitle = postContent?.title;
  const postDescription = postContent?.short_details;
  const pageKeyword = postContent?.keyword;

  const canonicalUrl = `${siteURL}/book/${postSlug}`;

  return {
    title: postTitle,
    description: postDescription,
    keywords: pageKeyword,
    robots: "index, follow",
    googleBot: "index, follow",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: postTitle,
      description: postDescription,
      url: canonicalUrl,
      siteName: "Master English Book",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: postTitle,
      description: postDescription,
    },
  };
}
