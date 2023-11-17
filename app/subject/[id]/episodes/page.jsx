import { getEpisodes } from "@/app/lib/episode";

export default async function Episodes({ params }) {
  const r = await getEpisodes(params.id);
  console.log("🚀🚀 ~ Episodes ~ r: ", r);

  const epList = r.data.map((x) => {
    return (
      <div key={x.id} className="mb-2 border border-pink-500 pl-1">
        <div>
          <span>{x.ep}-</span>
          {x.name_cn || x.name}
        </div>
        <div>上映时间：{x.airdate}</div>
        <div>时长：{x.duration || "*"}</div>
        <div>描述：{x.desc || "*"}</div>
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
