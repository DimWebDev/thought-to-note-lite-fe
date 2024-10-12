# Thought-to-Note Lite Frontend 

## Overview

**Thought-to-Note Lite** is a React-based web application for managing notes. It interacts with a backend Java API using a RESTful approach to perform CRUD (Create, Read, Update, Delete) operations. The frontend is built with TypeScript, React, and Material-UI, emphasizing a clean and responsive user interface. 

This application works by communicating with a backend Java API to trigger these CRUD operations, ensuring all data management happens seamlessly between the frontend and the server. For more information on the specific endpoints, refer to the [***Backend Micro-service***](https://github.com/DimWebDev/thought-to-note-lite-be/tree/develop).

>[INFO]
> For a complete understanding of the Thought-to-Note Lite application, which includes both the frontend and backend services, please see the [Central Documentation](https://github.com/DimWebDev/Thought-to-Note-Lite---Central-Documentation). The central guide provides in-depth details about the system architecture, integration, setup, and testing strategies. To explore the backend API that powers this frontend client, refer to the [Backend Repository](https://github.com/DimWebDev/thought-to-note-lite-be/tree/develop). 


## Table of Contents

1. [Quickstart Guide](#quickstart-guide)
2. [Core Technologies](#core-technologies)
3. [Project Structure](#project-structure)
4. [Key Components](#key-components)
5. [State Management](#state-management)
6. [UI Components](#ui-components)
7. [Styling and Theming](#styling-and-theming)
8. [Error Handling and User Feedback](#error-handling-and-user-feedback)
9. [Authentication](#authentication)
10. [Running the Project](#running-the-project)
11. [Testing](#testing)
12. [Running Tests](#running-tests)
13. [API Documentation](#api-documentation)

## Quickstart Guide

To quickly get started with Thought-to-Note Lite:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd thought-to-note-lite
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Application**:
   ```bash
   npm start
   ```
4. **Access the App**:
   - Open your browser and navigate to `http://localhost:3000`.


## Core Technologies

- **React**: For building the user interface.
- **TypeScript**: For static type checking and improved code quality.
- **Material-UI**: For pre-styled UI components.
- **Emotion**: For styling using CSS-in-JS.

> [!IMPORTANT]
> To work with the Thought-to-Note Lite repository, ensure Node.js version 18.12.1 is installed, as this version was used during local development and guarantees compatibility with the project’s dependencies. The necessary React versions (`react` and `react-dom`, both at `^18.3.1`) are already specified and will be installed automatically when running `npm install`. These steps ensure smooth setup and compatibility for anyone cloning and running the project.

## Project Structure

The codebase is organized to ensure separation of concerns and maintainability. Below is a high-level directory structure:

```
src/
├── api/
│   └── api.ts                # Centralized API calls
├── components/
│   ├── notes/
│   │   ├── Note.tsx          # Individual Note component
│   │   ├── NoteList.tsx      # List of Notes component
│   │   ├── NoteForm.tsx      # Form for creating/editing notes
│   │   └── index.ts          # Exports for Note components
│   └── shared/
│       ├── Button.tsx        # Shared Button component
│       ├── TextField.tsx     # Shared TextField component
│       └── StyledCard.tsx    # Styled card for notes
├── hooks/
│   └── useNotes.ts           # Custom hook for notes CRUD operations
├── interfaces/
│   └── types.ts              # TypeScript interfaces for types
├── theme/
│   └── theme.ts              # Theme definitions for styling
├── App.tsx                   # Main application component
└── index.tsx                 # Entry point for the React application
```

## Key Components

### 1. **App.tsx**

- The root component of the application. It manages global state and coordinates interactions between other components and the backend API.

### 2. **Components (src/components/notes)**

- **Note.tsx**: Displays an individual note, providing options for editing and deletion.
- **NoteList.tsx**: Renders a list of notes using the `notes` state. It receives notes data from the `useNotes` hook.
- **NoteForm.tsx**: Contains a form to create or edit notes, using `useNotes` to handle CRUD operations.

### 3. **Custom Hook (src/hooks/useNotes.ts)**

- A custom hook that manages the fetching, creating, updating, and deleting of notes.

### 4. **API Utility (src/api/api.ts)**

- Provides functions for interacting with the backend API, such as `fetchNotes`, `createNote`, `updateNote`, and `deleteNote`.

### 5. **TypeScript Interfaces (src/interfaces/types.ts)**

- Defines types such as `NoteType` and `NewNoteType` to ensure type safety across the application.

### 6. **Theme (src/theme/theme.ts)**

- Defines the application's theme to ensure consistent styling.

## State Management

### Custom Hook: `useNotes`

The `useNotes` hook is responsible for managing note-related state and interacting with the backend API.

- **State Variables**:

  - `notes`: Holds an array of `NoteType` objects.
  - `loading`: Indicates whether the application is fetching data.
  - `error`: Stores any errors that occur during API operations.

- **Functions**:

  - `getNotes`: Fetches all notes.
  - `addNote`: Adds a new note.
  - `editNote`: Updates an existing note.
  - `removeNote`: Deletes a note.

## UI Components

### NoteList.tsx

- **Purpose**: Displays a list of all notes.
- **Props**:
  - `notes`: Array of `NoteType`.
  - `editNote`: Callback to update a note.
  - `deleteNote`: Callback to delete a note.

### NoteForm.tsx

- **Purpose**: Form for creating or editing notes.
- **State**:
  - `title`: Title input field state.
  - `content`: Content input field state.
- **Props**:
  - `addNote`: Callback to add a new note.

### Note.tsx

- **Purpose**: Represents an individual note.
- **Props**:
  - `id`, `title`, `content`: Note properties.
  - `editNote`: Callback for editing.
  - `deleteNote`: Callback for deleting.

## Styling and Theming

The application uses Material-UI and Emotion for styling.

- **Theme File (`theme.ts`)**: Defines colors, spacing, and typography used throughout the application.
- **Styled Components**: `StyledCard.tsx` and other shared components use Emotion to create consistent styles.

## Error Handling and User Feedback

- **Error States**: Managed through the `useNotes` hook. Errors are displayed in the UI to notify the user.
- **Loading States**: The `loading` state ensures that users see a "Loading..." message while data is being fetched.

## Authentication

API requests include Basic Authentication using the `Authorization` header:

```typescript
headers: {
  'Authorization': 'Basic ' + btoa('yourUsername:yourPassword'),
  'Content-Type': 'application/json',
}
```

This approach secures API calls and is handled centrally in `api.ts`.

## Running the Project

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```
2. The application will be available at `http://localhost:3000`.

## Testing

### Testing Approach

The testing strategy for **Thought-to-Note Lite** focuses on:

- **Unit Testing**: Ensuring individual components and hooks function correctly in isolation.

### Tools and Libraries

- **Jest**: For unit testing and assertions.
- **React Testing Library**: For simulating user interactions.
- **User Event**: For realistic user action simulations.

### Writing Unit Tests

- Tests are written for each component and custom hook.
- API calls are mocked using Jest to ensure isolation from the backend.

## Running Tests

- To run all tests:
  ```bash
  npm test
  ```
- To run all tests once, without watch mode:
  ```bash
  npm test -- --watchAll=false
  ```
- To run all tests and view code coverage in the terminal, use the following command:
  ```bash
  npm test -- --coverage --watchAll=false
  ```
  **Explanation:**
  - `--coverage`: Generates a coverage report.
  - `--watchAll=false`: Runs all tests (not just changed files) and disables watch mode.
    **Output:**
    You'll see coverage details like:
  ```bash
  -----------------|---------|----------|---------|---------|-------------------
  File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
  -----------------|---------|----------|---------|---------|-------------------
  All files        |    85.5 |     70.6 |    80.0 |    85.0 |                   
  -----------------|---------|----------|---------|---------|-------------------
  ```
  An HTML report will also be generated in the `coverage/` folder for detailed analysis.

### Example: Mocking API Calls

API calls are mocked to ensure the frontend is tested in isolation from backend services, while at the same time they are mimicking the real call:

```typescript
jest.mock('../api/api');
(api.fetchNotes as jest.Mock).mockResolvedValue(mockNotes);
```

## API Documentation

The Thought-to-Note Lite frontend interacts with a backend Java API to perform CRUD operations on notes. Below are the endpoints used by the application:

### 1. Fetch Notes
- **Endpoint**: `GET /api/notes`
- **Description**: Retrieves all notes from the backend.
- **Headers**: 
  - `Authorization`: Basic authentication using username and password.
  - `Content-Type`: `application/json`
- **Response**: Returns an array of `NoteType` objects.

### 2. Create Note
- **Endpoint**: `POST /api/notes`
- **Description**: Creates a new note in the backend.
- **Headers**:
  - `Authorization`: Basic authentication using username and password.
  - `Content-Type`: `application/json`
- **Body**: JSON object of type `NewNoteType` containing `title` and `content`.
- **Response**: Returns the created note of type `NoteType`.

### 3. Update Note
- **Endpoint**: `PUT /api/notes/{id}`
- **Description**: Updates an existing note in the backend.
- **Headers**:
  - `Authorization`: Basic authentication using username and password.
  - `Content-Type`: `application/json`
- **Body**: JSON object of type `NoteType` containing updated `title` and `content`.
- **Response**: Returns the updated note of type `NoteType`.

### 4. Delete Note
- **Endpoint**: `DELETE /api/notes/{id}`
- **Description**: Deletes a note from the backend.
- **Headers**:
  - `Authorization`: Basic authentication using username and password.
- **Response**: No content is returned upon successful deletion.

---

The **Thought-to-Note Lite Frontend** is a well-structured, maintainable application that leverages modern web development practices, including custom hooks, centralized API interactions, unit testing, and consistent styling. With a full backend integration, it provides a seamless experience for managing notes.

