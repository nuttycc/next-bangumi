import Image from 'next/image'
import { getSubject, getCharacters } from '@/app/lib/subject'
import { getCharacterDetails as getDetails } from '@/app/lib/character'

export default async function Page({ params }) {
  const id = params.id

  const [subject, characters] = await Promise.all([
    getSubject(id),
    getCharacters(id),
  ])

  const acdetails = await getAllCharacterDetails(characters)

  async function getAllCharacterDetails(characters) {
    const detailsPromises = characters.map(async (character) => {
      const details = await getDetails(character.id)
      return details
    })
    return Promise.allSettled(detailsPromises)
  }

  const infobox = subject.infobox.map((x) => {
    if (typeof x.value === 'object') {
      return null
    }
    return (
      <div key={x.key} className="border-b">
        <span className="">{x.key}</span>：<span>{x.value}</span>
      </div>
    )
  })
  const infobox_sm = subject.infobox.slice(0, 10).map((x) => {
    if (typeof x.value === 'object') {
      return null
    }
    return (
      <div key={x.key}>
        {x.key}：{x.value}
      </div>
    )
  })

  const tags = subject.tags.map((x) => {
    return (
      <div key={x.name} className="tag-sm">
        {x.name}
      </div>
    )
  })

  const charactersList = characters.slice(0, 10).map((x, i) => {
    let name_cn
    if (acdetails[i].status !== 'fulfilled') {
      name_cn = x.name
    } else {
      name_cn =
        acdetails[i].value.infobox[0].key === '简体中文名'
          ? acdetails[i].value.infobox[0].value
          : acdetails[i].value.name
    }

    const actorsList = x.actors.map((a) => {
      return (
        <a
          href={`/person/${a.id}`}
          key={a.id}
          className="flex w-max items-center hover:text-rose-400"
        >
          <Image
            src={a.images.small}
            alt={a.name}
            width={16}
            height={16}
            className="h-[1rem] w-[1rem] border border-black dark:border-gray-200"
          />
          {a.name}
        </a>
      )
    })

    return (
      <div key={x.id} className="mb-2 flex">
        <div className="relative mr-1 h-[66px] w-[50px]">
          <Image
            src={x.images.grid}
            alt={name_cn}
            fill
            sizes="50px"
            className="mr-1 border border-black object-cover object-top dark:border-gray-200"
          />
        </div>

        <div>
          <div className="mb-1">
            <span className="tag-sm mr-1">{x.relation}</span>
            <a href={`/character/${x.id}`} className="text-link">
              {name_cn}
            </a>
          </div>
          <div className="text-sm">{actorsList}</div>
        </div>
      </div>
    )
  })

  const scoreList = Array(10)
    .fill(0)
    .map((x, i) => {
      const total = subject.rating.total
      const count = subject.rating.count
      const p = (Number(count[10 - i]) / Number(total)) * 6 + 0.01
      return (
        <div key={i} className="flex flex-col items-center justify-end">
          <div
            className={`w-[0.76rem] bg-gray-400`}
            style={{ height: `${p}rem` }}
          ></div>
          <small className="">{10 - i}</small>
        </div>
      )
    })

  return (
    <>
      <div className="flex flex-col dark:bg-gray-950 md:flex-row ">
        {/* 左侧番剧信息：图片，名，放送时间，制作组 */}
        <div className="md:mr-3 md:w-[33vw] md:text-[0.82rem]">
          <div className="flex flex-col items-center justify-center">
            <Image
              src={subject.images.medium}
              alt="image"
              width={210}
              height={291}
              priority
              className="photo-frame mb-2"
            />
            <p className="text-sm md:hidden">
              {subject.name_cn || subject.name}
            </p>
          </div>

          <div className="hidden space-y-1 md:block">{infobox}</div>
          <div className="md:hidden">{infobox_sm}</div>
        </div>

        {/* 右侧番剧信息：简介，标签，角色，关联条目 */}
        <div className="space-y-2">
          <div className="gap-4 md:flex">
            <div>
              <p>名称：{subject.name_cn || subject.name}</p>
              {/* <div>观看进度管理</div> */}
              <div className="">
                简介：
                {subject.summary}
              </div>
              <div className="">
                <div>标签</div>
                <div className="flex flex-wrap gap-2 text-sm">{tags}</div>
              </div>
            </div>
            <div className="mt-2 h-max border border-rose-500 p-1 md:mt-5">
              <small>
                <span className="mr-4">得分：{subject.rating.score}</span>
                <span className=" text-gray-500">
                  {subject.rating.total}votes
                </span>
              </small>
              <div className="mt-4 flex gap-1">{scoreList}</div>
            </div>
          </div>

          <div>
            <div>
              剧中角色
              <div className="mb-1 px-2 text-[0.785em] dark:text-gray-300">
                共 {characters.length} 个，仅展示部分，
                <a
                  href={`./${id}/characters`}
                  className="border-b border-sky-500  dark:text-white"
                >
                  点我查看全部
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3">
              {charactersList}
            </div>
          </div>
          {/* <div>关联条目</div> */}
          {/* <div>用户操作盒子</div> */}
        </div>
      </div>
    </>
  )
}
