import {
  getDetails,
  getRelatedSubjects,
  getRelatedPersons,
} from "@/app/lib/character";
import { getSubjectImage } from "@/app/lib/subject";
import { getPersonImage } from "@/app/lib/person";
import Image from "next/image";
export default async function Character({ params }) {
  const characterId = params.id
  const [details, persons, subjects] = await Promise.all(
    [
      getDetails(characterId),
      getRelatedPersons(characterId),
      getRelatedSubjects(characterId),
    ],
  );

  const infobox = details.infobox.map((x) => {
    let v = x.value
    if (typeof x.value === 'object') {
      v = x.value.map((y) => {
        if(!y.value) return
        return (
          <div key={y.key}>
            <span>{y.key}：</span>
            <span>{y.value}</span>
          </div>
        );
      })
    }
    return (
      <div key={x.key}>
        <span>{ x.key }：</span>
        <span>{ v || '待补充' }</span>
      </div>
    )
  })
  const subjectsList = subjects.map((x) => {
    return (
      <div key={x.id} className="flex gap-2 border p-2 dark:border-gray-400">
        <Image
          src={x.image}
          alt=""
          width={350 / 6}
          height={500 / 6}
          className="photo-frame"
        />
        <div>
          <p className="mb-2 border-b">{x.name_cn || x.name} </p>
          <div className="text-sm">
            <p>
              <span className="mr-2 w-max bg-sky-400 px-1 dark:bg-sky-800">
                {x.staff}
              </span>
              <span>{x.name}</span>
            </p>
          </div>
        </div>
      </div>
    );
  })
  const personsList = persons.map((x) => {
    return (
      <div key={x.subject_id} className="border">
        {/* <Image src={x.image} alt="" width={100} height={100} /> */}
        <div>{x.name}</div>
        <div>{x.subject_name}</div>
        <div>{x.subject_name_cn}</div>
        <div>{x.staff}</div>
        <div>{x.subject_id}</div>
        <div>{x.type}</div>
      </div>
    );
  })
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-[300px]">
        <a href={details.images.grid} target="_blank" className="block">
          <Image
            src={details.images.grid}
            alt={details.name}
            width={200}
            height={363}
          />
        </a>
        <div className="mt-2 text-sm">{infobox}</div>
      </div>

      <div className="space-y-2">
        <div>
          <div>{details.summary}</div>
        </div>
        <div className="flex gap-4">
          <div>评论数{details.stat.comments}</div>
          <div>收藏数{details.stat.collects}</div>
        </div>
        <div className="">相关条目</div>
        <div className="md:grid md:grid-cols-2 md:gap-2">{subjectsList}</div>
        {/* <div>{personsList}</div> */}
      </div>
    </div>
  );
}
