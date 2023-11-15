
import { getCalendar } from "../../lib/subject";
import AniCalender from "../../ui/subject/calendar";

export default async function Page() {
  const data = await getCalendar()

  return (
    <>
      <AniCalender data={data} />
    </>
  )
}
