import { unstable_noStore } from "next/cache";

// Segment Config Options.
// export const revalidate = 3600

// test
export async function fetchData() {
  unstable_noStore();
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Data fetch complete after 3 seconds.");
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCalendar() {
  console.log("🚀 -- file: data.js:18 -- fetchCalendar -- fetchCalendar:", fetchCalendar)
  const res = await fetch('https://api.bgm.tv/calendar', {cache:"no-store"})
  console.log("🚀 -- file: data.js:21 -- fetchCalendar -- res:")

  if (!res.ok) {
    throw new Error('Faild to fetch Calendar')
  }
  return res.json()
  
}