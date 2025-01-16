
import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <head>
          {/* You can add meta tags, title, links, etc. here */}
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>My Team App</title>
        </head>
        <body>
          <header className="bg-blue-800 text-white p-4 shadow-lg">
            <h1 className="text-2xl">My Team Page</h1>
          </header>
          <main>{children}</main>
          <footer className="bg-gray-800 text-white p-4 shadow-lg">
            <p className="text-center">© Keen & Able</p>
          </footer>
        </body>
      </html>
    </>
  );
}

