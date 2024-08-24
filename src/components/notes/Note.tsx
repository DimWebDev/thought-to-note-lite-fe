import React from 'react';
import { CardContent, Typography, Button } from '@mui/material';
import StyledCard from '../shared/StyledCard';
import { NoteType } from '../../interfaces/types';

interface NoteProps extends NoteType {
  editNote: (id: number, note: NoteType) => void;
  deleteNote: (id: number) => void;
}

const Note: React.FC<NoteProps> = ({ id, title, content, createdAt, updatedAt, editNote, deleteNote }) => {
  const handleEdit = () => {
    const updatedTitle = prompt('Edit Title', title);
    const updatedContent = prompt('Edit Content', content);

    if (updatedTitle !== null && updatedContent !== null) {
      // Pass all properties to maintain data integrity
      editNote(id, { id, title: updatedTitle, content: updatedContent, createdAt, updatedAt });
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the note titled "${title}"?`)) {
      deleteNote(id);
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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          <Button size="small" color="primary" onClick={handleEdit}>
            Edit
          </Button>
          <Button size="small" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </CardContent>
    </StyledCard>
  );
};

export default Note;