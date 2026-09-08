// Mirrors getChapterData.js, reading from /api/v2/app/websection/lesson/index
// instead of /api/v2/app/book/item/index.

const key = process.env.NEXT_PUBLIC_API_Public_Key;
const BACKEND_ROOT_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function getWebChapterData(slug) {
  const result = await fetch(
    `${BACKEND_ROOT_URL}/api/v2/app/websection/lesson/index?chapter_slug=${slug}&public_key=${key}`,
    {
      next: {
        revalidate: 15,
      },
    }
  );

  return result.json();
}
