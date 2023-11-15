import { getSubject, getCharacters } from "@/app/lib/subject"
import Image from "next/image"
import { getDetails } from "@/app/lib/character"

export default async function Page({ params }) {
  const id = params.id

  const subject = await getSubject(id)
  const characters = await getCharacters(id)

  const infobox = subject.infobox.slice(0, 10).map((x) => {
    if(typeof x.value === 'object') {
      return null
    }
    return <div key={x.key}>{x.key}:{x.value}</div>
  })

  const tags = subject.tags.map((x) => {
    return <div key={x.name} className="bg-rose-400">{x.name}</div>
  })
  
  const charactersList = characters.slice(0, 20).map(async (x) => {
    const d = await getDetails(x.id)
    const name_cn = d.infobox[0].key === "简体中文名" ? d.infobox[0].value : d.name
    return (
      <div key={x.id} className="flex">
        <span>
          <Image src={x.images.grid} alt="" width={40} height={30} 
            className="w-10 h-14"
          />
        </span>
        <div className="text-sm">
          <div>名:{name_cn}</div>
          <div>剧中地位:{x.relation}</div>
          <div>CV:{x.actors.name}</div>
          <div></div>
        </div>
      </div>
    )
  })

  return (
    <div className="">
      {/* 上导航栏 */}

      {/* 下信息 */}
      <div className="flex flex-col md:flex-row text-sm">
        {/* 左侧番剧信息：图片，名，放送时间，制作组 */}
        <div className="bg-rose-300">
          <div className="text-center">
            <Image src={subject.images.small} alt="image" width={150} height={150} 
              className="inline-block py-2"
            />
          </div>
          <div className="">
            {infobox}
          </div>
        </div>
        {/* 右侧番剧信息：简介，标签，角色，关联条目 */}
        <div className="bg-yellow-200">
          <div>观看进度管理</div>
          <div>简介:{subject.summary}</div>
          <div className="">
            <div>标签:</div>
            <div className="grid grid-cols-4 gap-2 text-sm">
              {tags}
            </div>
          </div>
          <div>
            <div>剧中角色
              <span className="bg-rose-300 px-2 text-[0.785em]">
                共 {characters.length} 个，仅展示前20个，
                <a href={`./${id}/characters`} className="bg-sky-300">点我查看全部</a>
              </span>
            </div>
            <div className="grid grid-cols-2">{charactersList}</div>
          </div>
          <div>关联条目</div>
          <div>用户操作盒子</div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

    </div>
  )
}