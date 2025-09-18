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
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <header className="p-6 bg-[var(--header-bg)] flex justify-between items-center shadow-md">
        <Link
          href="/"
          className="text-3xl font-bold hover:text-[var(--accent-hover)] transition-colors"
        >
          Coding Book Club
        </Link>
        {session && (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 text-lg text-white rounded-lg hover:text-[var(--accent-hover)] transition-colors"
          >
            Logout
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 w-full h-full">{children}</main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Coding Book Club
      </footer>
    </div>
  );
}
