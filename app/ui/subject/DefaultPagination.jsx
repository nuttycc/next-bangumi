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
      <input
        type="text"
        className="mx-1 h-6 w-8 border p-1 outline-none focus:border-blue-400 dark:bg-gray-500 "
        onChange={(e) => handleJumpTo(e)}
      ></input>
      页
    </div>
  )
}
