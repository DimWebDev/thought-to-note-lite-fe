import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import App from './App';
import useNotes from './hooks/useNotes';

// Mock the useNotes hook
jest.mock('./hooks/useNotes');

const mockUseNotes = useNotes as jest.MockedFunction<typeof useNotes>;

describe('App Component', () => {
  const searchNotesMock = jest.fn();

  beforeEach(() => {
    mockUseNotes.mockReturnValue({
      notes: [
        {
          id: 1,
          title: 'Sample Note',
          content: 'This is a sample note.',
          createdAt: '2023-10-01T12:00:00Z',
          updatedAt: '2023-10-01T12:00:00Z',
        },
      ],
      loading: false,
      error: null,
      getNotes: jest.fn(),
      addNote: jest.fn(),
      editNote: jest.fn(),
      removeNote: jest.fn(),
      searchNotes: searchNotesMock, // Assign the mock here
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('renders the App component with notes', () => {
    render(<App />);
    expect(screen.getByText('Thought to Note Lite')).toBeInTheDocument();
    expect(screen.getByText('Sample Note')).toBeInTheDocument();
    expect(screen.getByText('This is a sample note.')).toBeInTheDocument();
  });

  it('handles search input and triggers searchNotes', async () => {
    render(<App />);

    const searchInput = screen.getByLabelText('Search by Title');
    const searchButton = screen.getByRole('button', { name: /search/i }); // Use getByRole for better accessibility

    // Simulate user typing 'Test' into the search input
    await userEvent.type(searchInput, 'Test');

    // Simulate user clicking the Search button
    await userEvent.click(searchButton);

    // Wait for the searchNotesMock to be called with 'Test'
    await waitFor(() => {
      expect(searchNotesMock).toHaveBeenCalledWith('Test');
    });
  });

  it('displays loading state', () => {
    mockUseNotes.mockReturnValueOnce({
      ...mockUseNotes(),
      loading: true,
      error: null,
    });

    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message', () => {
    mockUseNotes.mockReturnValueOnce({
      ...mockUseNotes(),
      loading: false,
      error: 'Failed to fetch notes.',
    });

    render(<App />);
    expect(screen.getByText('Failed to fetch notes.')).toBeInTheDocument();
  });
});
