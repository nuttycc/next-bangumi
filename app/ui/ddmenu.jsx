"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

//桌面端，下拉式，菜单项悬浮
export default function DDMenu({ h1, h2s }) {
  const [show, setShow] = useState(false);

  const h2list = h2s.map((h2) => {
    return (
      <a key={h2.title} href={h2.link} className=" hover:text-[#E5808E]">
        {h2.title}
      </a>
    );
  });

  return (
    <div
      className="w-max px-2 "
      // onClick={() => setShow(!show)}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* 标题 */}
      <span
        className={clsx(
          "flex cursor-pointer items-center hover:text-[#28BAA6]",
          { "text-[#28BAA6]": show },
        )}
      >
        {h1}
        <svg
          className="h-[14px] w-[14px] fill-current "
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
          "absolute z-10 flex w-max flex-col rounded-sm border bg-gray-200 p-1 py-2 pr-10 text-[0.95em]  leading-6 dark:bg-gray-600",
          { hidden: !show, block: show },
        )}
      >
        {h2list}
      </div>
    </div>
  );
}

// 移动端，
export function DPMenu({ h1, h2s }) {
  const [show, setShow] = useState(false);

  const h2list = h2s.map((h2) => {
    return (
      <a
        key={h2.title}
        href={h2.link}
        className="leading-6 hover:text-[#E5808E]"
      >
        {h2.title}
      </a>
    );
  });

  return (
    <div>
      {/* 标题 */}
      <button
        className={clsx("flex items-center justify-between w-[8rem] border", {
          "": show,
          "": !show,
        })}
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
        className={clsx(
          "flex flex-col py-2 px-2 ",
          { hidden: !show, block: show },
        )}
      >
        {h2list}
      </div>
    </div>
  );
}
