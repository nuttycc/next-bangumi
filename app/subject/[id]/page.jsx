import Image from "next/image";
import { getSubject, getCharacters } from "@/app/lib/subject";
import { getDetails } from "@/app/lib/character";

async function getAllCharacterDetails(characters) {
  const detailsPromises = characters.map(async (character) => {
    const details = await getDetails(character.id);
    return details;
  });
  return Promise.allSettled(detailsPromises); // 等待所有的详情都被获取
}

export default async function Page({ params }) {
  const id = params.id;
  const subject = await getSubject(id);
  const characters = await getCharacters(id);
  const acdetails = await getAllCharacterDetails(characters);

  const infobox = subject.infobox.slice(0, 10).map((x) => {
    if (typeof x.value === "object") {
      return null;
    }
    return (
      <div key={x.key}>
        {x.key}:{x.value}
      </div>
    );
  });

  const tags = subject.tags.map((x) => {
    return (
      <div key={x.name} className="bg-rose-400">
        {x.name}
      </div>
    );
  });

  const charactersList = characters.slice(0, 20).map((x, i) => {
    let name_cn;
    if (acdetails[i].status !== "fulfilled") {
      name_cn = x.name;
    } else {
      name_cn =
        acdetails[i].value.infobox[0].key === "简体中文名"
          ? acdetails[i].value.infobox[0].value
          : acdetails[i].value.name;
    }

    // const name_cn = 'xxxx'
    return (
      <div key={x.id} className="flex">
        <div className="relative h-[50px] w-[50px]">
          <Image
            src={x.images.grid}
            alt={name_cn}
            fill
            sizes="50px"
            className="object-contain"
          />
        </div>
        <div className="text-sm">
          <div>名: {name_cn}</div>
          <div>地位: {x.relation}</div>
          <div>ID: {x.id}</div>
          {/* <div>CV:{x.actors.name}</div> */}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="flex flex-col text-sm dark:bg-gray-950 md:flex-row">
        {/* 左侧番剧信息：图片，名，放送时间，制作组 */}
        <div className="border border-red-500">
          <div className="relative h-[33vh] w-auto">
            <Image
              src={subject.images.small}
              alt="image"
              fill
              sizes="33vw"
              className="object-contain"
            />
          </div>
          <div className="border border-yellow-300">{infobox}</div>
        </div>

        {/* 右侧番剧信息：简介，标签，角色，关联条目 */}
        <div className="">
          <div>观看进度管理</div>
          <div className="border border-green-500">简介:{subject.summary}</div>
          <div className="">
            <div>标签:</div>
            <div className="flex flex-wrap gap-2 border text-sm">{tags}</div>
          </div>
          <div>
            <div>
              剧中角色
              <div className="border border-pink-500 px-2 text-[0.785em]">
                共 {characters.length} 个，仅展示部分，
                <a
                  href={`./${id}/characters`}
                  className="border-b border-sky-500 font-black"
                >
                  点我查看全部
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2">{charactersList}</div>
          </div>
          <div>关联条目</div>
          <div>用户操作盒子</div>
        </div>
      </div>
    </>
  );
}
