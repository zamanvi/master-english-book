
const key = process.env.NEXT_PUBLIC_API_Public_Key;

export default async function getChapterData(id){
    
    const result = await fetch(`https://redrosebd.tech/api/v2/app/book/item/show/${id}?public_key=${key}`, {
        next: {
          revalidate: 60,
        }
      });

   return result.json() 

}