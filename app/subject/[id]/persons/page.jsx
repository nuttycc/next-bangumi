import { getPersons } from "@/app/lib/subject";
import Image from "next/image";

export default async function Persons({ params }) {
  const subject_id = params.id;
  const r = await getPersons(subject_id);

  const pList = r.map((x, i) => {
    return (
      <div key={x.id} className="mb-1 flex">
        <a href={x.images.grid} target="_blank">
          <Image
            src={x.images.small || "/info_only.png"}
            alt={x.name}
            width={70}
            height={66}
            className="object-cover object-top w-[70px] h-[66px] "
          />
        </a>
        <div className="ml-2">
          <a href={`/person/${x.id}`} className="text-link">{x.name_cn || x.name}</a>
          <div className="tag-sm mt-1">
            {x.relation || "-"}
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="md:grid grid-cols-3 gap-2">{pList}</div>
    </>
  );
}
