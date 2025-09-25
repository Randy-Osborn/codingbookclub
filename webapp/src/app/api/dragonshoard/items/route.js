import {
  listItems,
  listItemsByUser,
  addItem,
  initDb,
} from "@/lib/dragonshoardItemDB";

export async function GET(request) {
  await initDb(); // Ensure table exists
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  let items;
  if (userId) {
    items = await listItemsByUser(userId);
  } else {
    items = await listItems();
  }
  return Response.json(items);
}

export async function POST(request) {
  await initDb(); // Ensure table exists
  const { item, userId } = await request.json();
  await addItem(item, userId);
  return Response.json({ message: "Item added" }, { status: 201 });
}
