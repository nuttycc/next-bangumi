import {getDetails, getRelatedSubjects ,getRelatedPersons} from '@/app/lib/character'

export default async function Character({ }) {
  const [imageData, detailsData, personsData, subjectsData] = await Promise.all(
    [
      getDetails(characterId),
      getRelatedPersons(characterId),
      getRelatedSubjects(characterId),
    ],
  );
}