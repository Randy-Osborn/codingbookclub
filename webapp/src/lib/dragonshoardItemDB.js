import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Open a connection to the dragonshoard database
export async function openDb() {
  const db = await open({
    filename: "./dragonshoard.db", // SQLite file in the root of webapp
    driver: sqlite3.Database,
  });
  await db.exec("PRAGMA foreign_keys = ON");
  return db;
}

// Create the items table if it doesn't exist
export async function initDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER, -- <--- This connects to users(id)
      item_index TEXT UNIQUE,
      name TEXT NOT NULL,
      category TEXT,
      rarity TEXT,
      cost_quantity INTEGER,
      cost_unit TEXT,
      weight REAL,
      data TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
}

// Add an item (store full JSON as string)
export async function addItem(item, userId) {
  const db = await openDb();
  await db.run(
    `INSERT OR REPLACE INTO items 
      (user_id, item_index, name, category, rarity, cost_quantity, cost_unit, weight, data, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
    [
      userId,
      item.index,
      item.name,
      item.equipment_category?.name || null,
      item.rarity?.name || null,
      item.cost?.quantity || null,
      item.cost?.unit || null,
      item.weight || null,
      JSON.stringify(item),
    ]
  );
}

// List all items
export async function listItems() {
  const db = await openDb();
  const rows = await db.all("SELECT * FROM items");
  // Parse the data JSON for each item
  return rows.map((row) => ({
    ...row,
    data: row.data ? JSON.parse(row.data) : null,
  }));
}

// Get a single item by index
export async function getItemByIndex(itemIndex) {
  const db = await openDb();
  const row = await db.get("SELECT * FROM items WHERE item_index = ?", [
    itemIndex,
  ]);
  return row ? { ...row, data: row.data ? JSON.parse(row.data) : null } : null;
}

// Delete an item by index
export async function deleteItem(itemIndex) {
  const db = await openDb();
  const result = await db.run("DELETE FROM items WHERE item_index = ?", [
    itemIndex,
  ]);
  return result.changes > 0;
}

// Clear all items
export async function clearItems() {
  const db = await openDb();
  await db.run("DELETE FROM items");
}

// List items for a specific user
export async function listItemsByUser(userId) {
  const db = await openDb();
  const rows = await db.all("SELECT * FROM items WHERE user_id = ?", [userId]);
  return rows.map((row) => ({
    ...row,
    data: row.data ? JSON.parse(row.data) : null,
  }));
}

// Update an existing item
export async function updateItem(item, userId) {
  const db = await openDb();
  await db.run(
    `UPDATE items SET
      name = ?,
      category = ?,
      rarity = ?,
      cost_quantity = ?,
      cost_unit = ?,
      weight = ?,
      data = ?,
      updated_at = CURRENT_TIMESTAMP
     WHERE item_index = ? AND user_id = ?`,
    [
      item.name,
      item.equipment_category?.name || null,
      item.rarity?.name || null,
      item.cost?.quantity || null,
      item.cost?.unit || null,
      item.weight || null,
      JSON.stringify(item),
      item.index,
      userId,
    ]
  );
}
