// Fetches the chapter list for a Website Section (Bangladesh/International),
// mirroring getBook.js but reading from the new /api/v2/app/websection/...
// endpoints instead of /api/v2/app/book/... - see the Learnify backend's
// WebSectionController/ApiWebSectionController for why these are a separate,
// independent structure from the app's own Book/BookChapter/BookItem.

const key = process.env.NEXT_PUBLIC_API_Public_Key;
const BACKEND_ROOT_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function getWebSection(sectionSlug = "bangladesh") {
  const result = await fetch(
    `${BACKEND_ROOT_URL}/api/v2/app/websection/chapter/index?section_slug=${sectionSlug}&public_key=${key}`
  );

  return result.json();
}
