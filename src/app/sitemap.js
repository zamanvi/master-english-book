import getBook from "../../lib/getBook";
import getChapterData from "../../lib/getChapterData";

export const revalidate = 30

export default async function sitemap() {

    const siteURL = process.env.NEXT_WEBSITE_URL;
    const bookData = await getBook();
    const allChapters = bookData?.success?.data?.chapters?.data;
    let dynamicPages = [];

    await Promise.all(
      allChapters?.map(async (chapter) => {

        const chapterData = await getChapterData(chapter.slug);
        const chapterContent = chapterData?.success?.data?.items?.data;

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
        changeFrequency: 'weekly',
        priority: 1,
      },
      ...dynamicPages
      
    ]
  }
    

