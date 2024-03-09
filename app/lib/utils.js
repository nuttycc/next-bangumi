import API_ENDPOINT from './api'

export async function getInfoByPath(path) {
  try {
    const headers = new Headers({
      'User-Agent':
        'nuttycc/next-bangumi/1.0 (https://github.com/nuttycc/next-bangumi)',
    })
    const url = `${API_ENDPOINT}${path}`
    const res = await fetch(url, { headers })
    if (!res.ok) {
      throw new Error(`Failed to get: ${res.status}, ${res.statusText}`)
    }
    return res.json()
  } catch (error) {
    console.error(`🔴 ~getInfoByPath~`, error)
    throw error
  }
}
