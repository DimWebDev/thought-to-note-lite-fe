import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';
import { NoteType } from '../interfaces/types'; // Adjust the path as needed

// Styled components for styling the Note component
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
  justify-content: flex-end;
  margin-top: 0.5rem;
`;


interface NoteProps extends NoteType {
  updateNote: (note: NoteType) => void;
}

// The Note component
const Note: React.FC<NoteProps> = ({ id, title, content, updateNote }) => {
  const handleEdit = () => {
    const updatedTitle = prompt('Edit Title', title);
    const updatedContent = prompt('Edit Content', content);
    if (updatedTitle !== null && updatedContent !== null) {
      updateNote({ id, title: updatedTitle, content: updatedContent, createdAt: '', updatedAt: '' });
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
        </NoteActions>
      </CardContent>
    </StyledCard>
  );
};

export default Note;