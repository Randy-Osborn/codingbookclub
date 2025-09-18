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
    { name: "ToDo App", path: "/todo", description: "A task manager built with React." },
    { name: "Tic Tac Toe", path: "/tictactoe", description: "A fun two-player game." },
    { name: "DragonsHoard Treasure Generator", path: "/dragonshoard", description: "Generate random treasure for your RPG adventures." },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl  font-bold mb-2">Welcome, {session.user.name}!</h1>
        <p className="text-gray-500 dark:text-gray-300">
          A showcase of small weekly projects.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <Link
            key={idx}
            href={project.path}
            className="block bg-[var(--card-bg)] p-6 rounded-xl shadow-md hover:shadow-lg  hover:scale-[1.02] transition-transform"
          >
            <h2 className="text-xl font-semibold mb-2 text-[var(--foreground)]">
              {project.name}
            </h2>
            <p className="text-gray-400 text-sm ">{project.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

