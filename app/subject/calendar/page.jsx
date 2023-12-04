import { getCalendar } from '../../lib/subject';
import AniCalender from '../../ui/subject/calendar';
import AniCalenderOnDesk from '../../ui/subject/calendarDesk';

export const revalidate = 1800;

export const metadata = {
  title: 'Calendar',
};

export default async function Page() {
  console.log('🕑 ' + new Date().toLocaleString());

  const data = await getCalendar();

  console.log(`😒😒😒😒`);
  return (
    <>
      <AniCalender data={data} />
      <AniCalenderOnDesk data={data} />
    </>
  );
}
