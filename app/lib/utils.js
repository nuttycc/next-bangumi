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
