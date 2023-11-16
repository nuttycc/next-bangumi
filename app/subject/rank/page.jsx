
import { searchSubjectsBy } from "@/app/lib/subject"
import Filter from "@/app/ui/subject/filter";
import Image from "next/image";


export default async function Rank({ searchParams }) {

  let pageValue = searchParams.page || 1;
  const air_date = [`>=${searchParams.from}-01`, `<${searchParams.to}-30`]
  
  const filter = {
    type: [2],
    tag: [],
    air_date: air_date,
    rating: [],
    rank:['>0'],
    nsfw: false,
  };

  const offset = 10 * (pageValue - 1)

  const r = await searchSubjectsBy(10, offset, { filter });
  // console.log("🚀🚀 ~ Rank ~ r: ", r)
  
  const RankList = r.data.map((x) => {
    return (
      <div key={x.id} className="flex">
        {/* 图片 */}
        <div className="relative w-[50px] h-[80px]">
          <Image src={x.image} alt="" fill sizes="50px" />
        </div>
        {/* 信息 */}
        <div>
          <div>名字：{x.name_cn || x.name}</div>
          <div>上映时间：{x.date}</div>
          <div>评分：{x.score}</div>
          <div>排名：{x.rank}</div>
          {/* <div>简介：{x.summary}</div> */}
        </div>
      </div>
    );
  });

  const PageList = Array(5)
    .fill(0)
    .map((x, i) => {
      return (
        <a href={`./rank?&page=${i}`} key={i}>
          {i}
        </a>
      );
    });
  
  const date = new Date();
  const fDate = date.toLocaleDateString().replace(/\//g, "-");

  const YearList = Array(5).fill(0).map((x, i) => {
    let toYear = date.getFullYear() - i;
    return (
      <a href={`./rank?year=${toYear}`} key={i} className="hover:bg-rose-400">
        {toYear}
      </a>
    );
  })



  return (
    <div>
      {/* 标题 */}
      <div>动画索引</div>

      <div className="">
        <div></div>
        {/* 条件 */}
        <Filter />
      </div>

      {/* 内容 */}
      <div className="border border-blue-500">{RankList}</div>

      {/* 翻页 */}
      <div className="flex gap-1 border border-purple-600">{PageList}</div>
    </div>
  );
}