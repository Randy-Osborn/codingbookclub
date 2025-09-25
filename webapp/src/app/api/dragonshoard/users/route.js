import { listUsers, addUser, initUserDb } from "@/lib/dragonshoardUserDB";

export async function GET() {
  await initUserDb(); // Ensure table exists
  const users = await listUsers();
  return Response.json(users);
}

export async function POST(request) {
  await initUserDb(); // Ensure table exists
  const { name, userClass } = await request.json();
  await addUser(name, userClass);
  return Response.json({ message: "User added" }, { status: 201 });
}
