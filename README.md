# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Timetable Frontend

This is the frontend for the Automated Timetable Scheduling System, built with **React** and **Vite**.

## Features

- **Manage Data**: Add Faculties, Courses, and Rooms.
- **Generate Timetable**: Create a schedule based on the input data.
- **View Timetable**: Visualize the generated schedule in a grid format.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Project Structure

- `src/components`: Reusable UI components (Forms, Grid).
- `src/context`: Global state management (`AppContext`).
- `src/App.jsx`: Main application layout and routing.
your project.
