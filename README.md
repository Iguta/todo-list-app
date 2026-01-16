# Todo List Web Application

## Overview
A simple, responsive, and accessible Todo List web application for managing daily tasks. Built with React, TypeScript, and Vite. No authentication or backend; data is stored locally in the browser.

## Features
Mapped to PRD requirements:
- Add Task (M): Create a task with title and description.
- Edit Task (M): Update a task’s title and description.
- Delete Task (M): Remove a task with confirmation.
- View Tasks (M): View tasks in a list.
- Mark Task as Complete (M): Toggle completion with visual indication.
- Responsiveness (S): Works on mobile, tablet, and desktop.
- UI/UX Design (S): Clean, accessible UI with keyboard navigation.
- Task Sorting (C): Optional sorting by completion status.
- Won’t Have (W): No auth, no database integration.

## Tech Stack
- React + TypeScript
- Vite
- CSS Modules (or basic CSS) with accessible-first patterns
- Vitest + React Testing Library (for unit tests)

## Getting Started
1. Install dependencies:
   npm install
2. Run the development server:
   npm run dev
3. Build for production:
   npm run build
4. Preview production build:
   npm run preview
5. Run tests:
   npm test

## Scripts
- dev: Start Vite dev server
- build: Build production assets
- preview: Preview production build
- test: Run unit tests

## PRD Traceability
Requirement ID → Key files/components
- M1 Add Task → src/components/TaskForm.tsx, src/store/todos.ts
- M2 Edit Task → src/components/TaskItem.tsx (inline edit), src/store/todos.ts
- M3 Delete Task → src/components/TaskItem.tsx (delete with confirm), src/store/todos.ts
- M4 View Tasks → src/components/TaskList.tsx, src/pages/Home.tsx
- M5 Mark Complete → src/components/TaskItem.tsx (checkbox), src/store/todos.ts
- S1 Responsiveness → src/App.css, component-level styles
- S2 UI/UX Design → semantic HTML, aria-* attributes, focus states
- C1 Task Sorting → src/components/Toolbar.tsx, src/store/selectors.ts

## Deployment
- Designed to deploy on Vercel. Output directory: dist/

## Data Persistence
- Tasks are stored in localStorage to keep the app stateless and simple.
