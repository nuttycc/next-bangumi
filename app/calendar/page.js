
import { fetchCalendar } from "../lib/data";
import AniCalender from "../ui/anime/calendar";

export default async function Page() {
  const data = await fetchCalendar()
  return (
    <>
      <AniCalender data={data} />
    </>
  )
}

// export default function AniCalender() {
//   const date = new Date()

//   const [calendarCards, setCalendarCards] = useState([]);
//   const [today, setToday] = useState(date.getDay() === 0 ? 6 : date.getDay() - 1)

//   const myHeaders = new Headers({
//     Host: "api.bgm.tv",
//     Connection: "keep-alive"
//   });

//   const requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow"
//   };

//   fetch("https://api.bgm.tv/calendar", requestOptions)
//     .then((response) => response.json())
//     .then((data) => {
//       const calendar = data.map((obj) => {
//         const dayCards = obj.items.map((item) => {
//           return (
//             <div key={item.id}>
//               <AniCard
//                 title={item["name_cn"] || item["name"]}
//                 src={item.images.common}
//               />
//             </div>
//           );
//         });

//         // 单日番剧
//         return (
//           <div key={obj.weekday.id} className="flex mb-1">
//             <div className={clsx(
//               styles["day-title"],
//               today === obj.weekday.id - 1 && styles["isToday"] 
//             )}>{obj.weekday.cn}</div>
//             <div className={styles.dayCards}>
//               {dayCards}
//             </div>
//           </div>
//         );
//       });

//       setCalendarCards(calendar);
//     })
//     .catch((err) => console.error(err));


//   const week = ['日', '一', '二', '三', '四', '五', '六',]
//     const weekdays = week.map((x, i) => {
//       return (
//         <button key={x} className={clsx(
//           "border px-1", {"bg-sky-500": today === i}
//           )}
//          onClick={() => setToday(i)}
//         >
//           {x}
//         </button>
//       )
//     })
//   return (
//     <>
//       <div className="md:hidden">
//         <div className="flex">
//           {weekdays}
//         </div>
//         {calendarCards[today]}
//       </div>
//       <div className="hidden md:block px-16 py-8">
//         <div>每日放送
//           <span className="l-2 text-sm text-red-700">{date.toLocaleDateString()} 星期{week[date.getDay()]}
//           </span>
//         </div>
//         {calendarCards}
//       </div>
//     </>
//   );
// }