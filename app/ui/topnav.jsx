"use client";

import Image from "next/image";
import logo from "@/public/logo.png";
import avatar from "@/public/avatar.jpeg";
import DDMenu, { DPMenu } from "./ddmenu";
import clsx from "clsx";
import { useEffect, useState } from "react";
import ChangeTheme from "./theme";

export default function TopNav() {
  const [show, setShow] = useState(false);

  const aniMenu = [
    { title: "排行榜", link: "#" },
    { title: "每日放送", link: "/subject/calendar" },
    { title: "番剧索引", link: "#" },
  ];

  return (
    <>
      {/* 移动端 */}
      <div className="md:hidden relative">
        <div className="top flex border ">
          <div
            className="mask absolute opacity-0 w-screen h-screen z-[-1]"
            onClick={(e) => setShow(false)}
          ></div>

          {/* Logo */}
          <a href="/">
            <Image src={logo} alt="logo" width={70} height={10} />
          </a>

          {/* 占位 */}
          <span className="grow"></span>

          {/* 搜索框 */}
          <span className="border relative">
            <input
              type="search"
              placeholder="搜索"
              size={6}
              className="border rounded-md border-black"
            />
            <svg
              className="absolute right-0 bottom-0"
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
          </span>

          {/* 三杠按钮 */}
          <button
            onClick={() => setShow(!show)}
            className="w-10 border flex flex-col items-center justify-center relative"
          >
            <div
              className={clsx(
                "w-1/2 h-[2px] bg-black transition dark:bg-gray-300",
                { "absolute rotate-45": show },
              )}
            ></div>
            <div
              className={clsx(
                "w-1/2 h-[2px] bg-black my-1 transition dark:bg-gray-300",
                { hidden: show },
              )}
            ></div>
            <div
              className={clsx(
                "w-1/2 h-[2px] bg-black transition dark:bg-gray-300",
                { "absolute -rotate-45": show },
              )}
            ></div>
          </button>
        </div>

        {/* 菜单项目 */}
        <div
          className={clsx("pt-4 pb-2 bg-gray-100 dark:bg-gray-700", {
            hidden: !show,
          })}
        >
          <DPMenu h1={"动画"} h2s={aniMenu} />
          <DPMenu h1={"一级标题"} h2s={aniMenu} />
          {/* <ChangeTheme /> */}
        </div>
      </div>

      {/* 桌面端 */}
      <nav className="hidden md:flex items-center border">
        <a href="/">
          <Image src={logo} alt="logo" />
        </a>

        {/* 菜单栏: 动画(排行榜， 每日放送) */}
        <div className="menu flex grow ">
          <DDMenu h1={"动画"} h2s={aniMenu} />
          <ChangeTheme />
        </div>

        <input
          type="search"
          placeholder="search"
          className="border text-sm mr-10 py-1 px-2 rounded-sm"
        />

        <a
          href="#"
          className="border rounded-full w-9 hover:outline outline-2 outline-red-400"
        >
          <Image src={avatar} alt="user avatar" />
        </a>
      </nav>
    </>
  );
}
