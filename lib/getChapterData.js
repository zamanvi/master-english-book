
const key = process.env.NEXT_PUBLIC_API_Public_Key;

export default async function getChapterData(id){
    
    const result = await fetch(`https://redrosebd.tech/api/v2/app/book/chapter/show/${id}?public_key=${key}`, {
        cache: "no-store",
      });

   return result.json() 

}