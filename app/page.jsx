import { getCalendar } from "./lib/subject";
import Image from "next/image";
import Scroll from "./ui/scroll";

const date = new Date()
const today = date.getDay() === 0 ? 7 : date.getDay() // 0 1 2 3...
export default async function Page() {
  const calendar = await getCalendar()
  const todayList = calendar[today - 1].items.map((x) => {
    return (
      <div key={x.id}>
        <div className="relative h-[150px] w-[30vw]">
          <Image
            src={x.images.common}
            alt={x.name}
            fill
            sizes="33vw"
            className="object-cover object-top border"
          />
        </div>
        <a href={`/subject/${x.id}`} className="block w-[30vw] truncate">{x.name_cn || x.name}</a>

        {/* <div>{x.collection.doing}</div> */}
        {/* <div>{x.rating.score}</div> */}
        {/* <div>{x.rating.total}</div> */}
        <div>{}</div>
        <div>{}</div>
        <div>{}</div>
      </div>
    );
  })

  return (
    <div>
      <p>Home Page</p>
      <div className="relative">
        今日放送
        <div
          className="flex h-max overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: "1rem", scrollbarColor: "#ea580c" }}
        >
          {todayList}
          <Scroll />
        </div>
        <div className="z-50"></div>
      </div>
      <div>随机番剧</div>
      <div>今日放送</div>
      <div>今日放送</div>
    </div>
  );
}
