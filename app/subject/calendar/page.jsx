import { getCalendar } from "../../lib/subject";
import AniCalender from "../../ui/subject/calendar";
import AniCalenderOnMd from "../../ui/subject/calendarM";

export default async function Page() {
  const data = await getCalendar();

  return (
    <>
      <AniCalender data={data} />
      <AniCalenderOnMd data={data} />
    </>
  );
}
