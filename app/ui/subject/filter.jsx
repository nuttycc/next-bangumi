'use client'

import { useSearchParams } from "next/navigation";
const date = new Date();
const today = date.toLocaleDateString().slice(0, -3).replace(/\//g, "-");

export default function Filter() {
  const params = useSearchParams()
  const from = params.get('from')
  const to = params.get('to')

  const YearList = Array(5).fill(0).map((x, i) => {
    let toYear = date.getFullYear() - i;
    return (
      <a href={`./rank?from=${toYear}-01&to=${toYear}-12`} key={i} className="hover:bg-rose-400">
        {toYear}
      </a>
    );
  })

  function handleChange(e) {
    const url = new URL(window.location)
    const params = new URLSearchParams(url.search)
    if(e.target.id === 'from') {
      params.set('from', e.target.value)
    } else {
      params.set('to', e.target.value)
    }
    const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    location.assign(newUrl)
  }

  return (
    <>
      <div className="flex">
        <span>类型: </span>
        <ul className="flex gap-2">
          <a href=""><li>全部</li></a>
          <a href=""><li>TV</li></a>
          <a href=""><li>WEB</li></a>
          <a href=""><li>OVA</li></a>
          <a href=""><li>剧场版</li></a>
          <a href=""><li>其它</li></a>
        </ul>
      </div>
      <div className="border border-orange-500" >
        
        {/* 快捷查询 */}
        <div className="flex gap-2">
          <span>时间：</span>
          {YearList}
          {/* <label htmlFor="any">输入</label> */}
          {/* <input type="number" id='any' min={1000} max={9999} list="years" className="border w-[5em] pl-1" onChange={(e) => {handleAny(e)}} ></input> */}
          {/* <datalist id="years">
            <option value={'2020'}></option>
            <option value={'2021'}></option>
            <option value={'2022'}></option>
            <option value={'2023'}></option>
          </datalist> */}
        </div>

        {/* 高级搜索 */}
        <div onChange={(e) => handleChange(e)}>
          <label htmlFor="from">高级搜索：</label>
          <input
            type="month"
            id="from"
            defaultValue={from || '1999-01'}
            min={"1990-01"}
            max={today}
          />
          <label htmlFor="to">--</label>
          <input
            type="month"
            id="to"
            defaultValue={to || today}
            min={"1990-01"}
            max={today}
          />
        </div>

      </div>
    </>
  );
}