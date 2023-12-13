'use client';

import { useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import clsx from 'clsx';


export default function Filter() {

  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const curYearMonth = `${year}-${month}`;

  const params = useSearchParams();
  const from = params.get('from');
  const to = params.get('to');

  const YearList = Array(5)
    .fill(0)
    .map((x, i) => {
      let toYear = date.getFullYear() - i;
      return (
        <a
          href={`./rank?from=${toYear}-01&to=${toYear}-12`}
          key={i}
          className={clsx('bgmtv-btn', {
            '!border-rose-400 !text-rose-400':
              params.get('from') === `${toYear}-01` &&
              params.get('to') === `${toYear}-12`,
          })}
        >
          {toYear}
        </a>
      );
    });

  function handleChange(e) {
    const url = new URL(window.location);
    const params = new URLSearchParams(url.search);
    if (e.target.id === 'from') {
      params.set('from', e.target.value);
    } else {
      params.set('to', e.target.value);
    }
    const newUrl = `${window.location.origin}${
      window.location.pathname
    }?${params.toString()}`;
    location.assign(newUrl);
  }

  const debounced = useDebouncedCallback((e) => handleAnyVal(e), 500);

  function handleAnyVal(e) {
    if (e.target.value <= 1000 || e.target.value > 9999) {
      return;
    }
    const url = new URL(window.location);
    const params = new URLSearchParams(url.search);
    params.set('from', e.target.value + '-01');
    params.set('to', e.target.value + '-12');
    const newUrl = `${window.location.origin}${
      window.location.pathname
    }?${params.toString()}`;
    location.assign(newUrl);
  }

  return (
    <div className="text-sm antialiased">
      {/* <div className="my-1 flex">
        <span>类型：</span>
        <ul className="flex gap-2 ">
          <a href="#" className="bgmtv-btn">
            <li>全部</li>
          </a>
          <a href="#" className="bgmtv-btn">
            <li>TV</li>
          </a>
          <a href="" className="bgmtv-btn">
            <li>WEB</li>
          </a>
          <a href="" className="bgmtv-btn">
            <li>OVA</li>
          </a>
          <a href="" className="bgmtv-btn">
            <li>剧场版</li>
          </a>
          <a href="" className="bgmtv-btn">
            <li>其它</li>
          </a>
        </ul>
      </div> */}
      <div className="">
        {/* 快捷查询 */}
        <div className="mb-1 flex overflow-hidden">
          <span>时间：</span>
          <div className="flex gap-1">{YearList}</div>
          <div className="ml-2">
            <input
              type="number"
              id="any"
              min={1000}
              max={9999}
              list="years"
              className="w-[3em] appearance-none border border-gray-500 px-1 pl-1 outline-none focus:border-rose-400 dark:bg-black dark:caret-pink-600"
              placeholder=""
              onChange={(e) => debounced(e)}
            />
            <label
              htmlFor="any"
              className="ml-1 text-gray-600 dark:text-gray-400"
            >
              年
            </label>
          </div>
        </div>

        {/* 高级搜索 */}
        <div onChange={(e) => handleChange(e)} className="py-1">
          <label htmlFor="from">指定区间：</label>
          <input
            type="month"
            id="from"
            defaultValue={from || '1999-01'}
            min={'1990-01'}
            max={curYearMonth}
            className="dark:bg-gray-400 dark:text-blue-800"
          />
          <label htmlFor="to">--</label>
          <input
            type="month"
            id="to"
            defaultValue={to || curYearMonth}
            min={'1990-01'}
            max={curYearMonth}
            className="dark:bg-gray-400 dark:text-blue-800"
          />
        </div>
      </div>
    </div>
  );
}
