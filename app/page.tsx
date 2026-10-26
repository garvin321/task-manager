  "use client";

  import { useState } from "react";
  import type { Task } from "@/types";
  import TaskForm from "@/components/TaskForm";
  import TaskItem from "@/components/TaskItem";

  export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<"all" | "active" | "done">("all");

    function addTask(title: string) {
      const now = new Date();
      setTasks([
        ...tasks,
        {
          id: now.getTime(),
          title,
          done: false,
          createdAt: now.toLocaleString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }

    function toggleTask(id: number) {
      setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    }

    function deleteTask(id: number) {
      setTasks(tasks.filter((t) => t.id !== id));
    }

    const visibleTasks = tasks.filter((t) => {
      if (filter === "active") return !t.done;
      if (filter === "done") return t.done;
      return true;
    });

    return (
      <main className="mx-auto max-w-md p-8">
        <h1 className="mb-4 text-2xl font-bold">Task Manager</h1>

        <TaskForm onAdd={addTask} />

        <div className="mb-4 flex gap-2">
          <button
            className={filter === "all" ? "font-bold underline" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "active" ? "font-bold underline" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={filter === "done" ? "font-bold underline" : ""}
            onClick={() => setFilter("done")}
          >
            Done
          </button>
        </div>

        {visibleTasks.length === 0 && <p>No tasks yet.</p>}

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
      </main>
    );
  }