"use client";

import { useState } from "react";

type TaskFormProps = {
  onAdd: (title: string) => void;
};

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");

  function handleAdd() {
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle("");
  }

  return (
    <div className="mb-5 flex gap-2">
      <input
        className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd();
        }}
        placeholder="What needs to be done?"
      />
      <button
        className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700 active:scale-95"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}