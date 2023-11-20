import API_ENDPOINT from "./api";

const headers = {
  "User-Agent":
    "nuttycc/next-bangumi (https://github.com/nuttycc/next-bangumi)",
};

export async function getCalendar() {
  try {
    const res = await fetch("https://api.bgm.tv/calendar", {headers:headers});
    if (!res.ok) {
      throw new Error("Faild to fetch Calendar" + res.status);
    }
    return res.json();
  } catch (error) {
    console.log("🚀 getCalendar error:", error);
    throw error
  }
}

export async function getSubject(id) {
  try {
    const url = `${API_ENDPOINT}/subjects/${id}`;
    const res = await fetch(url, { headers: headers });
    if (!res.ok) {
      throw new Error(`Faild to fetch: ${res.status}, ${res.statusText}`);
    }
    return res.json();
  } catch(error){
    console.error("Error in get:", error.message);
    throw error; 
  }

}

export async function getImage(id, type) {
  const url = `${API_ENDPOINT}/subjects/${id}/image?type=${type}`;
  const res = await fetch(url, {headers:headers});
  if (!res.ok) {
    throw new Error(`Get Error: ${res.status}, ${res.statusText}`);
  }
  return res.json();
}

export async function getPersons(id) {
  try {
    const url = `${API_ENDPOINT}/subjects/${id}/persons`;
    const res = await fetch(url, {headers:headers});

    if (!res.ok) {
      throw new Error(`Get Error, Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getPersons:", error.message);
    throw error; 
  }
}


export async function getCharacters(id) {
  const url = `${API_ENDPOINT}/subjects/${id}/characters`;

  try {
    const res = await fetch(url, { headers: headers });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    // 在这里处理错误，可以记录日志、显示用户友好的错误信息等
    console.error("Error fetching characters:", error.message);
    throw error; // 将错误重新抛出，以便调用方也能处理
  }
}


export async function getRelated(id) {
  try {
    const url = `${API_ENDPOINT}/subjects/${id}/subjects`;
    const res = await fetch(url, { headers: headers });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}, ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export async function searchSubjectsBy(
  limit,
  offset = 0,
  { keyword = "", sort = "rank", filter },
) {
  const headers = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json",
    "User-Agent":
      "nuttycc/next-bangumi (https://github.com/nuttycc/next-bangumi)",
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
    console.error("Error during fetch:", error.message);
    throw new Error("An unexpected error occurred during the fetch operation.");
  }
}

