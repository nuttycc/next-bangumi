import { getCalendar, getSubject } from './lib/subject';
import Image from 'next/image';
import ScrollButton from './ui/ScrollButton';
import RandomSubjects from './ui/subject/RandomSubjects';
import TodayAni from './ui/subject/TodayAni';

export const revalidate = 3600;

export const metadata = {
  title: 'Home | Next Bangumi',
};

export default async function Page() {
  const random = Array(10)
    .fill(0)
    .map((x, i) => Math.floor(200000 + i * 1000));

  const subjectPromises = await Promise.allSettled(
    random.map((x) => {
      return getSubject(x);
    }),
  ) || [];

  const calendar = await getCalendar() || [];

  return (
    <div className="md:w-[66vw]">
      <h1 className="sr-only">Home Page</h1>
      <div className="relative mb-2 md:w-max">
        <h2 className="text-lg">今日放送</h2>
        <div className="flex h-max overflow-hidden scroll-smooth md:w-[66vw]">
          {/* {todayList} */}
          <TodayAni calendar={calendar} />
          <ScrollButton />
        </div>
      </div>
      <div className="">
        <RandomSubjects subjectPromises={subjectPromises} />
      </div>
    </div>
  );
}
