import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Toolbar from '../components/Toolbar';
import { useTodos } from '../store/todos';

export default function Home() {
  const { tasks, sort, setSort, addTask, updateTask, removeTask } = useTodos();

  return (
    <div className="container">
      <header>
        <h1>Todo List</h1>
        <p className="subtitle">Manage your daily tasks quickly and easily.</p>
      </header>

      <TaskForm onSubmit={(t) => addTask(t)} />

      <Toolbar count={tasks.length} sort={sort} onChangeSort={setSort} />

      <TaskList
        tasks={tasks}
        onToggle={(id, completed) => updateTask(id, { completed })}
        onUpdate={(id, updates) => updateTask(id, updates)}
        onDelete={(id) => removeTask(id)}
      />
    </div>
  );
}
