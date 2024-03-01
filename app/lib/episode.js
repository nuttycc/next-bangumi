import { getInfoByPath } from './utils';

export async function getEpisodes(
  subject_id,
  limit = 100,
  offset = 0,
  type = 0,
) {
  try {
    const path = `/episodes?subject_id=${subject_id}&limit=${limit}&offset=${offset}&type=${type}`;
    const data = await getInfoByPath(path);
    return data;
  } catch (error) {
    console.error(`Error getting episodes: ${error}`);
    return null;
  }
}

export async function getEpisodeDetails(episode_id) {
  try {
    const path = `/episodes/${episode_id}`;
    const data = await getInfoByPath(path);
    return data;
  } catch (error) {
    console.error(`Error getting episode details: ${error}`);
    return null;
  }
}
