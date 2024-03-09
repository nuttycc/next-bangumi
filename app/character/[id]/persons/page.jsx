import { getCharacterRelatedPersons } from '@/app/lib/character'

export default async function Persons({ params }) {
  const characterId = params.id
  const persons = await getCharacterRelatedPersons(characterId)

  const personsList = persons.map((x) => {
    return (
      <div key={x.subject_id} className="border">
        {/* <Image src={x.image} alt="" width={100} height={100} /> */}
        <div>{x.name}</div>
        {/* <div>{x.subject_name}</div> */}
        <div>{x.subject_name_cn || x.subject_name}</div>
        <div>{x.staff}</div>
        {/* <div>{x.subject_id}</div> */}
        {/* <div>{x.type}</div> */}
      </div>
    )
  })

  return <div>{personsList}</div>
}
