
import API_ENDPOINT from "./api"

export async function getCalendar() {
  try {
    const res = await fetch('https://api.bgm.tv/calendar')
    if (!res.ok) {
      throw new Error('Faild to fetch Calendar', res.status)
    }
    return res.json()
  } catch(error) {
    console.log("🚀 getCalendar error:", error)
  }

}

export async function getSubject(id) {
  const url = `${API_ENDPOINT}/subjects/${id}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Faild to fetch by id.')
  }
  return res.json()
}

export async function getImage(id, type) {
  const url = `${API_ENDPOINT}/subjects/${id}/image?type=${type}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Faild to fetch by id.')
  }
  return res.json()
}

export async function getPersons(id) {
  const url = `${API_ENDPOINT}/subjects/${id}/persons`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Faild to fetch by id.')
  }
  return res.json()
}

export async function getCharacters(id) {
  const url = `${API_ENDPOINT}/subjects/${id}/characters`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Faild to fetch by id.')
  }
  return res.json()
}

export async function getRelated(id) {
  const url = `${API_ENDPOINT}/subjects/${id}/subjects`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Faild to fetch by id.')
  }
  return res.json()
}


export async function searchSubjectsBy() {
  const headers = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json",
  })
  const body = JSON.stringify({
    "keyword": "",
    "sort": "rank",
    "filter": {
      "type": [
        2
      ],
      "tag": [],
      "air_date": [],
      "rating": [],
      "rank": [
        ">0",
        "<=999"
      ],
      "nsfw": true
    }
  });

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: body,
  }

  const res = await fetch('', requestOptions)
  if (!res.ok) {
    throw new Error('Faild to fetch by id.')
  }
  return res.json()
}

