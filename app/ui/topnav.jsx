'use client';

import Image from 'next/image';
import logo from '@/public/logo.png';
import avatar from '@/public/avatar.jpeg';
import DDMenu, { DPMenu } from './ddmenu';
import clsx from 'clsx';
import { useState } from 'react';
import ChangeTheme from './theme';
import Link from 'next/link';

export default function TopNav() {
  const [show, setShow] = useState(false);

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
      <nav className="fixed top-0 z-50 h-12 w-[100vw] border-b bg-white px-2 py-2  dark:bg-black md:hidden">
        <div className="flex">
          <a href="/">
            <Image src={logo} alt="logo" priority />
          </a>

          <span className="grow"></span>

          {/* 搜索框 */}
          <div className="flex items-center justify-center px-1">
            <input
              type="search"
              placeholder=""
              size={6}
              className="rounded-md border border-black"
            />
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
        <ChangeTheme />
      </div>

      {/* 桌面端 */}
      <nav className="fixed top-0 z-50 hidden h-10 w-screen items-center gap-2 bg-white py-2 dark:bg-black md:flex md:px-10 xl:px-40">
        <a href="/" className="mr-4 block">
          <Image src={logo} alt="logo" />
        </a>

        {/* <DDMenu h1={"动画"} h2s={aniMenu} /> */}
        <ul className="flex gap-4 text-sm dark:text-gray-300">
          <li>
            <Link href="/subject/rank" className="hover:text-rose-400">
              排行榜
            </Link>
          </li>
          <li>
            <Link href="/subject/calendar" className="hover:text-rose-400">
              每日放送
            </Link>
          </li>
        </ul>

        <span className="grow"></span>

        <ChangeTheme />

        {/* 搜索框 */}
        <input
          type="search"
          placeholder="search"
          className="rounded-sm border px-2 py-1 text-sm"
        />

        <a href="#" className="w-9 hover:contrast-50">
          <Image
            src={avatar}
            alt="user avatar"
            className="rounded-full  border"
          />
        </a>
      </nav>
    </>
  );
}
