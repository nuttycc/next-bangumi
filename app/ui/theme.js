'use client'

import { useState } from "react"
import { useEffect } from "react"
import clsx from "clsx"

export default function ChangeTheme() {
  const [theme, setTheme] = useState('system')
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!theme || theme === 'system') {
      localStorage.removeItem('theme')
    } else {
      localStorage.setItem('theme', theme)
    }

    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      
    }
  }, [theme])

  useEffect(() => {

  })

  return (
    <div>
      <button className="border border-sky-500 px-1" onClick={() => setShow(!show)}>{theme}</button>
      <div className={clsx(
        "absolute flex flex-col items-start",
        {"hidden": !show, "block": show}
      )}>
        <button onClick={() => setTheme('light')}>亮色</button>
        <button onClick={() => setTheme('dark')}>暗色</button>
        <button onClick={() => setTheme('system')}>跟随系统</button>
      </div>
    </div>
  )
}