import "./globals.css";

export const metadata = {
  title: "Coding Book Club",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        <header className="p-6 bg-gray-200 dark:bg-gray-800">
          <h1 className="text-2xl font-bold">Coding Book Club</h1>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}

