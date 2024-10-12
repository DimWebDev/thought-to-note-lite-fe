// ✏️  This test suite comprehensively verifies the useNotes hook in complete isolation from the backend.
// ✏️  By utilizing Jest mocks for all API calls (fetchNotes, createNote, updateNote, deleteNote, and searchNotes), 
// ✏️  the tests simulate different scenarios including successful operations, failures, and state transitions (loading, error, notes) 
// ✏️  without relying on an actual backend service. Each function is tested under both normal and error conditions, ensuring that 
// ✏️  the hook handles state management correctly and provides consistent behavior across all scenarios.

import React from 'react';
import { render, act } from '@testing-library/react';
import useNotes from './useNotes';
import * as api from '../api/api';
import { NoteType, NewNoteType } from '../interfaces/types';

// Mock the API module
jest.mock('../api/api');

const mockNotes: NoteType[] = [
  { id: 1, title: 'Note 1', content: 'Content 1', createdAt: '2023-10-01', updatedAt: '2023-10-01' },
  { id: 2, title: 'Note 2', content: 'Content 2', createdAt: '2023-10-02', updatedAt: '2023-10-02' },
];

describe('useNotes Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock data before each test
  });

  it('fetches notes on mount', async () => {
    (api.fetchNotes as jest.Mock).mockResolvedValue(mockNotes);

    let hookResult: ReturnType<typeof useNotes> | undefined = undefined;

    const TestComponent = () => {
      hookResult = useNotes();
      return null;
    };

    render(<TestComponent />);

    expect(hookResult).toBeDefined();
    expect(hookResult!.loading).toBe(true);

    await act(async () => {
      // Wait for useEffect and fetchNotes to complete
    });

    expect(hookResult!.loading).toBe(false);
    expect(hookResult!.notes).toEqual(mockNotes);
    expect(hookResult!.error).toBeNull();
    expect(api.fetchNotes).toHaveBeenCalledTimes(1);
  });

  it('handles error during fetchNotes', async () => {
    (api.fetchNotes as jest.Mock).mockRejectedValue(new Error('Fetch error'));

    let hookResult: ReturnType<typeof useNotes> | undefined = undefined;

    const TestComponent = () => {
      hookResult = useNotes();
      return null;
    };

    render(<TestComponent />);

    expect(hookResult).toBeDefined();
    expect(hookResult!.loading).toBe(true);

    await act(async () => {
      // Wait for useEffect and fetchNotes to complete
    });

    expect(hookResult!.loading).toBe(false);
    expect(hookResult!.notes).toEqual([]);
    expect(hookResult!.error).toBe('An error occurred while fetching notes.');
    expect(api.fetchNotes).toHaveBeenCalledTimes(1);
  });

  it('adds a new note', async () => {
    const newNote: NewNoteType = { title: 'New Note', content: 'New Content' };
    const savedNote: NoteType = { id: 3, ...newNote, createdAt: '2023-10-03', updatedAt: '2023-10-03' };

    (api.fetchNotes as jest.Mock).mockResolvedValue(mockNotes);
    (api.createNote as jest.Mock).mockResolvedValue(savedNote);

    let hookResult: ReturnType<typeof useNotes> | undefined = undefined;

    const TestComponent = () => {
      hookResult = useNotes();
      return null;
    };

    render(<TestComponent />);

    await act(async () => {
      // Wait for initial fetch
    });

    expect(hookResult!.notes).toEqual(mockNotes);

    await act(async () => {
      await hookResult!.addNote(newNote);
    });

    expect(hookResult!.notes).toContainEqual(savedNote);
    expect(api.createNote).toHaveBeenCalledWith(newNote);
    expect(hookResult!.error).toBeNull();
  });

  it('handles error during addNote', async () => {
    const newNote: NewNoteType = { title: 'New Note', content: 'New Content' };

    (api.fetchNotes as jest.Mock).mockResolvedValue(mockNotes);
    (api.createNote as jest.Mock).mockRejectedValue(new Error('Add error'));

    let hookResult: ReturnType<typeof useNotes> | undefined = undefined;

    const TestComponent = () => {
      hookResult = useNotes();
      return null;
    };

    render(<TestComponent />);

    await act(async () => {
      // Wait for initial fetch
    });

    await act(async () => {
      await hookResult!.addNote(newNote);
    });

    expect(hookResult!.notes).toEqual(mockNotes); // Notes should remain unchanged
    expect(api.createNote).toHaveBeenCalledWith(newNote);
    expect(hookResult!.error).toBe('An error occurred while adding the note.');
  });

  it('edits a note', async () => {
    const updatedNote: NoteType = { ...mockNotes[0], title: 'Updated Title' };

    (api.fetchNotes as jest.Mock).mockResolvedValue(mockNotes);
    (api.updateNote as jest.Mock).mockResolvedValue(updatedNote);

    let hookResult: ReturnType<typeof useNotes> | undefined = undefined;

    const TestComponent = () => {
      hookResult = useNotes();
      return null;
    };

    render(<TestComponent />);

    await act(async () => {
      // Wait for initial fetch
    });

    await act(async () => {
      await hookResult!.editNote(updatedNote.id, updatedNote);
    });

    expect(hookResult!.notes).toContainEqual(updatedNote);
    expect(api.updateNote).toHaveBeenCalledWith(updatedNote.id, updatedNote);
    expect(hookResult!.error).toBeNull();
  });

  it('handles error during editNote', async () => {
    const updatedNote: NoteType = { ...mockNotes[0], title: 'Updated Title' };

    (api.fetchNotes as jest.Mock).mockResolvedValue(mockNotes);
    (api.updateNote as jest.Mock).mockRejectedValue(new Error('Edit error'));

    let hookResult: ReturnType<typeof useNotes> | undefined = undefined;

    const TestComponent = () => {
      hookResult = useNotes();
      return null;
    };

    render(<TestComponent />);

    await act(async () => {
      // Wait for initial fetch
    });

    await act(async () => {
      await hookResult!.editNote(updatedNote.id, updatedNote);
    });

    expect(hookResult!.notes).toEqual(mockNotes); // Notes should remain unchanged
    expect(api.updateNote).toHaveBeenCalledWith(updatedNote.id, updatedNote);
    expect(hookResult!.error).toBe('An error occurred while updating the note.');
  });

  it('removes a note', async () => {
    const noteIdToRemove = mockNotes[0].id;

    (api.fetchNotes as jest.Mock).mockResolvedValue(mockNotes);
    (api.deleteNote as jest.Mock).mockResolvedValue(undefined);

    let hookResult: ReturnType<typeof useNotes> | undefined = undefined;

    const TestComponent = () => {
      hookResult = useNotes();
      return null;
    };

    render(<TestComponent />);

    await act(async () => {
      // Wait for initial fetch
    });

    await act(async () => {
      await hookResult!.removeNote(noteIdToRemove);
    });

    expect(hookResult!.notes).not.toContainEqual(mockNotes[0]);
    expect(api.deleteNote).toHaveBeenCalledWith(noteIdToRemove);
    expect(hookResult!.error).toBeNull();
  });

  it('handles error during removeNote', async () => {
    const noteIdToRemove = mockNotes[0].id;

    (api.fetchNotes as jest.Mock).mockResolvedValue(mockNotes);
    (api.deleteNote as jest.Mock).mockRejectedValue(new Error('Delete error'));

    let hookResult: ReturnType<typeof useNotes> | undefined = undefined;

    const TestComponent = () => {
      hookResult = useNotes();
      return null;
    };

    render(<TestComponent />);

    await act(async () => {
      // Wait for initial fetch
    });

    await act(async () => {
      await hookResult!.removeNote(noteIdToRemove);
    });

    expect(hookResult!.notes).toEqual(mockNotes); // Notes should remain unchanged
    expect(api.deleteNote).toHaveBeenCalledWith(noteIdToRemove);
    expect(hookResult!.error).toBe('An error occurred while deleting the note.');
  });

  it('searches for notes', async () => {
    const searchQuery = 'Note 1';
    const searchResults: NoteType[] = [mockNotes[0]];

    // Mock the fetch function for searchNotes
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => searchResults,
    });

    (api.fetchNotes as jest.Mock).mockResolvedValue(mockNotes);

    let hookResult: ReturnType<typeof useNotes> | undefined = undefined;

    const TestComponent = () => {
      hookResult = useNotes();
      return null;
    };

    render(<TestComponent />);

    await act(async () => {
      // Wait for initial fetch
    });

    await act(async () => {
      await hookResult!.searchNotes(searchQuery);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:8080/api/notes/search?title=${encodeURIComponent(searchQuery)}`,
      expect.any(Object)
    );
    expect(hookResult!.notes).toEqual(searchResults);
    expect(hookResult!.loading).toBe(false);
    expect(hookResult!.error).toBeNull();
  });

  it('handles error during searchNotes', async () => {
    const searchQuery = 'Note 1';

    // Mock the fetch function to return an error
    global.fetch = jest.fn().mockRejectedValue(new Error('Search error'));

    (api.fetchNotes as jest.Mock).mockResolvedValue(mockNotes);

    let hookResult: ReturnType<typeof useNotes> | undefined = undefined;

    const TestComponent = () => {
      hookResult = useNotes();
      return null;
    };

    render(<TestComponent />);

    await act(async () => {
      // Wait for initial fetch
    });

    await act(async () => {
      await hookResult!.searchNotes(searchQuery);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:8080/api/notes/search?title=${encodeURIComponent(searchQuery)}`,
      expect.any(Object)
    );

    // Expect the notes array to remain unchanged after search error
    expect(hookResult!.notes).toEqual(mockNotes); // Notes should remain unchanged after search error
    expect(hookResult!.loading).toBe(false);
    expect(hookResult!.error).toBe('An error occurred while searching notes.');
  });

  it('sets loading state correctly during searchNotes', async () => {
    const searchQuery = 'Note 1';
    const searchResults: NoteType[] = [mockNotes[0]];

    global.fetch = jest.fn().mockImplementation(() =>
      new Promise(resolve =>
        setTimeout(() => {
          resolve({
            ok: true,
            json: async () => searchResults,
          });
        }, 100) // Simulate a delayed response
      )
    );

    (api.fetchNotes as jest.Mock).mockResolvedValue(mockNotes);

    let hookResult: ReturnType<typeof useNotes> | undefined = undefined;

    const TestComponent = () => {
      hookResult = useNotes();
      return null;
    };

    render(<TestComponent />);

    await act(async () => {
      // Wait for initial fetch
    });

    expect(hookResult!.loading).toBe(false); // Ensure loading is false before search

    await act(async () => {
      // Trigger the search
      hookResult!.searchNotes(searchQuery);
    });

    // Assert that loading is set to true immediately after initiating the search
    expect(hookResult!.loading).toBe(true); // Loading should be true during search

    // Await the delayed response to simulate completing the API call
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150)); // Wait for more than the delay in mock fetch
    });

    expect(hookResult!.loading).toBe(false); // Loading should be false after search
    expect(hookResult!.notes).toEqual(searchResults);
    expect(hookResult!.error).toBeNull();
  });
});
