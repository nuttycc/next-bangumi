'use client';
import { useEffect, useRef, useState } from 'react';

export default function Scroll() {
  const arrow = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  useEffect(() => {
    const container = arrow.current.parentElement;

    const handleScroll = () => {
      // 当滚动到最左边时隐藏左箭头
      setShowLeftArrow(container.scrollLeft > 0);

      // 当滚动到最右边时隐藏右箭头
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth,
      );
    };

    container.addEventListener('scroll', handleScroll);

    // 初始设置一次以检查箭头的显示状态
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div ref={arrow} className="">
      {showLeftArrow && (
        <button
          className="absolute left-0 top-1/2 h-16 w-6 -translate-y-1/2 rounded-lg border border-transparent bg-gray-800 text-white opacity-80"
          onClick={() => {
            const container = arrow.current.parentElement;
            container.scrollLeft -= 350; // 向左滚动一定距离，可以根据需要自定义
          }}
        >
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
            &laquo;
          </span>
        </button>
      )}

      {showRightArrow && (
        <button
          className="absolute right-0 top-1/2  h-16 w-6 -translate-y-1/2 rounded-lg border border-transparent bg-gray-800 text-white opacity-80"
          onClick={() => {
            const container = arrow.current.parentElement;
            container.scrollLeft += 350; // 向右滚动一定距离，可以根据需要自定义
          }}
        >
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            &raquo;
          </span>
        </button>
      )}
    </div>
  );
}
