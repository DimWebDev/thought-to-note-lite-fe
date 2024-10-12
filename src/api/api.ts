import { NoteType, NewNoteType } from '../interfaces/types';

const API_URL = 'http://localhost:8080/api/notes';

export const fetchNotes = async (): Promise<NoteType[]> => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa('yourUsername:yourPassword'),
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export const createNote = async (newNote: NewNoteType): Promise<NoteType> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa('yourUsername:yourPassword'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newNote),
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json(); // This will be of type NoteType
};

export const updateNote = async (id: number, updatedNote: NoteType): Promise<NoteType> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': 'Basic ' + btoa('yourUsername:yourPassword'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedNote),
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export const deleteNote = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Basic ' + btoa('yourUsername:yourPassword'),
    },
  });
  if (!response.ok) throw new Error(response.statusText);
};