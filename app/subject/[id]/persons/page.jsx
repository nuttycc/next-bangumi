import { getPersons } from "@/app/lib/subject";
import Image from "next/image";

export default async function Persons({ params }) {
  const subject_id = params.id;
  const r = await getPersons(subject_id);

  const pList = r.map((x, i) => {
    return (
      <div key={i} className="mb-1 flex">
          <a href={x.images.medium}>
            <Image
              src={x.images.small || "/info_only.png"}
              alt="image"
              width={100/2}
              height={150/2}
            />
          </a>
        <div className="">
          <div>{x.name_cn || x.name}</div>
          <div>{x.relation || "*"}</div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="grid grid-cols-3 gap-2">{pList}</div>
    </>
  );
}
