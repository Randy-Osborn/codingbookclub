"use client";
import { useState, useEffect } from "react";

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/todo");
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });

    // Refresh task list
    const res = await fetch("/api/todo");
    const data = await res.json();
    setTasks(data);
    setDescription("");
  };

  // Toggle complete
  const toggleComplete = async (id) => {
    await fetch("/api/todo", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const res = await fetch("/api/todo");
    const data = await res.json();
    setTasks(data);
  };

  // Delete one task
  const deleteTask = async (id) => {
    await fetch("/api/todo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const res = await fetch("/api/todo");
    const data = await res.json();
    setTasks(data);
  };

  // Clear all tasks
  const clearAll = async () => {
    if (!confirm("Are you sure you want to delete all tasks?")) return;

    await fetch("/api/todo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ all: true }),
    });

    setTasks([]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Task description"
          className="flex-1 border rounded p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      {/* Task List */}
      {tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between border p-3 rounded"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <span
                  className={`${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.description}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
          <button
            onClick={clearAll}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mt-4"
          >
            Clear All
          </button>
        </div>
      ) : (
        <p className="text-gray-500">No tasks yet.</p>
      )}
    </div>
  );
}
