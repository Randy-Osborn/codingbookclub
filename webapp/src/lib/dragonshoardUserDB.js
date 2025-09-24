import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Open a connection to the dragonshoard database
export async function openDb() {
  return open({
    filename: "./dragonshoard.db",
    driver: sqlite3.Database,
  });
}

// Create the users table if it doesn't exist
export async function initUserDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      class TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// Add a user
export async function addUser(name, userClass) {
  const db = await openDb();
  await db.run(`INSERT INTO users (name, class) VALUES (?, ?)`, [
    name,
    userClass,
  ]);
}

// List all users
export async function listUsers() {
  const db = await openDb();
  return db.all("SELECT * FROM users");
}

// Get a user by ID
export async function getUserById(id) {
  const db = await openDb();
  return db.get("SELECT * FROM users WHERE id = ?", [id]);
}

// Delete a user by ID
export async function deleteUser(id) {
  const db = await openDb();
  const result = await db.run("DELETE FROM users WHERE id = ?", [id]);
  return result.changes > 0;
}
