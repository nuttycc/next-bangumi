import { unstable_noStore } from "next/cache";

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
