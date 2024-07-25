import getPostData from "../../../../lib/getPostData";

export default async function page({ params }) {
  const postSlug = params?.slug;
  const postInfo = await getPostData(postSlug);
  const postContent = postInfo?.success?.data?.item;

  return (
    <>
      <h1 className="font-bold  text-lg lg:text-xl xl:text-2xl mb-5 xl:mb-8">
        {postContent?.title}
      </h1>

      <div className="revert-tailwind">
        <div
          className="revert-tailwind"
          dangerouslySetInnerHTML={{ __html: postContent?.details }}
        ></div>
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

  return {
    title: `${postTitle}`,
    description: `${postDescription}`,
    keywords: pageKeyword,
    robots: "ALL",
    robots: "index, follow",
    googleBot: "index, follow",
    googleBotNews: "index, follow",
    distribution: "Global",
  };
}
