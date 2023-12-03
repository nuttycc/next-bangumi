import { getCalendar } from '../../lib/subject';
import AniCalender from '../../ui/subject/calendar';
import AniCalenderOnDesk from '../../ui/subject/calendarDesk';

export const revalidate = 120

// export const dynamic = 'force-dynamic';


export default async function Page() {

  console.log('🕑 ' + new Date().toLocaleString());

  const data = await getCalendar();

  console.log(`😒😒😒😒`)
  return (
    <>
      <AniCalender data={data} />
      <AniCalenderOnDesk data={data} />
    </>
  );
}
