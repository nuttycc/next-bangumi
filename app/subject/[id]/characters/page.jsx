import Image from "next/image";
import { getCharacters } from "@/app/lib/subject";

export default async function Characters({ params }) {
  const characters = await getCharacters(params.id);
  const charactersList = characters.map((x) => {
    return (
      <div key={x.id} className="flex">
        <span>
          <Image
            src={x.images.grid}
            alt=""
            width={40}
            height={30}
            className="h-14 w-10"
          />
        </span>
        <div className="text-sm">
          <div>名:{x.name}</div>
          <div>剧中地位:{x.relation}</div>
          <div>CV:{x.actors.name}</div>
          <div></div>
        </div>
      </div>
    );
  });
  return <div className="grid grid-cols-2">{charactersList}</div>;
}
