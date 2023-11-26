import { getCalendar } from '../../lib/subject';
import AniCalender from '../../ui/subject/calendar';
import AniCalenderOnDesk from '../../ui/subject/calendarDesk';

export default async function Page() {
  const data = await getCalendar();

  return (
    <>
      <AniCalender data={data} />
      <AniCalenderOnDesk data={data} />
    </>
  );
}
