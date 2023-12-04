import Image from 'next/image';
import Filter from '@/app/ui/subject/filter';

export default function loading() {
  const rankList = Array(10)
    .fill(0)
    .map((x, i) => {
      return (
        <div key={i} className="flex">
          {/* 图片 */}
          <div className="photo-frame mr-2 shrink-0">
            <Image
              src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNctGzVTwAG0QLtrgHmwwAAAABJRU5ErkJggg==`}
              alt="image"
              width={80}
              height={110}
              className="h-[110px] w-[80px] animate-flash object-cover p-1"
            />
          </div>

          {/* 信息 */}
          <div className="pt-2">
            <div className="flash mb-1 h-4 w-40 animate-flash bg-gray-300"></div>
            <div className="space-y-1">
              <div className="h-4 w-16 animate-flash bg-gray-300"></div>
              <div className="h-4 w-20 animate-flash bg-gray-300"></div>
              <div className="h-4 w-32 animate-flash bg-gray-300 "></div>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div>
      <h1 className="sr-only">loading...</h1>
      {/* 标题 */}
      <div className="text-lg font-semibold antialiased">动画索引</div>
      <hr className="mb-2 opacity-30 grayscale"></hr>
      <div className="border-gray-400">
        <Filter />
      </div>
      <hr className="mb-2"></hr>
      <div className="space-y-1">{rankList}</div>
    </div>
  );
}
