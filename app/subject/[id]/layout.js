
export default function Layout({ children, params }) {
  const id = params.id

  return(
    <>
      <div className="flex space-x-2 bg-rose-200">
        <a href={`/subject/${id}`} className="hover:bg-sky-300">概览</a>
        <a href={`/subject/${id}/episodes`} className="hover:bg-sky-300">章节</a>
        <a href={`/subject/${id}/characters`} className="hover:bg-sky-300">角色</a>
        <a href={`/subject/${id}/persons`} className="hover:bg-sky-300">制作人员</a>
      </div>
      <div>
        {children}
      </div>
    
    </>

    
  )
}