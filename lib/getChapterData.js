
const key = process.env.NEXT_PUBLIC_API_Public_Key;

export default async function getChapterData(id){
    
    const result = await fetch(`https://redrosebd.tech/api/v2/app/book/item/index?chapter_id=${id}&public_key=${key}`, {
        next: {
          revalidate: 30,
        }
      });

   return result.json() 

}