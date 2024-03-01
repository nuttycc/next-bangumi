import { getInfoByPath } from './utils';

// {small|grid|large|medium}
export async function getCharacterImage(id, type = 'grid') {
  const imageUrl = `https://api.bgm.tv/v0/characters/${id}/image?type=${type}`;
  const headers = new Headers({
    'User-Agent':
      'nuttycc/next-bangumi/1.0 (https://github.com/nuttycc/next-bangumi)',
  });
  try {
    const response = await fetch(imageUrl, { headers });
    if (!response.ok) {
      throw new Error(`Failed to fetch image, ${response.status}.`);
    }
    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);
    return imgUrl;
  } catch (error) {
    console.error('❌ Error ~[getCharacterImage]~ ', error);
  }
}

export async function getCharacterDetails(id) {
  const path = `/characters/${id}`;
  try {
    const data = await getInfoByPath(path);
    return data;
  } catch (error) {
    console.error(`❌ Error ~[getCharacterDetails]~ `, error);
  }
}

export async function getCharacterRelatedPersons(id) {
  const path = `/characters/${id}/persons`;
  try {
    const data = await getInfoByPath(path);
    return data;
  } catch (error) {
    console.error(`❌ Error ~[getCharacterRelatedPersons]~ `, error);
  }
}

export async function getCharacterRelatedSubjects(id) {
  const path = `/characters/${id}/subjects`;
  try {
    const data = await getInfoByPath(path);
    return data;
  } catch (error) {
    console.error(`❌ Error ~[getCharacterRelatedSubjects]~ `, error);
  }
}
