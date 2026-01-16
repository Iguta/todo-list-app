import { useState } from 'react';
import type { Task } from '../types';

export interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onUpdate: (id: string, updates: { title?: string; description?: string }) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  function save() {
    const newTitle = title.trim();
    const newDesc = description.trim();
    if (!newTitle) return;
    onUpdate(task.id, { title: newTitle, description: newDesc });
    setIsEditing(false);
  }

  function cancel() {
    setTitle(task.title);
    setDescription(task.description || '');
    setIsEditing(false);
  }

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`} aria-label={task.title}>
      <div className="task-main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => onToggle(task.id, e.target.checked)}
          aria-label={task.completed ? 'Mark as active' : 'Mark as completed'}
        />

        {!isEditing ? (
          <div className="task-content" onDoubleClick={() => setIsEditing(true)}>
            <div className="task-title">{task.title}</div>
            {task.description ? <div className="task-desc">{task.description}</div> : null}
          </div>
        ) : (
          <div className="task-edit">
            <input
              className="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label="Edit title"
            />
            <input
              className="edit-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-label="Edit description"
            />
          </div>
        )}
      </div>

      <div className="task-actions">
        {!isEditing ? (
          <>
            <button className="btn" onClick={() => setIsEditing(true)} aria-label="Edit task">Edit</button>
            <button
              className="btn danger"
              onClick={() => {
                // native confirm for simplicity; can be replaced by modal later
                if (confirm('Are you sure you want to delete this task?')) onDelete(task.id);
              }}
              aria-label="Delete task"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button className="btn" onClick={cancel}>Cancel</button>
            <button className="btn primary" onClick={save}>Save</button>
          </>
        )}
      </div>
    </li>
  );
}
