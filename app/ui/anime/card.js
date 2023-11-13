import Image from "next/image";

// 单个番剧卡片
export default function AniCard({ title, src }) {
  return (
    <div className="border md:w-[100px]" title={title}>
      <Image
        className="hidden md:block w-[100px] h-[120px]"
        src={src}
        alt={title}
        width={100}
        height={120}
      />
      <div className={styles["card-title"]}>{title}</div>
    </div>
  );
}