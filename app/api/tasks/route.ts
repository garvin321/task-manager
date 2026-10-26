import { NextResponse } from "next/server";
import type { Task } from "@/types";
import { tasks } from "@/lib/store";

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  const title = typeof body.title === "string" ? body.title.trim() : "";

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const now = new Date();
  const task: Task = {
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
  };

  tasks.push(task);
  return NextResponse.json(task, { status: 201 });
}