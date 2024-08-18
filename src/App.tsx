import React, { useState } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import { Container, Typography } from '@mui/material';
import styled from '@emotion/styled';

const AppContainer = styled(Container)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const App: React.FC = () => {
  const [notes, setNotes] = useState<any[]>([]);

  const addNote = (newNote: any) => {
    setNotes([...notes, newNote]);
  };

  const updateNote = (updatedNote: any) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
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