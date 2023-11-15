import Image from "next/image";
import styles from './subject.module.css'

// 单个番剧卡片
export default function AniCard({ title, src, id }) {
  return (
    <a href={`/subject/${id}`} className="block relative border border-rose-500 md:w-[100px] md:h-[150px]" title={title}>
      <Image
        className="hidden md:block"
        src={src}
        alt={title}
        fill
        sizes="30vw"
        placeholder="blur"
      />
      <div className={styles["card-title"]}>{title}</div>
    </a>
  );
}