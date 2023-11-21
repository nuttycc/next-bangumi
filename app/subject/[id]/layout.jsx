"use client";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

export default function Layout({ children, params }) {
  const id = params.id;
  const pathname = usePathname();

  return (
    <>
      <ul className="mb-2 flex space-x-2 border-b">
        <li>
          <Link
            href={`/subject/${id}`}
            className={clsx("px-1 hover:bg-[#ffc2d1] hover:text-black", {
              "bg-[#ffc2d1] text-black": pathname === `/subject/${id}`,
            })}
          >
            概览
          </Link>
        </li>
        <li>
          <Link
            href={`/subject/${id}/episodes`}
            className={clsx("px-1 hover:bg-[#ffc2d1] hover:text-black", {
              "bg-[#ffc2d1] text-black": pathname === `/subject/${id}/episodes`,
            })}
          >
            章节
          </Link>
        </li>
        <li>
          <Link
            href={`/subject/${id}/characters`}
            className={clsx("px-1 hover:bg-[#ffc2d1] hover:text-black", {
              "bg-[#ffc2d1] text-black":
                pathname === `/subject/${id}/characters`,
            })}
          >
            角色
          </Link>
        </li>
        <li>
          <Link
            href={`/subject/${id}/persons`}
            className={clsx("px-1 hover:bg-[#ffc2d1] hover:text-black", {
              "bg-[#ffc2d1] text-black": pathname === `/subject/${id}/persons`,
            })}
          >
            制作人员
          </Link>
        </li>
      </ul>
      <div>{children}</div>
    </>
  );
}
