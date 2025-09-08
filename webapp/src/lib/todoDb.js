import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Open a connection to the database
export async function openDb() {
  return open({
    filename: "./todo.db", // SQLite file in the root of webapp
    driver: sqlite3.Database,
  });
}

// Create the table if it doesn't exist
export async function initDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT 0
    )
  `);
}

// Add a task
export async function addTask(description) {
  const db = await openDb();
  await db.run("INSERT INTO tasks (description) VALUES (?)", [description]);
}

// List all tasks
export async function listTasks() {
  const db = await openDb();
  return db.all("SELECT * FROM tasks");
}

// Toggle a task's completed status
export async function toggleTask(id) {
  const db = await openDb();
  const result = await db.run(
    "UPDATE tasks SET completed = NOT completed WHERE id = ?",
    [id]
  );
  return result.changes > 0;
}

// Delete a task
export async function deleteTask(id) {
  const db = await openDb();
  const result = await db.run("DELETE FROM tasks WHERE id = ?", [id]);
  return result.changes > 0;
}

// Clear all tasks
export async function clearTasks() {
  const db = await openDb();
  await db.run("DELETE FROM tasks");
}
