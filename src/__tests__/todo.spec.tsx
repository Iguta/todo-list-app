import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../pages/Home';

beforeEach(() => {
  localStorage.clear();
});

test('M1: Add Task - task appears in list', async () => {
  render(<Home />);
  const user = userEvent.setup();

  const [titleInput, descInput] = screen.getAllByRole('textbox');
  await user.type(titleInput, 'Buy milk');
  await user.type(descInput, '2% lactose free');
  await user.click(screen.getByRole('button', { name: /add task/i }));

  expect(screen.getByRole('list')).toBeInTheDocument();
  expect(screen.getByText('Buy milk')).toBeInTheDocument();
  expect(screen.getByText('2% lactose free')).toBeInTheDocument();
});

test('M2: Edit Task - modify title and description', async () => {
  render(<Home />);
  const user = userEvent.setup();

  // Add initial task
  const [titleInput, descInput] = screen.getAllByRole('textbox');
  await user.type(titleInput, 'Walk dog');
  await user.type(descInput, 'Evening walk');
  await user.click(screen.getByRole('button', { name: /add task/i }));

  // Edit
  const item = screen.getByRole('listitem');
  const editBtn = within(item).getByRole('button', { name: /edit task/i });
  await user.click(editBtn);

  const [editTitle, editDesc] = within(item).getAllByRole('textbox');
  await user.clear(editTitle);
  await user.type(editTitle, 'Walk dog (park)');
  await user.clear(editDesc);
  await user.type(editDesc, 'Bring water');
  await user.click(within(item).getByRole('button', { name: /save/i }));

  expect(screen.getByText('Walk dog (park)')).toBeInTheDocument();
  expect(screen.getByText('Bring water')).toBeInTheDocument();
});

test('M3: Delete Task - removes after confirmation', async () => {
  render(<Home />);
  const user = userEvent.setup();

  const [titleInput] = screen.getAllByRole('textbox');
  await user.type(titleInput, 'Task to delete');
  await user.click(screen.getByRole('button', { name: /add task/i }));

  // Intercept confirm to auto-accept
  const originalConfirm = window.confirm;
  window.confirm = () => true;

  const item = screen.getByRole('listitem');
  await user.click(within(item).getByRole('button', { name: /delete task/i }));

  expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();

  window.confirm = originalConfirm;
});

test('M4 + M5: View and Mark Complete', async () => {
  render(<Home />);
  const user = userEvent.setup();

  const [titleInput] = screen.getAllByRole('textbox');
  await user.type(titleInput, 'Toggle me');
  await user.click(screen.getByRole('button', { name: /add task/i }));

  const item = screen.getByRole('listitem');
  const checkbox = within(item).getByRole('checkbox');
  // Initially unchecked
  expect(checkbox).not.toBeChecked();

  await user.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(item).toHaveClass('completed');
});
