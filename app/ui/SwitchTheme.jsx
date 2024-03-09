'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function ChangeTheme() {
  const [show, setShow] = useState(false)
  const [theme, setTheme] = useState('system')

  useEffect(() => {
    try {
      console.log('useEffect Switch theme.')
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark')
        document.documentElement.style.colorScheme = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        document.documentElement.style.colorScheme = 'light'
      }
    } catch (error) {
      console.error('Error switching theme:', error)
    }
    const localTheme = localStorage.getItem('theme') || 'system'
    setTheme(localTheme)
  }, [])

  useEffect(() => {
    const handleClick = function (e) {
      if (
        e.target.classList.contains('switch-theme') ||
        e.target.parentElement.classList.contains('switch-theme')
      ) {
        return
      }
      setShow(false)
    }

    if (show) {
      document.documentElement.addEventListener('click', handleClick)
    }

    return () => {
      document.documentElement.removeEventListener('click', handleClick)
    }
  }, [show])

  function handleSwitch(e) {
    const x = e.target.id

    if (localStorage.getItem('theme') === x) {
      return
    }

    setTheme(x)

    if (x === 'system') {
      localStorage.removeItem('theme')
    } else {
      localStorage.setItem('theme', x)
    }
    if (
      x === 'dark' ||
      (x === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
    }
  }

  return (
    <>
      <div className="relative top-[4px]">
        <button
          type="button"
          title="切换主题"
          className="switch-theme flex w-[8rem] justify-between border md:inline md:w-auto md:border-0"
          onClick={() => setShow(!show)}
        >
          <span className="px-1 md:hidden">切换主题</span>
          <span className={clsx({ hidden: theme !== 'light' })}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                className="fill-sky-400/20 stroke-sky-500"
              ></path>
              <path
                d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                className="stroke-sky-500"
              ></path>
            </svg>
          </span>
          <span className={clsx({ hidden: theme !== 'dark' })}>
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                className="fill-sky-400/20"
              ></path>
              <path
                d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                className="fill-sky-500"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                className="fill-sky-500"
              ></path>
            </svg>
          </span>

          <span className={clsx({ hidden: theme !== 'system' })}>
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path
                d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
                strokeWidth="2"
                strokeLinejoin="round"
                className={clsx({
                  'fill-slate-400 dark:fill-slate-500': theme !== 'system',
                  'fill-sky-400/20 stroke-sky-500': theme === 'system',
                })}
              ></path>
              <path
                d="M14 15c0 3 2 5 2 5H8s2-2 2-5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={clsx({
                  'fill-slate-400 dark:fill-slate-500': theme !== 'system',
                  'stroke-sky-500': theme === 'system',
                })}
              ></path>
            </svg>
          </span>
        </button>
        <ul
          className={clsx(
            '-right-2 w-[8rem] py-1 text-sm font-semibold md:absolute md:z-50 md:w-36 md:rounded-lg md:bg-white md:text-slate-700  md:dark:bg-slate-800 md:dark:text-slate-300 ',
            { hidden: !show, block: show }
          )}
          onClick={(e) => handleSwitch(e)}
        >
          <li
            className={clsx(
              'flex cursor-pointer items-center justify-between px-2 py-1',
              { 'text-sky-500': theme === 'light' }
            )}
            id="light"
          >
            Light
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                className={clsx({
                  'stroke-slate-400 dark:stroke-slate-500': theme !== 'light',
                  'stroke-sky-500': theme === 'light',
                })}
              ></path>
              <path
                d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                className={clsx({
                  'stroke-slate-400 dark:stroke-slate-500': theme !== 'light',
                  'stroke-sky-500': theme === 'light',
                })}
              ></path>
            </svg>
          </li>
          <li
            className={clsx(
              'flex cursor-pointer items-center justify-between px-2 py-1',
              { 'text-sky-500': theme === 'dark' }
            )}
            id="dark"
          >
            Dark
            <svg viewBox="0 0 24 24" fill="none" className=" h-6 w-6">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                className="fill-transparent"
              ></path>
              <path
                d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                className={clsx({
                  'fill-slate-400 dark:fill-slate-500': theme !== 'dark',
                  'fill-sky-500': theme === 'dark',
                })}
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                className={clsx({
                  'fill-slate-400 dark:fill-slate-500': theme !== 'dark',
                  'fill-sky-500': theme === 'dark',
                })}
              ></path>
            </svg>
          </li>
          <li
            className={clsx(
              'flex cursor-pointer items-center justify-between px-2 py-1',
              { 'text-sky-500': theme === 'system' }
            )}
            id="system"
          >
            System
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path
                d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
                strokeWidth="2"
                strokeLinejoin="round"
                className={clsx({
                  'fill-slate-400 dark:fill-slate-500': theme !== 'system',
                  'fill-sky-400/20 stroke-sky-500': theme === 'system',
                })}
              ></path>
              <path
                d="M14 15c0 3 2 5 2 5H8s2-2 2-5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={clsx({
                  'fill-slate-400 dark:fill-slate-500': theme !== 'system',
                  'stroke-sky-500': theme === 'system',
                })}
              ></path>
            </svg>
          </li>
        </ul>
      </div>
    </>
  )
}
