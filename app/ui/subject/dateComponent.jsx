'use client'

import { useEffect, useState } from "react";

export default function DateComponent() {
  const [date, setDate] = useState(null)
  const week = ['一', '二', '三', '四', '五', '六', '日'];
  let time, day
  if (date) {
    time = date.toLocaleDateString()
    day = week[date.getDay() - 1];
  }
  useEffect(() => {
    setDate(new Date())
  }, [])
  return (
    <>
      <span className="text-[0.8rem] text-blue-500">
        {time}
        星期
        <span className="">{day}</span>
      </span>
    </>
  );
}