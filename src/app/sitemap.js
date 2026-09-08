import getWebSection from "../../lib/getWebSection";
import getWebChapterData from "../../lib/getWebChapterData";

export const revalidate = 30;

export default async function sitemap() {
  const siteURL = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const bookData = await getWebSection("bangladesh");
  const allChapters = bookData?.success?.data?.chapters?.data;
  let dynamicPages = [];

  await Promise.all(
    allChapters?.map(async (chapter) => {
      const chapterData = await getWebChapterData(chapter.slug);
      const chapterContent = chapterData?.success?.data?.lessons?.data;

      chapterContent?.map((content) => {
        const postPage = {
          url: `${siteURL}/book/${content?.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        };

        dynamicPages.push(postPage);
      });
    })
  );

  return [
    {
      url: siteURL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...dynamicPages,
    {
      url: `${siteURL}/TermsAndConditions`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteURL}/PrivacyPolicy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
