import './ui/globals.css';
import TopNav from './ui/nav/TopNav';
import localFont from 'next/font/local';

const lxgw = localFont({
  src: './fonts/LXGWFasmartGothic.woff2',
  display: 'swap',
  variable: '--font-lxgw',
});

export const metadata = {
  title: {
    template: '%s | Next Bangumi',
  },
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" className={lxgw.className} suppressHydrationWarning>
      <body className="dark:bg-black dark:text-gray-300">
        <script
          id="switch-theme"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (typeof window !== 'undefined') {
                  console.log('Switch theme.');
                  if (
                    (typeof localStorage !== 'undefined' && localStorage.theme === 'dark') ||
                    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
                  ) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                }
              } catch (error) {
                console.error('Error switching theme:', error);
              }
            `,
          }}
        />
        <TopNav />
        <main className="relative top-14 md:mb-20 md:px-10 xl:px-60">
          {children}
        </main>

        <footer className="relative flex justify-center p-20 pb-10">
          <p>Powered by Next.JS</p>
        </footer>
      </body>
    </html>
  );
}
