import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Note from './Note';
import { NoteType } from '../../interfaces/types';

describe('Note Component', () => {
  const mockEditNote = jest.fn();
  const mockDeleteNote = jest.fn();

  const mockNote: NoteType = {
    id: 1,
    title: 'Test Note',
    content: 'This is a test note.',
    createdAt: '2023-10-01T12:00:00Z',
    updatedAt: '2023-10-01T12:00:00Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    render(<Note {...mockNote} editNote={mockEditNote} deleteNote={mockDeleteNote} />);
  });

  it('renders note title and content', () => {
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('This is a test note.')).toBeInTheDocument();
  });

  it('enters edit mode when Edit button is clicked', () => {
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('updates note and calls editNote when Save button is clicked', async () => {
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    const contentInput = screen.getByLabelText(/content/i) as HTMLInputElement;
    const saveButton = screen.getByRole('button', { name: /save/i });

    // Simulate user input
    fireEvent.change(titleInput, { target: { value: 'Updated Test Note' } });
    fireEvent.change(contentInput, { target: { value: 'This is an updated test note.' } });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockEditNote).toHaveBeenCalledWith(1, {
        id: 1,
        title: 'Updated Test Note',
        content: 'This is an updated test note.',
        createdAt: '2023-10-01T12:00:00Z',
        updatedAt: mockNote.updatedAt, // Assuming updatedAt is handled by the parent or backend
      });
    });

    // Ensure that the edit form is closed after saving
    expect(screen.queryByLabelText(/title/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/content/i)).not.toBeInTheDocument();
  });

  it('cancels editing when Cancel button is clicked', () => {
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    const contentInput = screen.getByLabelText(/content/i) as HTMLInputElement;
    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    // Change inputs
    fireEvent.change(titleInput, { target: { value: 'Changed Title' } });
    fireEvent.change(contentInput, { target: { value: 'Changed Content' } });

    fireEvent.click(cancelButton);

    // Ensure that the original title and content are displayed
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('This is a test note.')).toBeInTheDocument();

    // Ensure that editNote was not called
    expect(mockEditNote).not.toHaveBeenCalled();
  });

  it('calls deleteNote when Delete button is clicked and confirmed', () => {
    // Mock window.confirm to return true
    window.confirm = jest.fn(() => true);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete the note titled "Test Note"?');
    expect(mockDeleteNote).toHaveBeenCalledWith(1);
  });

  it('does not call deleteNote when Delete is canceled', () => {
    // Mock window.confirm to return false
    window.confirm = jest.fn(() => false);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete the note titled "Test Note"?');
    expect(mockDeleteNote).not.toHaveBeenCalled();
  });
});
