/* eslint-disable @next/next/no-img-element */
'use client'

import { getSubject } from '@/app/lib/subject'
import { useRef, useState } from 'react'

export default function RandomSubjects({ subjectPromises }) {
  const [result, setResult] = useState(subjectPromises)
  const flushBtn = useRef(null)

  const randomList = result.map((x, i) => {
    if (x.status === 'rejected') return
    const v = x.value
    return (
      <div key={i} className="mb-1 flex gap-2 border">
        <div className="shrink-0">
          <img
            src={v.images?.small}
            alt={v.name}
            width={70}
            height={90}
            className="photo-frame h-[90px] w-[70px] object-cover object-top"
          />
        </div>
        <div className="">
          <a href={`/subject/${v.id}`} className="text-link mb-1 block">
            {x.value?.name_cn || x.value.name}
          </a>
          <div className="text-sm">
            <div>{v.platform || '--'}</div>
            <div>{v.date || '--'}</div>
          </div>
        </div>
      </div>
    )
  })

  async function flush() {
    flushBtn.current.disabled = true

    const randomIds = Array(10)
      .fill(0)
      .map((x, i) => Math.floor(Math.random() * 10000))

    Promise.allSettled(
      randomIds.map((id) => {
        return getSubject(id)
      }),
    ).then((v) => {
      setResult(v)
      flushBtn.current.disabled = false
    })
  }

  return (
    <div>
      <h2 className="mb-1 text-lg">
        随机条目
        <button
          ref={flushBtn}
          type="button"
          onClick={flush}
          className="ml-2 border px-1 text-sm disabled:text-gray-500"
        >
          刷新
        </button>
      </h2>

      <div className="grid-cols-2 text-base md:grid">{randomList}</div>
    </div>
  )
}
