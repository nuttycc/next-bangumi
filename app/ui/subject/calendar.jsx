'use client'

import { useState } from "react";
import clsx from "clsx";
import styles from "./subject.module.css"
// import AniCard from "./card";
// import { getCalendar } from "@/app/lib/subject";


export default function AniCalender({ data }) {
  const date = new Date()

  const [today, setToday] = useState(date.getDay() === 0 ? 6 : date.getDay() - 1)
  console.log("🚀🚀 ~ today:", today)

  const dayCards = data[today].items.map((item) => {
    return (
      <div key={item.id}>
        <a href={`/subject/${item.id}`} className="border-b">
          {item["name_cn"] || item["name"]}
        </a>
      </div>
    );

  // const calendar = data.map((obj) => {
  //   const dayCards = obj.items.map((item) => {
  //     return (
  //       <div key={item.id}>
  //         <p className="border-b">{item["name_cn"] || item["name"]}</p>
  //       </div>
  //     );
  //   });

    // 日番剧
    // return (
    //   <div key={obj.weekday.id} className="flex mb-1">
    //     <div className={clsx(
    //       styles["day-title"],
    //       today === obj.weekday.id - 1 && styles["isToday"]
    //     )}>{obj.weekday.cn}</div>
    //     <div className={styles.dayCards}>
    //       {dayCards}
    //     </div>
    //   </div>
    // );
  });


  // 移动端顶部周菜单
  const week = ['一', '二', '三', '四', '五', '六', '日']
  const weekdays = week.map((x, i) => {
    return (
      <button key={x} className={clsx(
        'border px-1',
        {"bg-pink-500": i === today}
      )}
        onClick={() => setToday(i)}
      >
        {x}
      </button>
    )
  })

  return (
    <>
      {/* 移动端 */}
      <div className="md:hidden">
        <div className="flex">
          {weekdays}
        </div>
        {/* {calendar[today]} */}
        {dayCards}
      </div>
    </>
  );
}