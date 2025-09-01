# =======================================
# To-Do List Database Handler (SQLite)
# =======================================

import sqlite3

DB_NAME = "todo.db"

# ---------------------------------------
# Database Initialization
# ---------------------------------------
def init_db():
    """Create the tasks table if it doesn't exist."""
    connection = sqlite3.connect(DB_NAME)
    cursor = connection.cursor()
    cursor.execute("""  CREATE TABLE IF NOT EXISTS tasks(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT 0
        )""")
    
    connection.commit()
    connection.close()
    

# ---------------------------------------
# Create
# ---------------------------------------
def add_task(description):
    """Insert a new task into the database."""
    connection = sqlite3.connect(DB_NAME)
    cursor = connection.cursor()
    cursor.execute("INSERT INTO tasks (description) VALUES (?)",
                   (description,)               
                   )
    connection.commit()
    connection.close()
    


# ---------------------------------------
# Read
# ---------------------------------------
def list_tasks():
    """Return all tasks as a list of tuples (id, description, completed)."""
    connection = sqlite3.connect(DB_NAME)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM tasks")           
    tasks = cursor.fetchall()
    connection.close()
    return tasks


# ---------------------------------------
# Update
# ---------------------------------------
def complete_task(task_id):
    """Mark a task as completed. Returns True if successful, False if task not found."""
    connection = sqlite3.connect(DB_NAME)
    cursor = connection.cursor()
    cursor.execute("UPDATE tasks SET completed = 1 WHERE id = ?",
                   (task_id,)               
                   )
    connection.commit()
    success = cursor.rowcount > 0
    connection.close()
    return success


# ---------------------------------------
# Delete
# ---------------------------------------
def delete_task(task_id):
    """Delete a task by its ID."""
    connection = sqlite3.connect(DB_NAME)
    cursor = connection.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = ?",
                   (task_id,)               
                   )
    connection.commit()
    success = cursor.rowcount > 0
    connection.close()
    return success
    


# ---------------------------------------
# Optional: Clear all tasks
# ---------------------------------------
def clear_tasks():
    """Delete all tasks from the database."""
    connection = sqlite3.connect(DB_NAME)
    cursor = connection.cursor()
    cursor.execute("DELETE FROM tasks")
    connection.commit()
    connection.close()


# ---------------------------------------
# Demo (run file directly)
# ---------------------------------------
if __name__ == "__main__":
    # 1. Initialize the database
    init_db()
    print("Database initialized.\n")

    # 2. Clear any existing tasks (optional)
    clear_tasks()
    print("Cleared any existing tasks.\n")

    # 3. Add some tasks
    add_task("Buy groceries")
    add_task("Walk the dog")
    add_task("Finish homework")
    print("Added 3 tasks.\n")

    # 4. List all tasks
    print("Listing tasks:")
    tasks = list_tasks()
    for task in tasks:
        print(f"ID: {task[0]}, Description: {task[1]}, Completed: {bool(task[2])}")
    print()

    # 5. Complete a task
    success = complete_task(1)
    print(f"Task 1 completed? {success}\n")

    # 6. List all tasks again to see the update
    print("Listing tasks after completing task 1:")
    tasks = list_tasks()
    for task in tasks:
        print(f"ID: {task[0]}, Description: {task[1]}, Completed: {bool(task[2])}")
    print()

    # 7. Delete a task
    success = delete_task(2)
    print(f"Task 2 deleted? {success}\n")

    # 8. List all tasks after deletion
    print("Listing tasks after deleting task 2:")
    tasks = list_tasks()
    for task in tasks:
        print(f"ID: {task[0]}, Description: {task[1]}, Completed: {bool(task[2])}")
    print()

    # 9. Clear all tasks
    clear_tasks()
    print("All tasks cleared.\n")

    # 10. Verify tasks table is empty
    tasks = list_tasks()
    print("Listing tasks after clearing:")
    print(tasks)  # Should be empty list
