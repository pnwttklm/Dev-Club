export async function GetApplicants() {
const res = await fetch(process.env.NEXT_PUBLIC_FIREBASE_JSON_URL!, {
    cache: "force-cache", 
  });
  return await res.json();
}