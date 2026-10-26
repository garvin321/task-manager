import type { Task } from "@/types";

const globalForTasks = globalThis as unknown as { tasks?: Task[] };

export const tasks: Task[] = globalForTasks.tasks ?? [];
globalForTasks.tasks = tasks;