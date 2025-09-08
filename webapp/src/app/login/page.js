"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect to homepage if already logged in
  useEffect(() => {
    if (session) router.replace("/");
  }, [session]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Sign in to Coding Book Club</h1>
      <button
        onClick={() => signIn("github", { callbackUrl: "/" })}
        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
