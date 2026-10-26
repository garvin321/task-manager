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
    <div className="mb-4 flex gap-2">
      <input
        className="flex-1 rounded border p-2 text-black"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
      />
      <button
        className="rounded bg-blue-600 px-4 py-2 text-white"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}