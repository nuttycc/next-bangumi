"use client";

import Image from "next/image";
import logo from "@/public/logo.png";
import avatar from "@/public/avatar.jpeg";
import DDMenu, { DPMenu } from "./ddmenu";
import clsx from "clsx";
import { useState } from "react";

export default function TopNav() {
  const [show, setShow] = useState(false);
  let a = null;
  const aniMenu = {
    h1: { title: "动画", link: "#" },
    h2s: [
      { title: "排行榜", link: "#" },
      { title: "每日放送", link: "/calendar" },
      { title: "番剧索引", link: "#" },
      { title: "排行榜", link: "#" },
    ],
  };

  function handleClick(e) {
    if (show) {
      setShow(false);
    }
  }

  return (
    <>
      {/* 移动端 */}
      <div className="md:hidden">
        <div className="top flex border w-full">
          <div
            className="mask absolute opacity-0 w-screen h-screen z-[-1]"
            onClick={(e) => handleClick(e)}
          ></div>
          <Image src={logo} alt="logo" width={70} height={10} />
          <span className="grow"></span>
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
          <button
            onClick={() => setShow(!show)}
            className="w-10 border flex flex-col items-center justify-center relative"
          >
            <div className={clsx(
              "w-1/2 h-[2px] bg-black transition",
              {"absolute rotate-45": show}
            )}></div>
            <div className={clsx(
              "w-1/2 h-[2px] bg-black my-1 transition",
              { "hidden": show}
            )}></div>
            <div className={clsx(
              "w-1/2 h-[2px] bg-black transition",
              {"absolute -rotate-45": show}
            )}></div>
          </button>
        </div>
        <div className={clsx("pl-2 pt-4 pb-2 bg-gray-200", { hidden: !show })}>
          <DPMenu data={aniMenu} />
          <DPMenu data={aniMenu} />
        </div>
      </div>

      {/* 电脑端 */}
      <div className="nav-box hidden md:flex items-center border">
        <a className="logo" href="/">
          {/* logo */}
          <Image
            // src="/logo.png"
            src={logo}
            alt="logo"
            // width={250}
            // height={200}
          />
        </a>

        <div className="menu grow ">
          {/* 菜单栏: 动画(排行榜， 每日放送) */}
          <DDMenu data={aniMenu} />
        </div>

        <input
          type="search"
          placeholder="search"
          className="border text-sm mr-10 py-1 px-2 rounded-sm"
        />
        <a
          href="#"
          className="user border rounded-full w-9 hover:outline outline-2 outline-red-400"
        >
          {/* 用户头像 */}
          <Image src={avatar} alt="user avatar" />
        </a>
      </div>
    </>
  );
}
