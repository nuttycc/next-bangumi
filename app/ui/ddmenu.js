"use client";

import clsx from "clsx";
import { useRef, useState } from "react";

// test
const test_h1 = { title: "一级标题", link: "#" };
const test_h2s = [
  {
    title: "二级标题",
    link: "https://tailwindcss.com/docs/customizing-colors",
  },
  { title: "二级标题", link: "#" },
  { title: "二级标题", link: "#" },
];

// 下拉式菜单：菜单项悬浮，不破坏正常文档流
export default function DDMenu({ data }) {
  const [show, setShow] = useState(false);
  const { h1, h2s } = data;

  const h2list = h2s.map((h2) => {
    return (
      <a key={h2.title} href={h2.link} className="hover:text-[#E5808E]">
        {h2.title}
      </a>
    );
  });

  return (
    <div
      className="text-sm w-max px-2 "
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* 标题 */}
      <span
        className={clsx(
          "hover:text-[#28BAA6] flex items-center cursor-pointer",
          { "text-[#28BAA6]": show },
        )}
      >
        {h1.title}
        <svg
          className="w-[14px] h-[14px] fill-current "
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
        >
          <path d="M12,16c-0.3,0-0.5-0.1-0.7-0.3l-6-6c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.3,5.3l5.3-5.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-6,6C12.5,15.9,12.3,16,12,16z"></path>
        </svg>
      </span>
      {/* 菜单项 */}
      <div
        className={clsx(
          "absolute bg-gray-200 leading-6 rounded-sm text-[0.95em] flex flex-col w-max p-1 pr-10 py-2 border",
          { hidden: !show, block: show },
        )}
      >
        {h2list}
      </div>
    </div>
  );
}

// 下推式：破坏流
export function DPMenu({ data }) {
  const [show, setShow] = useState(false);
  const { h1, h2s } = data;

  const h2list = h2s.map((h2) => {
    return (
      <a key={h2.title} href={h2.link} className="hover:text-[#E5808E]">
        {h2.title}
      </a>
    );
  });

  return (
    <div className="w-full px-2 ">
      {/* 标题 */}
      <div
        className={clsx("flex items-center ", {
          "font-bold": show,
          "text-black": !show,
        })}
        onClick={() => setShow(!show)}
      >
        <span>{h1.title}</span>
        <svg
          className="w-[14px] h-[14px] fill-current "
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
        >
          <path d="M12,16c-0.3,0-0.5-0.1-0.7-0.3l-6-6c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.3,5.3l5.3-5.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-6,6C12.5,15.9,12.3,16,12,16z"></path>
        </svg>
      </div>

      {/* 菜单项 */}
      <div
        className={clsx(
          "bg-gray-200 rounded-sm flex flex-col w-max p-1 pr-10 py-2 ",
          { hidden: !show, block: show },
        )}
      >
        {h2list}
      </div>
    </div>
  );
}
