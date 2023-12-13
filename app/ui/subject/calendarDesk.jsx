import clsx from 'clsx';
import Image from 'next/image';
import styles from './subject.module.css';
import DateComponent from './DateComponent';
import ScrollButton from '../ScrollButton';
import loadingPic from 'public/neutral-face-flatline.svg';


export default function AniCalenderOnDesk({ data }) {
  // const date = new Date();
  // const today = date.getDay() === 0 ? 6 : date.getDay() - 1;

  const calendar = data.map((obj) => {
    const CardList = obj.items.map((item) => {
      return (
        <div key={item.id}>
          <AniCard
            title={item['name_cn'] || item['name']}
            src={item.images.common}
            id={item.id}
          />
        </div>
      );
    });

    const weekdayId = obj.weekday.id;
    // 每日番剧
    return (
      <div
        key={obj.weekday.id}
        className="mb-2 flex w-max border border-[#212121]	shadow-[2px_1px_4px_2px_rgb(94,102,103,0.6)]"
      >
        <div
          style={{ writingMode: 'vertical-rl' }}
          className={clsx(
            'pr-1 text-center text-[0.95rem] dark:border-gray-500',
            {
              'bg-[#2699FB] dark:bg-[#023e8a]': weekdayId === 1,
              'bg-[#ECFFCB] dark:bg-[#23241F]': weekdayId === 2,
              'bg-[#BCF402] dark:bg-[#7209b7]': weekdayId === 3,
              'bg-[#FF6A53] dark:bg-[#294D45]': weekdayId === 4,
              'bg-[#BF7C63]': weekdayId === 5,
              'bg-[#b5838d]': weekdayId === 6,
              'bg-[#fb8500]': weekdayId === 7,
              // " after:text-[#d90429] after:content-['_★'] ":
              //   today === obj.weekday.id - 1,
            },
          )}
        >
          {obj.weekday.cn}
        </div>
        <div className="relative ">
          <div
            className={`${styles.CardList} flex w-[66vw] flex-col scroll-smooth md:flex-row md:overflow-x-scroll`}
          >
            {CardList}
            <ScrollButton />
          </div>
        </div>
      </div>
    );
  });
  const week = ['一', '二', '三', '四', '五', '六', '日'];

  return (
    <>
      {/* 桌面端 */}
      <div className="hidden md:block">
        <div className="mb-2 border-b ">
          <span className="mr-2 text-[1.2rem] ">每日放送</span>
          <DateComponent />
        </div>

        <div>{calendar}</div>
      </div>
    </>
  );
}

// 单张卡片
export function AniCard({ title, src, id }) {
  return (
    <>
      <a
        href={`/subject/${id}`}
        title={title}
        className="relative mb-[1px] w-[100px] rounded-sm border md:block"
      >
        <div className="relative block p-2 md:h-[150px] md:w-[100px]">
          <Image
            className="hidden border border-gray-400 md:block"
            src={src || loadingPic}
            alt={title}
            fill
            sizes="10vw"
          />
          <div className="absolute bottom-0 left-0 overflow-hidden text-ellipsis whitespace-nowrap bg-[#2d2e2f] px-1  pt-1 text-[0.65rem] text-gray-300  md:w-full ">
            {title}
          </div>
        </div>
      </a>
    </>
  );
}
