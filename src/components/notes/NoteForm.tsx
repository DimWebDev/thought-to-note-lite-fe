import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import styled from '@emotion/styled';
import { NewNoteType } from '../../interfaces/types';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

interface NoteFormProps {
  addNote: (note: NewNoteType) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ addNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newNote: NewNoteType = { title, content };

    try {
      addNote(newNote);
      setTitle('');
      setContent('');
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