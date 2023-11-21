import API_ENDPOINT from "./api";

export function getOSTheme() {
  // 检查浏览器是否支持prefers-color-scheme媒体查询
  if (window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  } else {
    console.log("浏览器不支持prefers-color-scheme媒体查询。");
  }
}

export async function getInfoByPath(path) {
  const headers = new Headers({
    "User-Agent":
      "nuttycc/next-bangumi/1.0 (https://github.com/nuttycc/next-bangumi)",
  });
  const url = `${API_ENDPOINT}${path}`;
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`Failed to get: ${res.status}, ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error in get info:", error.message);
    throw error;
  }
}
