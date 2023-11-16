
import clsx from "clsx";
import styles from "./subject.module.css";
import AniCard from "./card";


export default function AniCalenderOnMd({ data }) {
  const date = new Date();
  const today = date.getDay() === 0 ? 6 : date.getDay() - 1


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

    // 日番剧
    return (
      <div key={obj.weekday.id} className="flex mb-1">
        <div
          className={clsx(
            styles["day-title"],
            today === obj.weekday.id - 1 && styles["isToday"],
          )}
        >
          {obj.weekday.cn}
        </div>
        <div className={styles.dayCards}>{dayCards}</div>
      </div>
    );
  });

  // 移动端顶部周菜单
  const week = ["一", "二", "三", "四", "五", "六", "日"];


  return (
    <>
      {/* 桌面端 */}
      <div className="hidden md:block px-16 py-8">
        <div>
          每日放送
          <span className="l-2 text-sm text-red-700">
            {date.toLocaleDateString()} 星期{week[date.getDay()]}
          </span>
        </div>
        {calendar}
      </div>
    </>
  );
}
