import Image from "next/image";
import { getCharacters } from "@/app/lib/subject";

export default async function Characters({ params }) {
  const characters = await getCharacters(params.id);
  const charactersList = characters.map((x) => {
    const actorsList = x.actors.map((a) => {
      return (
        <a href={`/people/${a.id}`} key={a.id} className="flex items-center">
          <Image src={a.images.small} alt={a.name} width={16} height={16} className="w-[1rem] h-[1rem] object-cover object-top"/> 
          {a.name}
        </a>
      )
    })

    return (
      <div key={x.id} className="flex">
        <a href={x.images.grid} target="_blank">
          <Image
            src={x.images.grid}
            alt={x.name}
            width={80}
            height={66}
            className="mr-2 h-[80px] w-[66px] border border-black object-cover object-top dark:border-gray-300"
          />
        </a>
        <div className="space-y-2 ">
          <div className="mb-2 ">
            <small className="tag-sm">
              {x.relation}
            </small>
            <a href={`/character/${x.id}`} className="text-link">{x.name}</a>
          </div>
          <div>{actorsList}</div>
          <div></div>
        </div>
      </div>
    );
  });

  return <div className="md:grid grid-cols-2 gap-2">{charactersList}</div>;
}
