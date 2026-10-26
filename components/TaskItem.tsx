import type { Task } from "@/types";

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <div className="flex-1">
        <span className={task.done ? "line-through" : ""}>{task.title}</span>
        <p className="text-xs text-gray-500">{task.createdAt}</p>
      </div>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}