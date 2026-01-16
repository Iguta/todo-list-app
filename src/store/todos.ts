import { useEffect, useMemo, useState } from 'react';
import type { SortOption, Task, TaskId } from '../types';

const STORAGE_KEY = 'todo-list-app/tasks';

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Task[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks: Task[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // ignore quota or serialization errors gracefully
  }
}

export function useTodos() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [sort, setSort] = useState<SortOption>('created-desc');

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function addTask(input: { title: string; description?: string }) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: input.title.trim(),
      description: input.description?.trim() || '',
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  function updateTask(id: TaskId, updates: Partial<Pick<Task, 'title' | 'description' | 'completed'>>) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }

  function removeTask(id: TaskId) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const sorted = useMemo(() => {
    const arr = [...tasks];
    switch (sort) {
      case 'created-asc':
        return arr.sort((a, b) => a.createdAt - b.createdAt);
      case 'completed':
        return arr.sort((a, b) => Number(a.completed) - Number(b.completed));
      case 'active':
        return arr.sort((a, b) => Number(b.completed) - Number(a.completed));
      case 'created-desc':
      default:
        return arr.sort((a, b) => b.createdAt - a.createdAt);
    }
  }, [tasks, sort]);

  return {
    tasks: sorted,
    rawTasks: tasks,
    sort,
    setSort,
    addTask,
    updateTask,
    removeTask,
  } as const;
}
