import { getPersons } from "@/app/lib/subject";
import Image from "next/image";

export default async function Persons({ params }) {
  const subject_id = params.id;
  const r = await getPersons(subject_id);

  const pList = r.map((x, i) => {
    return (
      <div key={i} className="mb-1 flex">
        <div className="relative h-[75px] w-[75px] rounded-sm border shadow-inner shadow-gray-400">
          <Image
            src={x.images.small || "/info_only.png"}
            alt="image"
            fill
            sizes="75px"
          />
        </div>
        <div className="pl-2">
          <div>名：{x.name_cn || x.name}</div>
          <div>关系：{x.relation || "*"}</div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="">{pList}</div>
    </>
  );
}
