'use client'

import { useState, useRef, useEffect } from 'react'
import { searchByKeywords } from '../lib/subject'
import { useDebouncedCallback } from 'use-debounce'
import clsx from 'clsx'

export default function Search() {
  const displayResult = useRef(null)
  const [resultList, setResultList] = useState()

  const debounced = useDebouncedCallback(search, 1000)

  async function search(value) {
    const keywords = value

    console.log('🚀🚀 ~ search ~ keywords: ', keywords)
    if (!keywords) {
      setResultList(null)
      return
    }

    const result = await searchByKeywords(keywords)
    const list = result.list.map((item) => {
      return (
        <div key={item.id}>
          <a
            href={`/subject/${item.id}`}
            style={{ counterIncrement: 'listCounter' }}
            className="mb-2 block border-b border-blue-400 before:inline-block before:w-4 before:bg-[#F465B1] before:text-center before:text-[0.82em] before:content-[_counter(listCounter)] before:dark:invert"
          >
            {item.name_cn || item.name}
          </a>
          <p>{}</p>
          <p>{}</p>
          <p>{}</p>
        </div>
      )
    })
    setResultList(list)
  }

  return (
    <div className="relative">
      {/* 搜索框 */}
      <input
        type="text"
        placeholder="search"
        size={6}
        onChange={(e) => debounced(e.target.value)}
        className="mx-2 rounded-sm border border-gray-700 px-2 py-1 text-sm dark:border-gray-400 dark:bg-gray-800 dark:text-white"
      />

      <ul
        ref={displayResult}
        style={{ counterReset: 'listCounter' }}
        className={clsx(
          'absolute z-50 h-[14rem] w-[10rem] overflow-y-auto rounded-sm border bg-slate-200 p-1 text-sm dark:bg-slate-700',
          {
            hidden: !resultList,
          },
        )}
      >
        {resultList}
      </ul>
    </div>
  )
}
