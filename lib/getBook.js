
const key = process.env.NEXT_PUBLIC_API_Public_Key;


export default async function getBook() {
  const result = await fetch(`https://redrosebd.tech/api/v2/app/book/item/index?&public_key=${key}`, {
    next: {
      revalidate: 60,
    },
  });

  return result.json() 
}