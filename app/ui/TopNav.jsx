'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import logo from '@/public/logo.png';
import SwitchTheme from './SwitchTheme';
import SearchBox from './SearchBox';


export default function TopNav() {
  
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const aniMenu = [
    { title: '排行榜', link: '/subject/rank' },
    { title: '每日放送', link: '/subject/calendar' },
    { title: '番剧索引', link: '#' },
  ];
  const about = [
    { title: '项目地址', link: 'https://github.com/nuttycc/next-bangumi' },
  ];

  return (
    <>
      {/* 移动端 */}
      <nav className="fixed top-0 z-50 h-12 w-[100vw] border-b bg-white px-2 py-2 dark:bg-black md:hidden">
        <div className="flex">
          <a href="/">
            <Image src={logo} alt="logo" priority />
          </a>

          <span className="grow"></span>

          {/* 搜索框 */}
          <div className="flex items-center justify-center px-1">
            <SearchBox />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="#cccccc"
                d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3l-1.4 1.4ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z"
              />
            </svg>
          </div>

          {/* 三杠按钮 */}
          <button
            onClick={() => setShow(!show)}
            className="relative flex w-10 flex-col items-center justify-center "
          >
            <div
              className={clsx(
                'h-[2px] w-1/2 bg-slate-600 transition dark:bg-gray-300',
                { 'absolute rotate-[405deg]': show },
              )}
            ></div>
            <div
              className={clsx(
                'my-1 h-[2px] w-1/2 bg-slate-600 transition dark:bg-gray-300',
                { hidden: show },
              )}
            ></div>
            <div
              className={clsx(
                'h-[2px] w-1/2 bg-slate-600 transition dark:bg-gray-300',
                { 'absolute -rotate-[405deg]': show },
              )}
            ></div>
          </button>
        </div>
      </nav>

      {/* 菜单项目 */}
      <div
        className={clsx(
          'fixed top-12 z-50 flex w-screen flex-col items-center gap-1 bg-gray-100 py-2 pb-4  dark:bg-gray-700',
          {
            hidden: !show,
          },
        )}
        onClick={(e) => {
          if (e.target.classList.contains('h2-box')) {
            setShow(false);
          }
        }}
      >
        <DPMenu h1={'动画'} h2s={aniMenu} open={show} />
        <DPMenu h1={'关于'} h2s={about} open={show} />
        <a
          href="https://github.com/nuttycc/next-bangumi"
          target="_blank"
          className="flex w-[8rem] items-center justify-between border"
          onClick={() => setShow(false)}
        >
          <span className="px-1">github</span>
          <span className="mr-[1px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.02em"
              height="1em"
              viewBox="0 0 1024 1007"
            >
              <path
                fill="currentColor"
                d="M639 1007q0-1 .5-3.5t.5-4.5q0-85-19.5-171T566 701q130-11 198-76.5T832 455q0-91-64-140v-91q0-11-11-21.5T736 192q-12 0-119 70q-47-6-105-6q-57 0-105 6q-107-70-119-70q-10 0-21 11t-11 21q0 9-2 44t-3 51q-59 48-59 136q0 104 68 169.5T458 701q-5 7-14 20q-43 47-124 47q-16 0-32-13.5t-31.5-32T224 685t-42-32t-54-13q0 8 9.5 20t26.5 33t28 43q26 50 54 73t74 23q48 0 87-14q-23 88-23 181v4l1 4q-168-43-276.5-180.5T0 512q0-105 40.5-199.5t109-163T313 40.5T512 0t199 40.5t163.5 109t109 163T1024 512q0 177-108.5 314.5T639 1007z"
              />
            </svg>
          </span>
        </a>
        <SwitchTheme />
      </div>

      {/* 桌面端 */}
      <nav className="fixed top-0 z-50 hidden h-10 w-screen items-center gap-2 bg-white py-2 dark:bg-black md:flex md:px-10 xl:px-40">
        <a href="/" className="mr-4 block">
          <Image src={logo} alt="logo" />
        </a>

        <ul className="flex gap-4 text-sm dark:text-gray-300">
          <li>
            <Link
              href="/subject/rank"
              className={clsx('hover:text-rose-400', {
                'text-rose-400': pathname === '/subject/rank',
              })}
            >
              排行榜
            </Link>
          </li>
          <li>
            <Link
              href="/subject/calendar"
              className={clsx('hover:text-rose-400', {
                'text-rose-400': pathname === '/subject/calendar',
              })}
            >
              每日放送
            </Link>
          </li>
        </ul>

        <span className="grow"></span>
        <div className="mr-20">
          <SearchBox />
        </div>

        <SwitchTheme />
        
        <a href="https://github.com/nuttycc/next-bangumi" title='github' className="mx-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2rem"
            height="1.2rem"
            viewBox="0 0 1024 1007"
          >
            <path
              fill="currentColor"
              d="M639 1007q0-1 .5-3.5t.5-4.5q0-85-19.5-171T566 701q130-11 198-76.5T832 455q0-91-64-140v-91q0-11-11-21.5T736 192q-12 0-119 70q-47-6-105-6q-57 0-105 6q-107-70-119-70q-10 0-21 11t-11 21q0 9-2 44t-3 51q-59 48-59 136q0 104 68 169.5T458 701q-5 7-14 20q-43 47-124 47q-16 0-32-13.5t-31.5-32T224 685t-42-32t-54-13q0 8 9.5 20t26.5 33t28 43q26 50 54 73t74 23q48 0 87-14q-23 88-23 181v4l1 4q-168-43-276.5-180.5T0 512q0-105 40.5-199.5t109-163T313 40.5T512 0t199 40.5t163.5 109t109 163T1024 512q0 177-108.5 314.5T639 1007z"
            />
          </svg>
        </a>

        {/* 
        <a href="#" className="w-9 hover:contrast-50">
          <Image
            src={avatar}
            alt="user avatar"
            className="rounded-full  border"
          />
        </a> */}
      </nav>
    </>
  );
}

// 移动端，
export function DPMenu({ h1, h2s, open }) {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) {
      setShow(false)
    }
  }, [open])
  const h2list = h2s.map((h2) => {
    return (
      <Link
        key={h2.title}
        href={h2.link}
        className={clsx('h2-box leading-6 hover:text-[#E5808E]', {
          '!text-rose-400': pathname === h2.link,
        })}
      >
        {h2.title}
      </Link>
    );
  });

  return (
    <div className="">
      {/* 标题 */}
      <button
        className="flex w-[8rem] px-1 items-center justify-between border"
        onClick={() => setShow(!show)}
      >
        <span className="">{h1}</span>
        <svg
          className="h-[14px] w-[14px] fill-current "
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
        >
          <path d="M12,16c-0.3,0-0.5-0.1-0.7-0.3l-6-6c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.3,5.3l5.3-5.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-6,6C12.5,15.9,12.3,16,12,16z"></path>
        </svg>
      </button>

      {/* 菜单项 */}
      <button
        className={clsx('flex flex-col px-2 py-2 ', {
          hidden: !show,
          block: show,
        })}
      >
        {h2list}
      </button>
    </div>
  );
}
