"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <HeaderAndContent>{children}</HeaderAndContent>
    </SessionProvider>
  );
}

// This is just a local component inside the same file
function HeaderAndContent({ children }) {
  const { data: session } = useSession(); // ✅ safe here

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <header className="p-6 bg-gray-200 dark:bg-gray-800 flex items-center justify-between shadow-md">
        <h1 className="text-3xl font-bold">Coding Book Club</h1>
        <nav className="flex gap-4">
          <Link
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Home
          </Link>

          {session && (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">{children}</main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Coding Book Club
      </footer>
    </div>
  );
}
