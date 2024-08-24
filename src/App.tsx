import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import { Container, Typography, TextField, Button } from '@mui/material';
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

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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
          setNotes(data);
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
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      // If the search query is empty, fetch all notes
      const response = await fetch('http://localhost:8080/api/notes', {
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
        console.error('Failed to fetch notes:', response.statusText);
      }
    } else {
      try {
        const response = await fetch(`http://localhost:8080/api/notes/search?title=${encodeURIComponent(searchQuery)}`, {
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
          console.error('Failed to search notes:', response.statusText);
        }
      } catch (error) {
        console.error('Error searching notes:', error);
      }
    }
  };

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
      <NoteList notes={notes} updateNote={updateNote} deleteNote={deleteNote} />
    </AppContainer>
  );
};

export default App;