import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // For realistic user interactions
import NoteForm from './NoteForm';
import { NewNoteType } from '../../interfaces/types';
// '@testing-library/jest-dom' is imported globally in setupTests.ts

describe('NoteForm Component', () => {
  const mockAddNote = jest.fn();

  beforeEach(() => {
    render(<NoteForm addNote={mockAddNote} />);
    jest.clearAllMocks(); // Clear mock history before each test
  });

  it('renders the title and content input fields and the submit button', () => {
    // Check for Title input field
    const titleInput = screen.getByLabelText(/title/i);
    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveAttribute('type', 'text');

    // Check for Content input field
    const contentInput = screen.getByLabelText(/content/i);
    expect(contentInput).toBeInTheDocument();
    // Instead of checking for 'multiline' attribute, verify it's a textarea
    expect(contentInput.tagName).toBe('TEXTAREA'); // tagName is uppercase

    // Check for Save Note button
    const saveButton = screen.getByRole('button', { name: /save note/i });
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toHaveAttribute('type', 'submit');
  });

  it('allows the user to input a title', async () => {
    const titleInput = screen.getByLabelText(/title/i);
    await userEvent.type(titleInput, 'My New Note');
    expect(titleInput).toHaveValue('My New Note');
  });

  it('allows the user to input content', async () => {
    const contentInput = screen.getByLabelText(/content/i);
    await userEvent.type(contentInput, 'This is the content of my new note.');
    expect(contentInput).toHaveValue('This is the content of my new note.');
  });

  it('calls addNote with correct data and clears the input fields upon submission', async () => {
    const titleInput = screen.getByLabelText(/title/i);
    const contentInput = screen.getByLabelText(/content/i);
    const saveButton = screen.getByRole('button', { name: /save note/i });

    const testTitle = 'Test Note';
    const testContent = 'This is a test note content.';

    await userEvent.type(titleInput, testTitle);
    await userEvent.type(contentInput, testContent);

    await userEvent.click(saveButton);

    expect(mockAddNote).toHaveBeenCalledTimes(1);
    expect(mockAddNote).toHaveBeenCalledWith({
      title: testTitle,
      content: testContent,
    });

    expect(titleInput).toHaveValue('');
    expect(contentInput).toHaveValue('');
  });

  it('calls addNote with empty data when fields are empty and clears the fields', async () => {
    const saveButton = screen.getByRole('button', { name: /save note/i });

    const titleInput = screen.getByLabelText(/title/i);
    const contentInput = screen.getByLabelText(/content/i);
    expect(titleInput).toHaveValue('');
    expect(contentInput).toHaveValue('');

    await userEvent.click(saveButton);

    expect(mockAddNote).toHaveBeenCalledTimes(1);
    expect(mockAddNote).toHaveBeenCalledWith({
      title: '',
      content: '',
    });

    expect(titleInput).toHaveValue('');
    expect(contentInput).toHaveValue('');
  });

  it('handles errors gracefully when addNote throws an error', async () => {
    // Modify the mock to throw an error when called
    mockAddNote.mockImplementation(() => {
      throw new Error('Failed to add note');
    });

    const titleInput = screen.getByLabelText(/title/i);
    const contentInput = screen.getByLabelText(/content/i);
    const saveButton = screen.getByRole('button', { name: /save note/i });

    await userEvent.type(titleInput, 'Error Note');
    await userEvent.type(contentInput, 'This note will fail to save.');

    // Spy on console.error to verify error handling
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await userEvent.click(saveButton);

    expect(mockAddNote).toHaveBeenCalledWith({
      title: 'Error Note',
      content: 'This note will fail to save.',
    });

    // Assert that the fields are not cleared due to the error
    expect(titleInput).toHaveValue('Error Note');
    expect(contentInput).toHaveValue('This note will fail to save.');

    // Assert that console.error was called with the correct error message
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating note:', expect.any(Error));

    // Restore the original console.error implementation
    consoleErrorSpy.mockRestore();
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<NoteForm addNote={mockAddNote} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
