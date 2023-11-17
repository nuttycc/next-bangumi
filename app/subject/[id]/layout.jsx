export default function Layout({ children, params }) {
  const id = params.id;

  return (
    <>
      <ul className="flex space-x-2 border">
        <li>
          <a href={`/subject/${id}`} className="hover:bg-sky-300">
            概览
          </a>
        </li>
        <li>
          <a href={`/subject/${id}/episodes`} className="hover:bg-sky-300">
            章节
          </a>
        </li>
        <li>
          <a href={`/subject/${id}/characters`} className="hover:bg-sky-300">
            角色
          </a>
        </li>
        <li>
          <a href={`/subject/${id}/persons`} className="hover:bg-sky-300">
            制作人员
          </a>
        </li>
      </ul>
      <div>{children}</div>
    </>
  );
}
