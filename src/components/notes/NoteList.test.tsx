import React from 'react';
import { render, screen } from '@testing-library/react';
import NoteList from './NoteList';
import { NoteType } from '../../interfaces/types';

// 1. Create a spy function to capture props passed to the mocked Note component
const mockNoteSpy = jest.fn();

// 2. Mock the Note component at the top level with React imported inside
jest.mock('./Note', () => {
  const React = require('react');
  return (props: any) => {
    mockNoteSpy(props); // Capture the props for verification
    return React.createElement('div', { 'data-testid': 'mock-note' }, props.title);
  };
});

describe('NoteList Component', () => {
  const mockEditNote = jest.fn();
  const mockDeleteNote = jest.fn();

  const mockNotes: NoteType[] = [
    {
      id: 1,
      title: 'First Note',
      content: 'Content of the first note.',
      createdAt: '2023-10-01T12:00:00Z',
      updatedAt: '2023-10-01T12:00:00Z',
    },
    {
      id: 2,
      title: 'Second Note',
      content: 'Content of the second note.',
      createdAt: '2023-10-02T12:00:00Z',
      updatedAt: '2023-10-02T12:00:00Z',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mock calls
    mockNoteSpy.mockClear();
  });

  it('renders a list of notes', () => {
    render(<NoteList notes={mockNotes} editNote={mockEditNote} deleteNote={mockDeleteNote} />);

    // Check that the mocked Note components are rendered
    const renderedNotes = screen.getAllByTestId('mock-note');
    expect(renderedNotes).toHaveLength(mockNotes.length);

    // Check that each note's title is displayed
    mockNotes.forEach(note => {
      expect(screen.getByText(note.title)).toBeInTheDocument();
    });
  });

  it('displays message when no notes are available', () => {
    render(<NoteList notes={[]} editNote={mockEditNote} deleteNote={mockDeleteNote} />);
    expect(screen.getByText('No notes available.')).toBeInTheDocument();
  });

  it('passes editNote and deleteNote functions to each Note component', () => {
    render(<NoteList notes={mockNotes} editNote={mockEditNote} deleteNote={mockDeleteNote} />);

    // Ensure that the mock Note component was called with correct props
    expect(mockNoteSpy).toHaveBeenCalledTimes(mockNotes.length);
    mockNotes.forEach(note => {
      expect(mockNoteSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          id: note.id,
          title: note.title,
          content: note.content,
          createdAt: note.createdAt,
          updatedAt: note.updatedAt,
          editNote: mockEditNote,
          deleteNote: mockDeleteNote,
        })
      );
    });
  });
});
