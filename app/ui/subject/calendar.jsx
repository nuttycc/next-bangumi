'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';


export default function AniCalender({ data }) {

  console.log('🕑client inner ' + new Date().toLocaleString());
  
  const [today, setToday] = useState(
    () => {
      const date = new Date();
      return date.getDay() === 0 ? 6 : date.getDay() - 1
    }
  );

  useEffect(() => {
    setToday(() => {
      const date = new Date();
      return date.getDay() === 0 ? 6 : date.getDay() - 1;
    });
  }, [])
  
  const CardList = data[today]?.items.map((item) => {
    return (
      <li
        key={item.id}
        style={{ counterIncrement: 'listCounter' }}
        className="my-1 before:inline-block before:w-5 before:bg-[#F465B1] before:text-center before:text-[0.85rem] before:content-[_counter(listCounter)] before:dark:invert"
      >
        <a href={`/subject/${item.id}`} className="border-b border-blue-700">
          {item['name_cn'] || item['name']}
        </a>
      </li>
    );
  });

  // 周
  const week = ['一', '二', '三', '四', '五', '六', '日'];
  const weekdays = week.map((x, i) => {
    return (
      <button
        key={x}
        className={clsx('border px-1', {
          'bg-[#3CB03E] dark:invert': i === today,
        })}
        onClick={() => setToday(i)}
      >
        {x}
      </button>
    );
  });

  return (
    <>
      {/* 移动端 */}
      <div className="shadow-[1px_2px_5px_1px_rgba(155,155,155, 0.5)] m-2 border border-sky-600 md:hidden">
        <div className="flex">{weekdays}</div>
        <ol className="" style={{ counterReset: 'listCounter' }}>
          {CardList}
        </ol>
      </div>
    </>
  );
}
