import { getCalendar } from '../../lib/subject';
import AniCalender from '../../ui/subject/CalendarMob';
import AniCalenderOnDesk from '../../ui/subject/CalendarDesk';

export const revalidate = 3600;

export const metadata = {
  title: 'Calendar',
};

export default async function Page() {
  // console.log(`🟦 calendar server inner ${new Date().toLocaleString()}`);

  const data = await getCalendar();

  return (
    <>
      <AniCalender data={data} />
      <AniCalenderOnDesk data={data} />
    </>
  );
}
