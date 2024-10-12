import { fetchNotes } from './api';
import { NoteType } from '../interfaces/types';

global.fetch = jest.fn();

const mockNotes: NoteType[] = [
  { id: 1, title: 'Note 1', content: 'Content 1', createdAt: '2023-10-01', updatedAt: '2023-10-01' },
];

describe('API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchNotes returns notes on successful response', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockNotes,
    });

    const notes = await fetchNotes();
    expect(notes).toEqual(mockNotes);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/notes', expect.any(Object));
  });

  it('fetchNotes throws an error on non-OK response', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
    });

    await expect(fetchNotes()).rejects.toThrow('Internal Server Error');
  });
});
