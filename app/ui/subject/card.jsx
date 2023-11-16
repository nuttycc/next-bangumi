import Image from "next/image";
import styles from './subject.module.css'
import { getPlaiceholder } from "plaiceholder";

const getImage = async (src) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
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
  if(!src) return
  const { base64, img} = await getImage(src)

  return (
    <>
      <a href={`/subject/${id}`}>
        <figure className="w-[100px] border border-rose-500">
          <div className="block relative  md:w-[100px] md:h-[150px]" title={title}>
            <Image
              className="hidden md:block"
              src={img.src}
              alt={title}
              fill
              sizes="10vw"
              placeholder="blur"
              blurDataURL={base64}
            />
          </div>
          <figcaption className={styles["card-title"]}>{title}</figcaption>
        </figure>
      </a>
    </>
  );
}