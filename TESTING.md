# Testing Strategy

This project uses Vitest and React Testing Library to validate Must-Have features from the PRD.

## Setup
- Test environment: jsdom (via Vitest)
- Global matchers: @testing-library/jest-dom/vitest
- Command: npm test

## Requirement-to-Test Mapping
- M1 Add Task
  - Test file: src/__tests__/todo.spec.tsx ("M1: Add Task - task appears in list")
  - Validates: entering a title & description and clicking Add shows the task in the list.
- M2 Edit Task
  - Test file: src/__tests__/todo.spec.tsx ("M2: Edit Task - modify title and description")
  - Validates: clicking Edit enables editing, Save persists updates.
- M3 Delete Task
  - Test file: src/__tests__/todo.spec.tsx ("M3: Delete Task - removes after confirmation")
  - Validates: clicking Delete removes the task after user confirmation.
- M4 View Tasks
  - Test file: src/__tests__/todo.spec.tsx
  - Validates: list renders tasks; empty state shows message when no tasks.
- M5 Mark Task as Complete
  - Test file: src/__tests__/todo.spec.tsx ("M4 + M5: View and Mark Complete")
  - Validates: toggling checkbox marks item completed with visual state.

## Notes
- Local storage is cleared before each test for isolation.
- Optional sorting (C1) is covered by UI but not unit-tested as it is a Could-Have.
