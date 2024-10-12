import React, { useState } from 'react';
import NoteList from './components/notes/NoteList';
import NoteForm from './components/notes/NoteForm';
import { Container, Typography, TextField, Button } from '@mui/material';
import styled from '@emotion/styled';
import useNotes from './hooks/useNotes';

const AppContainer = styled(Container)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { notes, loading, error, getNotes, addNote, editNote, removeNote, searchNotes } = useNotes();

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      await getNotes(); // Call the getNotes function when searchQuery is empty
    } else {
      await searchNotes(searchQuery); // Otherwise, perform the search
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <AppContainer>
      <Typography variant="h4" align="center" gutterBottom>
        Thought to Note Lite
      </Typography>

      {/* Search Input */}
      <SearchContainer>
        <TextField
          label="Search by Title"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </SearchContainer>

      <NoteForm addNote={addNote} />
      <NoteList notes={notes} editNote={editNote} deleteNote={removeNote} />
    </AppContainer>
  );
};

export default App;