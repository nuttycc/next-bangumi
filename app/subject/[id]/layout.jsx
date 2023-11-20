'use client'
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Layout({ children, params }) {
  const id = params.id;
  const pathname = usePathname()

  return (
    <>
      <ul className="mb-2 flex space-x-2 border-b">
        <li>
          <a
            href={`/subject/${id}`}
            className={clsx("px-1 hover:bg-[#ffc2d1] hover:text-black", {
              "bg-[#ffc2d1] text-black": pathname === `/subject/${id}`,
            })}
          >
            概览
          </a>
        </li>
        <li>
          <a
            href={`/subject/${id}/episodes`}
            className={clsx("px-1 hover:bg-[#ffc2d1] hover:text-black", {
              "bg-[#ffc2d1] text-black": pathname === `/subject/${id}/episodes`,
            })}
          >
            章节
          </a>
        </li>
        <li>
          <a
            href={`/subject/${id}/characters`}
            className={clsx("px-1 hover:bg-[#ffc2d1] hover:text-black", {
              "bg-[#ffc2d1] text-black": pathname === `/subject/${id}/characters`,
            })}
          >
            角色
          </a>
        </li>
        <li>
          <a
            href={`/subject/${id}/persons`}
            className={clsx("px-1 hover:bg-[#ffc2d1] hover:text-black", {
              "bg-[#ffc2d1] text-black": pathname === `/subject/${id}/persons`,
            })}
          >
            制作人员
          </a>
        </li>
      </ul>
      <div>{children}</div>
    </>
  );
}
