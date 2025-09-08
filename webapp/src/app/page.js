"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to /login if not signed in
  useEffect(() => {
    if (status === "loading") return; // wait for session check
    if (!session) router.replace("/login");
  }, [session, status]);

  if (!session) return null; // prevent flicker

  // Projects list
  const projects = [
    { name: "ToDo App", path: "/todo" },
    { name: "Tic Tac Toe", path: "/tictactoe" },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold">Welcome, {session.user.name}!</h1>
      <p className="text-gray-500 dark:text-gray-300 text-center">
        A showcase of small weekly projects.
      </p>

      <ul className="space-y-2">
        {projects.map((project, idx) => (
          <li key={idx}>
            <Link
              href={project.path}
              className="text-blue-600 hover:underline"
            >
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

