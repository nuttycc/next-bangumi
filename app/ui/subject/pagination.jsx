'use client'

export default function Pagination() {

  function handleJumpTo(e) {
    const p = e.target.value
    const params = new URLSearchParams(window.location.search)
    params.set('page', p)
    const newUrl = `${window.location.origin}${window.location.pathname}?${params}`
    location.assign(newUrl)
  }
  return (
    <div>
      跳至
      <input type="text" className="border outline-none w-8 h-6 p-1 mx-1 focus:border-blue-400 dark:bg-gray-500 " onChange={(e) => handleJumpTo(e)}></input>
      页
    </div>
  )
}