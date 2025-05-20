
const key = process.env.NEXT_PUBLIC_API_Public_Key;
const BACKEND_ROOT_URL = process.env.BACKEND_URL;

export default async function getChapterData(slug){
    
    const result = await fetch(`${BACKEND_ROOT_URL}/api/v2/app/book/item/index?chapter_slug=${slug}&public_key=${key}`, {
        next: {
          revalidate: 15,
        }
      });

   return result.json() 

}