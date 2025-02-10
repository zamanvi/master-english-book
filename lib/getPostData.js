
const key = process.env.NEXT_PUBLIC_API_Public_Key;

export default async function getPostData(slug){
    
    const result = await fetch(`https://redrosebd.click/api/v2/app/book/item/show/${slug}?&public_key=${key}`, {
        next: {
          revalidate: 15,
        }
      });

   return result.json() 

}