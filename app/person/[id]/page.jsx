import {
  getPersonDetails,
  getPersonRelatedCharacters,
  getPersonRelatedSubjects,
} from "@/app/lib/person";
import Image from "next/image";

export default async function Person({ params }) {
  const personId = params.id;
  const [details, characters, subjects] = await Promise.all([
    getPersonDetails(personId),
    getPersonRelatedCharacters(personId),
    getPersonRelatedSubjects(personId)
  ]);

  const infobox = details.infobox.map((x) => {
    let v = x.value;
    if (typeof x.value === "object") {
      v = x.value.map((y) => {
        if (!y.value) return "-";
        return (
          <div key={y.key}>
            <span>{y.key}：</span>
            <span>{y.value}</span>
          </div>
        );
      });
    }
    
    return (
      <div key={x.key}>
        <span>{x.key}：</span>
        <span>{v || "待补充"}</span>
      </div>
    );
  });
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
          <a href={`/subject/${x.id}`} className="mb-2 block w-max border-b">
            {x.name_cn || x.name}{" "}
          </a>
          <div className="text-sm">
            <p>
              <span className="tag-sm mr-2">{x.staff}</span>
              <span className="text-xs">{x.name}</span>
            </p>
          </div>
        </div>
      </div>
    );
  });
  const characterList = characters.map((x) => {
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
  });
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="w-[300px]">
        <a href={details.images.grid} target="_blank" className="block">
          <Image
            src={details.images.grid}
            alt={details.name}
            width={200}
            height={363}
          />
        </a>
        <div className="mt-2 md:text-[0.78rem] md:leading-5">{infobox}</div>
      </div>

      <div className="space-y-2">
        <div className="flex">
          <h1 className="mr-1 text-xl">{details.name}</h1>
          <div className="space-x-2 text-xs">
            <span>
              {/* 评论数 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="inline"
              >
                <g fill="none" stroke="#cccccc" stroke-linejoin="round">
                  <path
                    stroke-linecap="round"
                    stroke-width="1.5"
                    d="M12 21a9 9 0 1 0-8-4.873L3 21l4.873-1c1.236.639 2.64 1 4.127 1Z"
                    className="stroke-black dark:stroke-gray-300"
                  />
                  <path
                    stroke-width="2.25"
                    d="M7.5 12h.01v.01H7.5zm4.5 0h.01v.01H12zm4.5 0h.01v.01h-.01z"
                    className="stroke-black dark:stroke-gray-300"
                  />
                </g>
              </svg>
              {details.stat.comments}
            </span>
            <span className="align-baseline">
              {/* 收藏数 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="inline"
              >
                <path
                  fill="#ffffff"
                  stroke="#ffffff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="m8.587 8.236l2.598-5.232a.911.911 0 0 1 1.63 0l2.598 5.232l5.808.844a.902.902 0 0 1 .503 1.542l-4.202 4.07l.992 5.75c.127.738-.653 1.3-1.32.952L12 18.678l-5.195 2.716c-.666.349-1.446-.214-1.319-.953l.992-5.75l-4.202-4.07a.902.902 0 0 1 .503-1.54l5.808-.845Z"
                  className="fill-red-500 dark:fill-gray-300"
                />
              </svg>
              {details.stat.collects}
            </span>
          </div>
        </div>

        <hr></hr>
        <div>
          <h2 className="">简介</h2>
          <p>{details.summary}</p>
        </div>

        <h2 className="">相关条目</h2>
        <div className="">{subjectsList}</div>
        {/* <div>{personsList}</div> */}
      </div>
    </div>
  );
}
