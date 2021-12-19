import { Head, BlitzLayout } from 'blitz';
import Navbar from '../components/Navbar';

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'horizons-website'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="block min-h-screen min-w-screen font-body dark:bg-gray-800 dark:text-white">
        <Navbar />
        <div className="p-2">{children}</div>
        {/* <footer>
          <a
            href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Blitz.js
          </a>
        </footer> */}
      </main>
    </>
  );
};

export default Layout;
