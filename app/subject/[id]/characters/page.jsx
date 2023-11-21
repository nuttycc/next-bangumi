import Image from "next/image";
import { getCharacters } from "@/app/lib/subject";

export default async function Characters({ params }) {
  const characters = await getCharacters(params.id);
  const charactersList = characters.map((x) => {
    const actorsList = x.actors.map((a) => {

      return (
        <a href={`/character/${a.id}`} key={a.id} className="flex items-center">
          <Image src={a.images.small} alt={a.name} width={16} height={16} className="w-[1rem] h-[1rem]"/> 
          {a.name}
        </a>
      )
    })

    return (
      <div key={x.id} className="flex">
        <a href={x.images.grid} target="_blank">
          <Image
            src={x.images.grid}
            alt=""
            width={200 / 3}
            height={363 / 3}
            className="mr-2 h-[80px] w-[66px] border border-black object-cover object-top dark:border-gray-300"
          />
        </a>
        <div className="space-y-2 text-sm">
          <div className="mb-2 border-b">
            <a href={`/character/${x.id}`}>{x.name}</a>

            <small className="ml-2 w-max bg-[#284b63] px-1 text-gray-300 dark:text-white">
              {x.relation}
            </small>
          </div>
          <div>{actorsList}</div>
          <div></div>
        </div>
      </div>
    );
  });

  return <div className="grid grid-cols-2 gap-2">{charactersList}</div>;
}
