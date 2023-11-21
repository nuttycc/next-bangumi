import { getInfoByPath } from "./utils";

// {small|grid|large|medium}
export async function getImage(id, type) {
  const path = `/characters/${id}/image?type=${type}`;
  const data = await getInfoByPath(path);
  return data;
}

export async function getDetails(id) {
  const path = `/characters/${id}`;
  const data = await getInfoByPath(path);
  return data;
}

export async function getRelatedPersons(id) {
  const path = `/characters/${id}/persons`;
  const data = await getInfoByPath(path);
  return data;
}

export async function getRelatedSubjects() {
  const path = `/characters/${id}/subjects`;
  const data = await getInfoByPath(path);
  return data;
}
