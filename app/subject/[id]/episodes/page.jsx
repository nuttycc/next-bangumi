import { getEpisodes } from "@/app/lib/episode";

export default async function Episodes({ params }) {
  const r = await getEpisodes(params.id);

  const epList = r.data.map((x) => {
    return (
      <div key={x.id} className="mb-2 border-b dark:border-gray-400 pl-1">
        <div className="font-semibold">
          <span>{x.ep}.</span>
          {x.name_cn || x.name || "待补充"}
        </div>
        <div>上映时间：{x.airdate}</div>
        <div>时长：{x.duration || "*"}</div>
        {/* <div>描述：{x.desc || "*"}</div> */}
        <div></div>
        <div></div>
      </div>
    );
  });

  return (
    <>
      <div className="">{epList}</div>
    </>
  );
}
