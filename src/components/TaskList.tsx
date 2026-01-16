import type { Task } from '../types';
import TaskItem from './TaskItem';

export interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onUpdate: (id: string, updates: { title?: string; description?: string }) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onToggle, onUpdate, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p role="status" aria-live="polite">No tasks yet. Add your first task above.</p>;
  }

  return (
    <ul className="task-list" aria-label="Task list">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}
