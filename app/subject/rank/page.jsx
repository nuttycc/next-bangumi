import { searchSubjectsBy } from "@/app/lib/subject";
import Filter from "@/app/ui/subject/filter";
import Image from "next/image";

export default async function Rank({ searchParams }) {
  let pageValue = searchParams.page || 1;
  const air_date = [`>=${searchParams.from}-01`, `<${searchParams.to}-30`];

  const filter = {
    type: [2],
    tag: [],
    air_date: air_date,
    rating: [],
    rank: [">0"],
    nsfw: false,
  };

  const offset = 10 * (pageValue - 1);

  const r = await searchSubjectsBy(10, offset, { filter });

  const RankList = r.data.map((x) => {
    const tagsList = x.tags
      .sort((b, a) => {
        a.count - b.count;
      })
      .slice(0, 5)
      .map((x) => {
        return (
          <div key={x.name} className="bg-rose-200 px-1 dark:bg-[#023047]">
            {x.name}
          </div>
        );
      });

    return (
      <div key={x.id} className="flex">
        {/* 图片 */}
        <div className="relative m-1 mr-2 h-[110px] w-[80px] rounded-sm border shadow-[2px_2px_6px_0px_rgba(159,148,132,0.7)]  dark:border-gray-400">
          <Image src={x.image} alt="" fill sizes="80px" className="p-1" />
        </div>

        {/* 信息 */}
        <div>
          <div className="mb-1">
            <em className="mr-2 bg-red-600 px-1 text-[0.66rem] text-white  ">
              <span className="mr-1">总排名</span>
              <em className="text-[0.7rem] font-semibold">{x.rank}</em>
            </em>
            <a
              href={`/subject/${x.id}`}
              className="hover:border-b text-[0.88rem] font-semibold hover:border-b-indigo-700"
            >
              {x.name_cn || x.name}
            </a>
          </div>
          <hr></hr>

          <div className="text-[0.82rem]">
            <div className="">{x.date}</div>
            <div className="">
              <div className="inline-block h-[10px] w-[50px] bg-transparent bg-[url('/rate_star_2x.png')] bg-[length:10px_19.5px] bg-[0%_100%] bg-repeat-x">
                <div
                  style={{ width: 50 * x.score * 0.1 + "px" }}
                  className="h-[10px] bg-transparent bg-[url('/rate_star_2x.png')] bg-[length:10px_19.5px] bg-[0px_0px] bg-repeat-x"
                >
                </div>
              </div>
              <small className="mx-1">{x.score}</small>
            </div>
            <div className="text-[0.7rem] mt-1 flex gap-1">{tagsList}</div>
          </div>
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

  return (
    <div className="">
      {/* 标题 */}
      <div className="text-lg font-semibold antialiased">动画索引</div>
      <hr className="mb-2 opacity-30 grayscale"></hr>
      <div className="border-gray-400">
        <Filter />
      </div>
      <hr className="mb-2"></hr>

      <div className="border border-blue-500">{RankList}</div>

      {/* 翻页 */}
      <div className="flex gap-1 border border-purple-600">{PageList}</div>
    </div>
  );
}
