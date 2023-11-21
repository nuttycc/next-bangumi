import { getPersons } from "@/app/lib/subject";
import Image from "next/image";

export default async function Persons({ params }) {
  const subject_id = params.id;
  const r = await getPersons(subject_id);

  const pList = r.map((x, i) => {
    return (
      <a href={`/person/${x.id}`} key={x.id} className="mb-1 flex">
        <a href={x.images.medium} className="h-[50px] w-[50px]">
          <Image
            src={x.images.small || "/info_only.png"}
            alt="image"
            fill
            className="object-cover"
          />
        </a>
        <div className="">
          <div>{x.name_cn || x.name}</div>
          <div className="w-max bg-[#284b63] text-gray-300 dark:text-white ">
            {x.relation || "*"}
          </div>
        </div>
      </a>
    );
  });

  return (
    <>
      <div className="grid grid-cols-3 gap-2">{pList}</div>
    </>
  );
}
