import { useState, useEffect } from 'react';
import { NoteType, NewNoteType } from '../interfaces/types';
import { fetchNotes, createNote, updateNote, deleteNote } from '../api/api';

const useNotes = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getNotes = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error before the operation
      const notes = await fetchNotes();
      setNotes(notes);
    } catch (err) {
      setError('An error occurred while fetching notes.');
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (newNote: NewNoteType) => {
    try {
      setError(null); // Reset error before the operation
      const savedNote = await createNote(newNote);
      setNotes([...notes, savedNote]);
    } catch (err) {
      setError('An error occurred while adding the note.');
    }
  };

  const editNote = async (id: number, updatedNote: NoteType) => {
    try {
      setError(null); // Reset error before the operation
      const savedNote = await updateNote(id, updatedNote);
      setNotes(notes.map(note => (note.id === id ? savedNote : note)));
    } catch (err) {
      setError('An error occurred while updating the note.');
    }
  };

  const removeNote = async (id: number) => {
    try {
      setError(null); // Reset error before the operation
      await deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (err) {
      setError('An error occurred while deleting the note.');
    }
  };

  const searchNotes = async (query: string) => {
    try {
      setLoading(true);
      setError(null); // Reset error before the operation
      const response = await fetch(`http://localhost:8080/api/notes/search?title=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa('yourUsername:yourPassword'),
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        setError('An error occurred while searching notes.');
      }
    } catch (err) {
      setError('An error occurred while searching notes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();  // Automatically fetch all notes when the component mounts
  }, []);

  return { notes, loading, error, getNotes, addNote, editNote, removeNote, searchNotes };
};

export default useNotes;