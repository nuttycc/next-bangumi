import { getEpisodes } from '@/app/lib/episode'

export default async function Episodes({ params }) {
  const r = await getEpisodes(params.id)

  const epList = r.data.map((x) => {
    return (
      <div key={x.id} className="mb-2 border-b pl-1 dark:border-gray-400">
        <div className="flex justify-between">
          <a href={`/episode/${x.id}`} className="text-link font-semibold">
            <span>{x.ep}.</span>
            {x.name_cn || x.name || '待补充'}
          </a>
          <span className="ml-4">
            {/* 评论数 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="inline"
            >
              <g fill="none" stroke="#cccccc" strokeLinejoin="round">
                <path
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  d="M12 21a9 9 0 1 0-8-4.873L3 21l4.873-1c1.236.639 2.64 1 4.127 1Z"
                  className="stroke-black dark:stroke-gray-300"
                />
                <path
                  strokeWidth="2.25"
                  d="M7.5 12h.01v.01H7.5zm4.5 0h.01v.01H12zm4.5 0h.01v.01h-.01z"
                  className="stroke-black dark:stroke-gray-300"
                />
              </g>
            </svg>
            <small>{x.comment}</small>
          </span>
        </div>
        <div>{x.name}</div>
        <div>上映时间：{x.airdate}</div>
        <div>时长：{x.duration || '*'}</div>
        {/* <div>描述：{x.desc || "待补充"}</div> */}
        <div></div>
        <div>{}</div>
        <div></div>
      </div>
    )
  })

  return (
    <>
      <div className="">{epList}</div>
    </>
  )
}
