"use client";

import { useEffect, useState } from "react";
import type { Task } from "@/types";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";

type Filter = "all" | "active" | "done";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "done", label: "Done" },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to load tasks");
      setTasks((await res.json()) as Task[]);
      setError("");
    } catch {
      setError("Failed to load tasks");
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask(title: string) {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error("Failed to add task");
      const newTask = (await res.json()) as Task;
      setTasks([...tasks, newTask]);
      setError("");
    } catch {
      setError("Failed to add task");
    }
  }

  async function toggleTask(id: number) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  try {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !task.done }),
    });
    if (!res.ok) throw new Error("Failed to update task");
    const updated = (await res.json()) as Task;
    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
    setError("");
  } catch {
    setError("Failed to update task");
    loadTasks();
  }
}

  async function deleteTask(id: number) {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete task");
      setTasks(tasks.filter((t) => t.id !== id));
      setError("");
    } catch {
      setError("Failed to delete task");
    }
  }

  const visibleTasks = tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const doneCount = tasks.filter((t) => t.done).length;
  const progress =
    tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100);

  const emptyMessage =
    tasks.length === 0
      ? "No tasks yet. Add your first one above!"
      : "No tasks in this filter.";

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-lg">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Task Manager</h1>
          <p className="mt-1 text-sm text-slate-500">
            {doneCount} of {tasks.length} tasks completed
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <TaskForm onAdd={addTask} />

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="mb-4 inline-flex rounded-lg bg-slate-100 p-1">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={
                  filter === f.key
                    ? "rounded-md bg-white px-4 py-1.5 text-sm font-medium text-indigo-600 shadow-sm"
                    : "rounded-md px-4 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-900"
                }
              >
                {f.label}
              </button>
            ))}
          </div>

          {visibleTasks.length === 0 && (
            <p className="py-8 text-center text-sm text-slate-400">
              {emptyMessage}
            </p>
          )}

          <ul className="space-y-2">
            {visibleTasks.map((t) => (
              <TaskItem
                key={t.id}
                task={t}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}