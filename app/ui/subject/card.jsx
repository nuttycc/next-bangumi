import Image from "next/image";
import styles from "./subject.module.css";
import { getPlaiceholder } from "plaiceholder";

const getImage = async (src) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};
// 单个番剧卡片
export default async function AniCard({ title, src, id }) {
  if (!src) return;
  const { base64, img } = await getImage(src);

  return (
    <>
      <a href={`/subject/${id}`}>
        <div
          title={title}
          className="relative mb-[1px] w-[100px] rounded-sm border"
        >
          <div className="relative block p-2 md:h-[150px] md:w-[100px]">
            <Image
              className="hidden border border-gray-400 md:block"
              src={img.src}
              alt={title}
              fill
              sizes="10vw"
              placeholder="blur"
              blurDataURL={base64}
            />
            <div className="absolute bottom-0 left-0 w-full  overflow-hidden text-ellipsis whitespace-nowrap px-1  text-gray-300 text-[0.65rem]  bg-[#2d2e2f] ">
              {title}
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
