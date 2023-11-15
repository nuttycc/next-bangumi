'use client'

import { useEffect, useState } from "react"
import clsx from "clsx"

export default function ChangeTheme() {
  const [theme, setTheme] = useState('system')
  const [show, setShow] = useState(false)

  // 使用 useEffect 会使界面进行突兀的改变
  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    if (localTheme === 'dark' ||(!localTheme && window.matchMedia('((prefers-color-scheme: dark))'))) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  function handleClick(x) {
    if(localStorage.getItem('theme') === x) {
      return
    }
    if(x === 'system') {
      localStorage.removeItem('theme')
    } else {
      localStorage.setItem('theme', x)
    }
    if (x === 'dark' || (x === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div>
      <button className="border border-sky-500 px-1" onClick={() => setShow(!show)}>{theme}</button>
      <div className={clsx(
        "absolute flex flex-col items-start",
        {"hidden": !show, "block": show}
      )}>
        <button onClick={() => handleClick('light')}>亮色</button>
        <button onClick={() => handleClick('dark')}>暗色</button>
        <button onClick={() => handleClick('system')}>跟随系统</button>
      </div>
    </div>
  )
}