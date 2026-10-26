import { NextResponse } from "next/server";
import { tasks } from "@/lib/store";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Context) {
  const { id } = await params;
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  const body = await request.json();
  if (typeof body.done !== "boolean") {
    return NextResponse.json(
      { error: "done must be a boolean" },
      { status: 400 }
    );
  }

  task.done = body.done;
  return NextResponse.json(task);
}

export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params;
  const index = tasks.findIndex((t) => t.id === Number(id));

  if (index === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  tasks.splice(index, 1);
  return new NextResponse(null, { status: 204 });
}