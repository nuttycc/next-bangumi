import "./ui/globals.css";
import TopNav from "./ui/topnav";
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
export const metadata = {
  title: "Next Bangumi",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const code = `
    try {
      console.log('check theme.')
      if (
        (typeof localStorage !== 'undefined' && localStorage.theme === 'dark') ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (_) {}
  `;

  return (
    <html lang="zh-CN" className="">
      <body className="dark:bg-black dark:text-white">
        <script dangerouslySetInnerHTML={{ __html: code }} />
        <TopNav />
        <hr className="mb-2 opacity-30 grayscale-[50%]"></hr>
        <div className="mb-20 md:px-60">{children}</div>
      </body>
    </html>
  );
}
