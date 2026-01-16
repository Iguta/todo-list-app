import type { SortOption } from '../types';

export interface ToolbarProps {
  count: number;
  sort: SortOption;
  onChangeSort: (sort: SortOption) => void;
}

export default function Toolbar({ count, sort, onChangeSort }: ToolbarProps) {
  return (
    <div className="toolbar" role="region" aria-label="Toolbar">
      <div className="summary">{count} task{count === 1 ? '' : 's'}</div>
      <label className="sort-label">
        Sort
        <select
          aria-label="Sort tasks"
          value={sort}
          onChange={(e) => onChangeSort(e.target.value as SortOption)}
        >
          <option value="created-desc">Newest first</option>
          <option value="created-asc">Oldest first</option>
          <option value="active">Active first</option>
          <option value="completed">Completed first</option>
        </select>
      </label>
    </div>
  );
}
