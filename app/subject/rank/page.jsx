import { searchSubjectsBy } from '@/app/lib/subject';
import Filter from '@/app/ui/subject/filter';
import Image from 'next/image';
import clsx from 'clsx';
import Pagination from '@/app/ui/subject/pagination';


export default async function Rank({ searchParams }) {
  let pageValue = searchParams.page || 1;
  const air_date = [`>=${searchParams.from}-01`, `<${searchParams.to}-30`];
  const rank = Math.floor(Number(pageValue) / 101) * 1000 + 1;
  const filter = {
    type: [2],
    tag: [],
    air_date: air_date,
    rating: [],
    rank: [`>=${rank}`],
    nsfw: false,
  };
  const offset = 10 * (pageValue - 1);
  const r = await searchSubjectsBy(10, offset, { filter });
  const lastPage = Math.floor(r.total / 10);

  const RankList = r.data.map((x) => {
    const tagsList = x.tags
      .sort((b, a) => {
        a.count - b.count;
      })
      .slice(0, 4)
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
        <div className="photo-frame relative m-1 mr-2 h-[110px] w-[80px] shrink-0 md:w-[80px]">
          <Image
            src={x.image}
            alt=""
            fill
            sizes="80px"
            className="object-contain p-1"
          />
        </div>

        {/* 信息 */}
        <div className="">
          <div className="mb-1">
            <em className="mr-2 bg-red-600 px-1 text-[0.66rem] text-white  ">
              <span className="mr-1">总排名</span>
              <em className="text-[0.7rem] font-semibold">{x.rank}</em>
            </em>
            <a
              href={`/subject/${x.id}`}
              className="text-[0.88rem] text-blue-500 font-semibold hover:border-b hover:border-b-indigo-700"
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
                  style={{ width: 50 * x.score * 0.1 + 'px' }}
                  className="h-[10px] bg-transparent bg-[url('/rate_star_2x.png')] bg-[length:10px_19.5px] bg-[0px_0px] bg-repeat-x"
                ></div>
              </div>
              <small className="mx-1">{x.score}</small>
            </div>
            <div className="mt-1 flex flex-wrap gap-1 text-[0.7rem]">
              {tagsList}
            </div>
          </div>
        </div>
      </div>
    );
  });

  const PageList = Array(10)
    .fill(0)
    .map((x, i) => {
      const p = i + 1 + Math.floor(pageValue / 10) * 10;
      return (
        <a
          href={`./rank?&page=${p}`}
          key={i}
          className={clsx(
            'my-2 inline-block border px-1 text-center hover:bg-rose-400',
            {
              'bg-rose-500': p === Number(pageValue),
            },
          )}
        >
          {p}
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

      <div className="">{RankList}</div>

      {/* 翻页 */}
      <div className="flex flex-wrap items-center gap-1">
        <a
          href={`./rank?&page=${Number(pageValue) - 1}`}
          className={clsx('border px-1 text-center hover:bg-rose-400', {})}
        >
          &lt;
        </a>
        <a
          href={`./rank?&page=1`}
          className={clsx('border px-2 text-center hover:bg-rose-400', {
            hidden: pageValue < 10,
          })}
        >
          1
        </a>
        <a
          href={`./rank?&page=${Math.floor(Number(pageValue) / 2)}`}
          className={clsx('w-6 border text-center hover:bg-rose-400', {
            hidden: pageValue < 10,
          })}
        >
          ...
        </a>
        {PageList}
        <a
          href={`./rank?&page=${Math.floor((Number(pageValue) + 336) / 2)}`}
          className={clsx('w-6 border text-center hover:bg-rose-400', {})}
        >
          ...
        </a>
        <a
          href={`./rank?&page=${lastPage}`}
          className={clsx('border text-center hover:bg-rose-400', {
            'bg-rose-500': Number(pageValue) === 336,
          })}
        >
          336
        </a>
        <a
          href={`./rank?&page=${Number(pageValue) + 1}`}
          className={clsx('border px-1 text-center hover:bg-rose-400', {})}
        >
          &gt;
        </a>
        <Pagination />
      </div>
    </div>
  );
}
