import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Coding Book Club",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        <header className="p-6 bg-gray-200 dark:bg-gray-800 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Coding Book Club</h1>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Home
          </Link>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}



