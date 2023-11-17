import API_ENDPOINT from "./api";

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
  const url =
    API_ENDPOINT +
    `/episodes?subject_id=${subject_id}&limit=${limit}&offset=${offset}&type=${type}`;
  const res = await fetch(url);
  console.log("🚀🚀 ~ getEpisodes ~ res: ");
  if (!res) {
    throw new Error("Faild to fetch Episodes.");
  }
  return res.json();
}

export async function getEpisodeDetails(episode_id) {
  const url = API_ENDPOINT + "/episodes" + episode_id;
  const res = await fetch(url);
  if (!res) {
    throw new Error("Faild to fetch Episode Details.");
  }
  return res.json();
}
