import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import styled from '@emotion/styled';
import { NoteType } from '../interfaces/types'; // Import the NoteType interface

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

interface NoteFormProps {
  addNote: (note: NoteType) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ addNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newNote = {
      title,
      content,
    };

    try {
      const response = await fetch('http://localhost:8080/api/notes', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa('yourUsername:yourPassword'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        const savedNote: NoteType = await response.json();
        addNote(savedNote);  // Add the note returned by the backend
        setTitle('');
        setContent('');
      } else {
        console.error('Failed to create note:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        label="Content"
        variant="outlined"
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Save Note
      </Button>
    </FormContainer>
  );
};

export default NoteForm;