import getWebSection from "../../lib/getWebSection";
import getWebChapterData from "../../lib/getWebChapterData";

export const revalidate = 30;

async function sectionPages(siteURL, sectionSlug, basePath) {
  const bookData = await getWebSection(sectionSlug);
  const allChapters = bookData?.success?.data?.chapters?.data;
  const pages = [];

  await Promise.all(
    allChapters?.map(async (chapter) => {
      const chapterData = await getWebChapterData(chapter.slug);
      const chapterContent = chapterData?.success?.data?.lessons?.data;

      chapterContent?.map((content) => {
        pages.push({
          url: `${siteURL}${basePath}/${content?.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      });
    }) || []
  );

  return pages;
}

export default async function sitemap() {
  const siteURL = process.env.NEXT_PUBLIC_WEBSITE_URL;

  const [bangladeshPages, internationalPages] = await Promise.all([
    sectionPages(siteURL, "bangladesh", "/book"),
    sectionPages(siteURL, "international", "/international/book"),
  ]);

  return [
    {
      url: siteURL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteURL}/international`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...bangladeshPages,
    ...internationalPages,
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
