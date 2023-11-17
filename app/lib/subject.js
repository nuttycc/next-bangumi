import API_ENDPOINT from "./api";

export async function getCalendar() {
  try {
    const res = await fetch("https://api.bgm.tv/calendar");
    if (!res.ok) {
      throw new Error("Faild to fetch Calendar", res.status);
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
    throw new Error("Faild to fetch by id.");
  }
  return res.json();
}

export async function getImage(id, type) {
  const url = `${API_ENDPOINT}/subjects/${id}/image?type=${type}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Faild to fetch by id.");
  }
  return res.json();
}

export async function getPersons(id) {
  const url = `${API_ENDPOINT}/subjects/${id}/persons`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Faild to fetch by id.");
  }
  return res.json();
}

export async function getCharacters(id) {
  const url = `${API_ENDPOINT}/subjects/${id}/characters`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Faild to fetch by id.");
  }
  return res.json();
}

export async function getRelated(id) {
  const url = `${API_ENDPOINT}/subjects/${id}/subjects`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Faild to fetch by id.");
  }
  return res.json();
}

export async function searchSubjectsBy(
  limit,
  offset = 0,
  { keyword = "", sort = "rank", filter },
) {
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
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
  // console.log("🚀🚀 ~ searchSubjectsBy ~ body: ", body)

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: body,
  };

  const res = await fetch(
    `https://api.bgm.tv/v0/search/subjects?limit=${limit}&offset=${offset}`,
    requestOptions,
  );
  if (!res.ok) {
    throw new Error("Faild to fetch by id.");
  }
  return res.json();
}
