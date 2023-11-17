import API_ENDPOINT from "./api";

let URL = API_ENDPOINT + "/characters";

// {small|grid|large|medium}
export async function getImage(id, type) {
  const url = URL + `/${id}/image?type=${type}`;
  const res = await fetch(url);
  if (!res) {
    throw new Error("Faild to fetch Character Info.");
  }
  return res.json();
}

export async function getDetails(id) {
  const url = URL + `/${id}`;
  const res = await fetch(url);
  if (!res) {
    throw new Error("Faild to fetch Character Info.");
  }
  return res.json();
}

export async function getRelatedPersons() {
  const url = URL + `/${id}/persons`;
  const res = await fetch(url);

  if (!res) {
    throw new Error("Faild to fetch Character Info.");
  }
  return res.json();
}

export async function getRelatedSubjects() {
  const url = URL + `/${id}/subjects`;
  const res = await fetch(url);
  if (!res) {
    throw new Error("Faild to fetch Character Info.");
  }
  return res.json();
}
