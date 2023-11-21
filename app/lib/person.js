import { getInfoByPath } from "./utils";

export async function getDetails(id) {
  const path = `persons/${id}`;
  const data = await getInfoByPath(path);
  return data;
}

// {small|grid|large|medium}
export async function getPersonImage(id, type = "grid") {
  const imageUrl = `https://api.bgm.tv/v0/personss/${id}/image?type=${type}`;
  const headers = new Headers({
    "User-Agent":
      "nuttycc/next-bangumi/1.0 (https://github.com/nuttycc/next-bangumi)",
  });
  try {
    const response = await fetch(imageUrl, { headers })
    if (!response.ok) {
      throw new Error(`Failed to fetch image, ${response.status}.`)
    }
    const blob = await response.blob()
    const imgUrl = URL.createObjectURL(blob)
    return imgUrl
  } catch (error) {
    throw error
  }
}

export async function getRelatedCharacters() {
  const path = `persons/${id}/characters`;
  const data = await getInfoByPath(path);
  return data;
}

export async function getRelatedSubjects() {

  const path = `persons/${id}/subjects`;
  const data = await getInfoByPath(path);
  return data;
}
