"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
  done: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  function addTask() {
    if (!title.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: title.trim(), done: false }]);
    setTitle("");
  }

  function toggleTask(id: number) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="mb-4 text-2xl font-bold">Task Manager</h1>

      <div className="mb-4 flex gap-2">
        <input
          className="flex-1 rounded border p-2 text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
        />
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {tasks.length === 0 && <p>No tasks yet.</p>}

      <ul className="space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleTask(t.id)}
            />
            <span className={t.done ? "flex-1 line-through" : "flex-1"}>
              {t.title}
            </span>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}