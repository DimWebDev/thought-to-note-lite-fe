import React, { useState } from 'react';
import { CardContent, Typography, TextField, Button } from '@mui/material';
import StyledCard from '../shared/StyledCard';
import { NoteType } from '../../interfaces/types';

interface NoteProps extends NoteType {
  editNote: (id: number, note: NoteType) => void;
  deleteNote: (id: number) => void;
}

const Note: React.FC<NoteProps> = ({ id, title, content, createdAt, updatedAt, editNote, deleteNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    editNote(id, { id, title: editedTitle, content: editedContent, createdAt, updatedAt });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedTitle(title);  // Revert to original title
    setEditedContent(content);  // Revert to original content
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete the note titled "${title}"?`)) {
      deleteNote(id);
    }
  };

  return (
    <StyledCard>
      <CardContent>
        {isEditing ? (
          <>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              margin="normal"
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button color="primary" onClick={handleSaveClick}>
                Save
              </Button>
              <Button color="secondary" onClick={handleCancelClick}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {content}
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
              <Button size="small" color="primary" onClick={handleEditClick}>
                Edit
              </Button>
              <Button size="small" color="secondary" onClick={handleDeleteClick}>
                Delete
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default Note;