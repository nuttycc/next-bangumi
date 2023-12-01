/* eslint-disable @next/next/no-img-element */
'use client'
import { getSubject } from "@/app/lib/subject";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function RandomSubjects({ rPromise }) {

  const [result, setResult] = useState(rPromise)

  useEffect(() => {
    flush()
  }, [])
  
  const randomList =  result.map((x, i) => {
    if (x.status === 'rejected') return;
    const v = x.value;
    return (
      <div key={i} className="mb-1 flex gap-2 border">
        <div className="shrink-0">
          <img
            src={v.images.small}
            alt={v.name}
            width={70}
            height={90}
            className="photo-frame h-[90px] w-[70px] object-cover object-top"
          />
        </div>
        <div className="">
          <a href={`/subject/${v.id}`} className="text-link mb-1 block">
            {x.value.name_cn || x.value.name}
          </a>
          <div>{v.platform || '--'}</div>
          <div>{v.date || '--'}</div>
        </div>
      </div>
    );
  });
  
  
  async function flush() {
    const randomIds = Array(10)
      .fill(0)
      .map((x, i) => Math.floor(Math.random() * 10000));

    Promise.allSettled(randomIds.map(id => {
      return getSubject(id)
    })).then((v) => {
      setResult(v)
    })
  }
  
  return (
    <div>
      <h2 className="text-lg mb-1">
        随机条目
        <button type="button" onClick={flush} className="ml-2 text-sm border px-1">
          刷新
        </button>
      </h2>

      <div className="grid-cols-2 md:grid">{randomList}</div>
    </div>
  );
}