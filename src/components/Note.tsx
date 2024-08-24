import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';
import { NoteType } from '../interfaces/types';

const StyledCard = styled(Card)`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const NoteActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

interface NoteProps extends NoteType {
  updateNote: (note: NoteType) => void;
  deleteNote: (id: number) => void;
}

const Note: React.FC<NoteProps> = ({ id, title, content, updateNote, deleteNote }) => {
  const handleEdit = async () => {
    const updatedTitle = prompt('Edit Title', title);
    const updatedContent = prompt('Edit Content', content);

    if (updatedTitle !== null && updatedContent !== null) {
      const updatedNote = {
        id,
        title: updatedTitle,
        content: updatedContent,
      };

      try {
        const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': 'Basic ' + btoa('yourUsername:yourPassword'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedNote),
        });

        if (response.ok) {
          const savedNote: NoteType = await response.json();
          updateNote(savedNote);  // Update the state with the returned note
        } else {
          console.error('Failed to update note:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the note titled "${title}"?`)) {
      try {
        const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Basic ' + btoa('yourUsername:yourPassword'),
          },
        });

        if (response.ok) {
          deleteNote(id);  // Remove the note from the state
        } else {
          console.error('Failed to delete note:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {content}
        </Typography>
        <NoteActions>
          <Button size="small" color="primary" onClick={handleEdit}>
            Edit
          </Button>
          <Button size="small" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </NoteActions>
      </CardContent>
    </StyledCard>
  );
};

export default Note;