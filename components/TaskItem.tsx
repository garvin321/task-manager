import type { Task } from "@/types";

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-indigo-200 hover:shadow-md">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        className="h-5 w-5 cursor-pointer accent-indigo-600"
      />
      <div className="min-w-0 flex-1">
        <p
          className={
            task.done
              ? "truncate text-slate-400 line-through"
              : "truncate font-medium text-slate-800"
          }
        >
          {task.title}
        </p>
        <p className="text-xs text-slate-400">{task.createdAt}</p>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        className="rounded-md px-2 py-1 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
      >
        ✕
      </button>
    </li>
  );
}