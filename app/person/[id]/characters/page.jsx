import { getPersonRelatedCharacters } from "@/app/lib/person";
import Image from "next/image";

export default async function Characters({ params }) {
  const personId = params.id
  const characters = await getPersonRelatedCharacters(personId)
    const characterList = characters.map((x) => {
      return (
        <div key={x.subject_id} className="flex gap-2 border">
          <Image src={x.images.grid} alt="" width={60} height={70} className="w-[60px] h-[70px] object-cover object-top" />
          <div>
            <p className="mb-2 text-base">
              <span className="tag-sm">{x.staff}</span>
              {x.name}
            </p>
            <div className="text-xs">
              <div>{x.subject_name_cn}</div>
              <div>{x.subject_name}</div>
              {/* <div>{x.subject_id}</div> */}
              {/* <div>{x.type}</div> */}
            </div>
          </div>
        </div>
      );
    });
  
  return (
    <div>
      {characterList}
    </div>
  )
}