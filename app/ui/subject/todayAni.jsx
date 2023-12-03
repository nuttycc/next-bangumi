'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import loadingPic from 'public/info_only.png';
export default function TodayAni({ calendar }) {
  const [today, setToday] = useState(-1)

  useEffect(() => {
    setToday(() => {
      const date = new Date();
      return date.getDay() === 0 ? 6 : date.getDay() - 1;
    });
  }, [])


  const placeholder = Array(20).fill(0).map((x, i) => {
    return (
      <div key={i}>
        <div className="w-[90px]">
          <Image
            src={loadingPic}
            alt="loading"
            width={90}
            height={140}
            className="h-[140px] w-[90px] border object-cover object-top dark:border-gray-400"
          />
          <a
            href={``}
            className="block truncate text-center text-xs"
          >
          </a>
        </div>

        {/* <div>{x.collection?.doing}</div> */}
        {/* <div>{x.rating?.score}</div> */}
        {/* <div>{x.rating?.total}</div> */}
      </div>
    );
  });

  const todayList = today !== -1 && calendar[today].items.map((x) => {
    return (
      <div key={x.id}>
        <div className="w-[90px]">
          <Image
            src={x.images.large}
            alt={x.name}
            width={90}
            height={140}
            className="h-[140px] w-[90px] border object-cover object-top dark:border-gray-300"
          />

          <a
            href={`/subject/${x.id}`}
            className="block truncate text-center text-xs"
          >
            {x.name_cn || x.name}
          </a>
        </div>

        {/* <div>{x.collection?.doing}</div> */}
        {/* <div>{x.rating?.score}</div> */}
        {/* <div>{x.rating?.total}</div> */}
      </div>
    );
  });

  return <>{today !== -1 ? todayList : placeholder }</>
}