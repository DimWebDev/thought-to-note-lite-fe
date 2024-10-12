// src/components/notes/__tests__/Note.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from './Note';
import { NoteType } from '../../interfaces/types';

const mockNote: NoteType = {
  id: 1,
  title: 'Test Note',
  content: 'This is a test note.',
  createdAt: '2023-10-01T12:00:00Z',
  updatedAt: '2023-10-01T12:00:00Z',
};

describe('Note Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders note title and content', () => {
    render(<Note {...mockNote} editNote={jest.fn()} deleteNote={jest.fn()} />);
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('This is a test note.')).toBeInTheDocument();
  });

  it('calls editNote when Save button is clicked', async () => {
    const editNoteMock: jest.Mock = jest.fn();
    render(<Note {...mockNote} editNote={editNoteMock} deleteNote={jest.fn()} />);
    
    await userEvent.click(screen.getByText('Edit'));
    await userEvent.click(screen.getByText('Save'));
    
    expect(editNoteMock).toHaveBeenCalledWith(1, expect.any(Object));
  });

  it('calls deleteNote when Delete button is clicked', async () => {
    window.confirm = jest.fn(() => true); 
    const deleteNoteMock: jest.Mock = jest.fn();
    render(<Note {...mockNote} editNote={jest.fn()} deleteNote={deleteNoteMock} />);
    
    await userEvent.click(screen.getByText('Delete'));
    expect(deleteNoteMock).toHaveBeenCalledWith(1);
  });
});
