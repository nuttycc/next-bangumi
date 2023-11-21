import { getInfoByPath } from "./utils";

// 0 = 本篇
// 1 = 特别篇
// 2 = OP
// 3 = ED
// 4 = 预告 / 宣传 / 广告
// 5 = MAD
// 6 = 其他

export async function getEpisodes(
  subject_id,
  limit = 100,
  offset = 0,
  type = 0,
) {
  const path = `/episodes?subject_id=${subject_id}&limit=${limit}&offset=${offset}&type=${type}`;
  const data = await getInfoByPath(path);
  return data;
}

export async function getEpisodeDetails(episode_id) {
  const path = `/episodes/${episode_id}`;
  const data = await getInfoByPath(path);
  return data;
}
