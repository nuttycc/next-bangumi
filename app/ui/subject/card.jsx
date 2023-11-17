import Image from "next/image";
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
// 单张卡片
export default async function AniCard({ title, src, id }) {
  if (!src) return;
  const { base64, img } = await getImage(src);

  return (
    <>
      <a
        href={`/subject/${id}`}
        title={title}
        className="relative mb-[1px] w-[100px] rounded-sm border md:block"
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
          <div className="absolute bottom-0 left-0 overflow-hidden text-ellipsis whitespace-nowrap bg-[#2d2e2f] px-1  pt-1 text-[0.65rem] text-gray-300  md:w-full ">
            {title}
          </div>
        </div>
      </a>

    </>
  );
}
