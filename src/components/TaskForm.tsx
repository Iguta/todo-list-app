import { useId, useState } from 'react';
import type { FormEvent } from 'react';

export interface TaskFormProps {
  onSubmit: (task: { title: string; description?: string }) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const titleId = useId();
  const descId = useId();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
  }

  return (
    <form onSubmit={handleSubmit} className="task-form" aria-labelledby="add-task-heading">
      <h2 id="add-task-heading" className="sr-only">Add a new task</h2>
      <div className="form-row">
        <label htmlFor={titleId} className="sr-only">Title</label>
        <input
          id={titleId}
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      <div className="form-row">
        <label htmlFor={descId} className="sr-only">Description</label>
        <input
          id={descId}
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="btn primary">Add Task</button>
    </form>
  );
}
