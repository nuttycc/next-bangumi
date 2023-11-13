
import { fetchCalendar } from "../../lib/data";
import AniCalender from "../../ui/anime/calendar";

export default async function Page() {
  const data = await fetchCalendar()
  return (
    <>
      <AniCalender data={data} />
    </>
  )
}
