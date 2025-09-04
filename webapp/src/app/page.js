import Link from "next/link";

export default function HomePage() {
  const projects = [
    { name: "ToDo App", path: "/todo" },
    { name: "Tic Tac Toe", path: "/tictactoe" },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h2 className="text-3xl font-bold">Welcome!</h2>
      <p className="text-gray-500 dark:text-gray-300">
        A weekly showcase of small projects.
      </p>
      <ul className="space-y-2">
        {projects.map((project, idx) => (
          <li key={idx}>
            <Link href={project.path} className="text-blue-600 hover:underline">
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
