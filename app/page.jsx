
import { getCalendar, getSubject } from './lib/subject';
import Image from 'next/image';
import Scroll from './ui/scroll';
import TodayAni from './ui/subject/todayAni';
import RandomSubjects from './ui/subject/randomSubjects';

const date = new Date();
const today = date.getDay() === 0 ? 7 : date.getDay(); // 0 1 2 3...
const random = Array(10).fill(0).map((x, i) => Math.floor(100000+i))

const rPromise = await Promise.allSettled(random.map(x => {
  return getSubject(x)
}))

const calendar = await getCalendar();

export default function Page() {
  const todayList = calendar[today - 1].items.map((x) => {
    return (
      <div key={x.id}>
        <div className="w-[100px]">
          <Image
            src={x.images.large}
            alt={x.name}
            width={100}
            height={150}
            className="w-[100px] h-[150px] border dark:border-gray-400 object-cover object-top"
          />
          <a href={`/subject/${x.id}`} className="block text-center text-xs truncate">
            {x.name_cn || x.name}
          </a>
        </div>

        {/* <div>{x.collection?.doing}</div> */}
        {/* <div>{x.rating?.score}</div> */}
        {/* <div>{x.rating?.total}</div> */}
      </div>
    );
  });

  const randomList = rPromise.map((x, i) => {
    if (x.status === 'rejected') return
    const v = x.value
    return (
      <div key={i} className="flex gap-1">
        <div className='shrink-0'>
          <Image
            src={v.images.grid}
            alt={v.name}
            width={70}
            height={100}
            className="h-[80px] w-[70px] object-cover object-top border"
          />
        </div>
        <div>
          <div>{x.value.name_cn || x.value.name}</div>
          <div>{v.platform}</div>
          <div>{v.date}</div>
          <div>{}</div>
        </div>
      </div>
    );
  })

  return (
    <div className="">
      <h1 className="sr-only">Home Page</h1>
      <div className="relative mb-2 md:w-max">
        <h2 className="text-lg">今日放送</h2>
        <div
          className="flex h-max overflow-hidden scroll-smooth md:w-[50vw]"
        >
          <TodayAni calendar={calendar} />
          <Scroll />
        </div>
      </div>
      <div>
        <RandomSubjects rPromise={rPromise} />
      </div>
    </div>
  );
}
