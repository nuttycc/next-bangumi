import clsx from "clsx";
import styles from "./subject.module.css";
import AniCard from "./card";

export default function AniCalenderOnMd({ data }) {
  const date = new Date();
  const today = date.getDay() === 0 ? 6 : date.getDay() - 1;

  const calendar = data.map((obj) => {
    const dayCards = obj.items.map((item) => {
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

    // 每日番剧
    return (
      <div key={obj.weekday.id} className="mb-1 flex">
        <div
          className={clsx(
            "dark:bg-gray-600",
            styles["day-title"],
            today === obj.weekday.id - 1 && styles["isToday"],
            { "dark:bg-rose-600": today === obj.weekday.id - 1 },
          )}
        >
          {obj.weekday.cn}
        </div>
        <div className={styles.dayCards}>{dayCards}</div>
      </div>
    );
  });

  const week = ["一", "二", "三", "四", "五", "六", "日"];

  return (
    <>
      {/* 桌面端 */}
      <div className="hidden md:block">
        <div>
          <span className="mx-1">每日放送</span>
          <span className="text-[0.8rem] text-blue-500">
            {date.toLocaleDateString()} 星期{week[date.getDay()-1]}
          </span>
        </div>
        <hr className="mb-2"></hr>
        <div>{calendar}</div>
      </div>
    </>
  );
}
