

export async function fetchCalendar() {
  const res = await fetch('https://api.bgm.tv/calendar', {cache:'no-store'})
  if (!res.ok) {
    throw new Error('Faild to fetch Calendar')
  }
  return res.json()
  
}


export async function fetchInfoById() {
  
}