
const localTheme = localStorage.getItem('theme')
if (localTheme === 'dark' || (!localTheme && window.matchMedia('((prefers-color-scheme: dark))'))) {
  document.documentElement.classList.add('dark')
}