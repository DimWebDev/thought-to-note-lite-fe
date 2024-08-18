import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import styled from '@emotion/styled';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const NoteForm: React.FC<{ addNote: (note: any) => void }> = ({ addNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNote = {
      id: Date.now(),
      title,
      content,
    };
    addNote(newNote);
    setTitle('');
    setContent('');
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