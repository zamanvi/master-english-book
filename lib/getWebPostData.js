// Mirrors getPostData.js, reading from /api/v2/app/websection/lesson/show/{slug}
// instead of /api/v2/app/book/item/show/{slug}.

const key = process.env.NEXT_PUBLIC_API_Public_Key;
const BACKEND_ROOT_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function getWebPostData(slug) {
  const result = await fetch(
    `${BACKEND_ROOT_URL}/api/v2/app/websection/lesson/show/${slug}?public_key=${key}`,
    {
      next: {
        revalidate: 15,
      },
    }
  );

  return result.json();
}
