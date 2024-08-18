import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import { Container, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { NoteType } from './interfaces/types'; 

const AppContainer = styled(Container)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/notes', {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + btoa('yourUsername:yourPassword'),
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched Notes:', data); // Log the fetched data
          setNotes(data);  // Update state with the fetched notes
        } else {
          console.error('Failed to fetch notes:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const addNote = (newNote: NoteType) => {
    setNotes([...notes, newNote]);
  };

  const updateNote = (updatedNote: NoteType) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  return (
    <AppContainer>
      <Typography variant="h4" align="center" gutterBottom>
        Thought to Note Lite
      </Typography>
      <NoteForm addNote={addNote} />
      <NoteList notes={notes} updateNote={updateNote} />
    </AppContainer>
  );
};

export default App;