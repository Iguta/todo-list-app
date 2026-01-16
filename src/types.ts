export type TaskId = string;

export interface Task {
  id: TaskId;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
}

export type SortOption = 'created-desc' | 'created-asc' | 'completed' | 'active';
