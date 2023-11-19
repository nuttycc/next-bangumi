import API_ENDPOINT from "./api";

export async function getCalendar() {
  try {
    const res = await fetch("https://api.bgm.tv/calendar");
    if (!res.ok) {
      throw new Error("Faild to fetch Calendar" + res.status);
    }
    return res.json();
  } catch (error) {
    console.log("🚀 getCalendar error:", error);
  }
}

export async function getSubject(id) {
  const url = `${API_ENDPOINT}/subjects/${id}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Faild to fetch: ${res.status}, ${res.statusText}`);
  }
  return res.json();
}

export async function getImage(id, type) {
  const url = `${API_ENDPOINT}/subjects/${id}/image?type=${type}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Faild to fetch: ${res.status}, ${res.statusText}`);
  }
  return res.json();
}

export async function getPersons(id) {
  try {
    const url = `${API_ENDPOINT}/subjects/${id}/persons`;
    const res = await fetch(url);

    // Check if the response status is in the range 200-299, indicating success
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }

    // Parse the JSON response
    const data = await res.json();
    return data;
  } catch (error) {
    // Handle errors that may occur during the fetch or JSON parsing
    console.error("Error in getPersons:", error.message);
    throw error; // rethrow the error to propagate it further if needed
  }
}


export async function getCharacters(id) {
  const url = `${API_ENDPOINT}/subjects/${id}/characters`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Faild to fetch: ${res.status}, ${res.statusText}`);
  }
  return res.json();
}

export async function getRelated(id) {
  const url = `${API_ENDPOINT}/subjects/${id}/subjects`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Faild to fetch: ${res.status}, ${res.statusText}`);
  }
  return res.json();
}

export async function searchSubjectsBy(
  limit,
  offset = 0,
  { keyword = "", sort = "rank", filter },
) {
  const headers = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json",
    "User-Agent": "nuttycc/next-bangumi/1.0"
  });

  const {
    type = [2],
    tag = [],
    air_date = [],
    rating = [],
    rank = [],
    nsfw = false,
  } = filter;

  const body = JSON.stringify({
    keyword: keyword,
    sort: sort,
    filter: { type, tag, air_date, rating, rank, nsfw },
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: body,
  };

  try {
    const res = await fetch(
      `https://api.bgm.tv/v0/search/subjects?limit=${limit}&offset=${offset}`,
      requestOptions,
    );

    if (!res.ok) {
      const errorMessage = await res.text(); // Get detailed error message from response body
      throw new Error(
        `Failed to fetch: ${res.status}, ${res.statusText}. ${errorMessage}`,
      );
    }

    return res.json();
  } catch (error) {
    // Handle network errors or other exceptions
    console.error("Error during fetch:", error.message);
    throw new Error("An unexpected error occurred during the fetch operation.");
  }
}

