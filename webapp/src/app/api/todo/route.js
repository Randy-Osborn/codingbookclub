import { initDb, listTasks, addTask, deleteTask, clearTasks, toggleTask } from "@/lib/todoDb";

// Ensure DB exists
await initDb();

// GET all tasks
export async function GET() {
  const tasks = await listTasks();
  return Response.json(tasks);
}

// POST add a new task
export async function POST(request) {
  const { description } = await request.json();
  if (!description) {
    return Response.json({ error: "Description is required" }, { status: 400 });
  }
  await addTask(description);
  return Response.json({ message: "Task added" }, { status: 201 });
}

// PATCH mark task as complete
export async function PATCH(request) {
  const { id } = await request.json();
  if (!id) {
    return Response.json({ error: "ID is required" }, { status: 400 });
  }
  const success = await toggleTask(id);
  return Response.json({ success });
}

// DELETE single or all tasks
export async function DELETE(request) {
  const { id, all } = await request.json();
  if (all) {
    await clearTasks();
    return Response.json({ message: "All tasks deleted" });
  }
  if (!id) {
    return Response.json({ error: "ID is required" }, { status: 400 });
  }
  const success = await deleteTask(id);
  return Response.json({ success });
}
