import { getInfoByPath } from "./utils";

export async function getCalendar() {
  const headers = new Headers({
    "User-Agent":
      "nuttycc/next-bangumi/1.0 (https://github.com/nuttycc/next-bangumi)",
  });
  try {
    const res = await fetch("https://api.bgm.tv/calendar");

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(
        `Failed to fetch: ${res.status}, ${res.statusText}. ${errorMessage}`,
      );
    }

    return res.json();
  } catch (error) {
    console.error("Error in getCalendar: ", error);
    throw error;
  }
}


export async function getSubject(id) {
  const path = `/subjects/${id}`;
  const data = await getInfoByPath(path);
  return data;
}

export async function getImage(id, type) {
  const path = `/subjects/${id}/image?type=${type}`;
  const data = await getInfoByPath(path);
  return data;
}

export async function getPersons(id) {
  const path = `/subjects/${id}/persons`;
  const data = await getInfoByPath(path);
  return data;
}

export async function getCharacters(id) {
  const path = `/subjects/${id}/characters`;
  const data = await getInfoByPath(path);
  return data;
}

export async function getRelated(id) {
  const path = `/subjects/${id}/subjects`;
  const data = await getInfoByPath(path);
  return data;
}

export async function searchSubjectsBy(
  limit,
  offset = 0,
  { keyword = "", sort = "rank", filter },
) {
  const headers = new Headers({
    "User-Agent":
      "nuttycc/next-bangumi/1.0 (https://github.com/nuttycc/next-bangumi)",
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
      const errorMessage = await res.text(); 
      throw new Error(
        `Failed to fetch: ${res.status}, ${res.statusText}. ${errorMessage}`,
      );
    }

    return res.json();
  } catch (error) {
    throw error
  }
}
