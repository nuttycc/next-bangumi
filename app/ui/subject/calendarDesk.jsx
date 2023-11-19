import clsx from "clsx";
import styles from "./subject.module.css";
import AniCard from "./card";

export default function AniCalenderOnDesk({ data }) {
  const date = new Date();
  const today = date.getDay() === 0 ? 6 : date.getDay() - 1;

  const calendar = data.map((obj) => {
    const CardList = obj.items.map((item) => {
      return (
        <div key={item.id}>
          <AniCard
            title={item["name_cn"] || item["name"]}
            src={item.images.common}
            id={item.id}
          />
        </div>
      );
    });

    const weekdayId = obj.weekday.id
    // 每日番剧
    return (
      <div
        key={obj.weekday.id}
        className="mb-2 flex border border-[#212121]	shadow-[2px_1px_4px_2px_rgb(94,102,103,0.6)]"
      >
        <div
          style={{ writingMode: "vertical-rl" }}
          className={clsx(
            "pr-1 text-center text-[0.95rem] dark:border-gray-500",
            {
              "bg-[#2699FB] dark:bg-[#023e8a]": weekdayId === 1,
              "bg-[#ECFFCB] dark:bg-[#23241F]": weekdayId === 2,
              "bg-[#BCF402] dark:bg-[#7209b7]": weekdayId === 3,
              "bg-[#FF6A53] dark:bg-[#294D45]": weekdayId === 4,
              "bg-[#BF7C63]": weekdayId === 5,
              "bg-[#b5838d]": weekdayId === 6,
              "bg-[#fb8500]": weekdayId === 7,
              " after:text-[#d90429] after:content-['_★'] ":
                today === obj.weekday.id - 1,
              // "bg-[#ec0868] dark:bg-slate-700": today !== obj.weekday.id - 1,
            },
          )}
        >
          {obj.weekday.cn}
        </div>
        <div
          className={`${styles.CardList} flex w-[80vw] flex-col md:flex-row md:overflow-x-scroll`}
        >
          {CardList}
        </div>
      </div>
    );
  });
  const week = ["一", "二", "三", "四", "五", "六", "日"];

  return (
    <>
      {/* 桌面端 */}
      <div className="hidden md:block">
        <div>
          <span className="mr-2 text-[1.2rem]">每日放送</span>
          <span className="text-[0.8rem] text-blue-500">
            {date.toLocaleDateString()}
            星期
            <span className="">{week[date.getDay() - 1]}</span>
          </span>
        </div>
        <hr className="mb-2"></hr>
        <div>{calendar}</div>
      </div>
    </>
  );
}