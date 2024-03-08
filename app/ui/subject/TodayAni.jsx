import Image from "next/image";
import { getCalendar } from "@/app/lib/subject";
import loadingPic from 'public/neutral-face-flatline.svg';



export default async function TodayAni() {
  const calendar = await getCalendar();

  const date = new Date();
  const today = date.getDay() === 0 ? 6 : date.getDay() - 1;

  const todayList = calendar[today]?.items.map((x) => {
    return (
      <a href={`/subject/${x.id}`} key={x.id} className="block max-w-[90px]">
        <div className="relative h-[140px] w-[90px]">
          <Image
            src={x.images.common}
            alt={x.name}
            fill
            sizes="90px"
            className="border object-cover object-top dark:border-gray-500"
          />
        </div>
        <div
          href={`/subject/${x.id}`}
          className="block truncate text-center text-xs"
        >
          {x.name_cn || x.name}
        </div>
      </a>
    );
  });


  const placeholder = Array(10).fill(0).map((x, i) => {
      return (
        <div key={i} className="max-w-[90px]">
          <div className="relative h-[140px] w-[90px]">
            <Image
              src={loadingPic}
              alt="image"
              fill
              className="object-cover border dark:border-gray-500"
            />
          </div>
          <a
            href={``}
            className="block w-16 h-4 truncate text-center text-xs"
          >
            
          </a>
        </div>
      );
  })

  return (
    <>
      {todayList ? todayList : placeholder}
    </>
  )
}