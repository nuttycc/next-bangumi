'use client';

import { useState } from 'react';
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
                'h-[2px] w-1/2 bg-black transition dark:bg-gray-300',
                { 'absolute rotate-[405deg]': show },
              )}
            ></div>
            <div
              className={clsx(
                'my-1 h-[2px] w-1/2 bg-black transition dark:bg-gray-300',
                { hidden: show },
              )}
            ></div>
            <div
              className={clsx(
                'h-[2px] w-1/2 bg-black transition dark:bg-gray-300',
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
      >
        <DPMenu h1={'动画'} h2s={aniMenu} />
        <DPMenu h1={'关于'} h2s={about} />
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
export function DPMenu({ h1, h2s }) {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  const h2list = h2s.map((h2) => {
    return (
      <Link
        key={h2.title}
        href={h2.link}
        className={clsx('leading-6 hover:text-[#E5808E]', {
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
        className="flex w-[8rem] items-center justify-between border"
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
      <div
        className={clsx('flex flex-col px-2 py-2 ', {
          hidden: !show,
          block: show,
        })}
      >
        {h2list}
      </div>
    </div>
  );
}