import { getInfoByPath } from "./utils";

export async function getDetails(id) {
  const path = `persons/${id}`;
  const data = await getInfoByPath(path);
  return data;
}

// {small|grid|large|medium}
export async function getImage(id, type) {
  const path = `persons/${id}/image?type=${type}`;
  const data = await getInfoByPath(path)
  return data
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
