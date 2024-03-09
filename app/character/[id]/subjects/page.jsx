import { getCharacterRelatedSubjects } from '@/app/lib/character'
import Image from 'next/image'

export default async function Subjects({ params }) {
  const characterId = params.id
  const subjects = await getCharacterRelatedSubjects(characterId)
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
            {x.name_cn || x.name}{' '}
          </a>
          <div className="text-sm">
            <p>
              <span className="tag-sm mr-2">{x.staff}</span>
              <span className="text-xs">{x.name}</span>
            </p>
          </div>
        </div>
      </div>
    )
  })

  return <div>{subjectsList}</div>
}
