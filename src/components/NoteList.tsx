import React from 'react';
import Note from './Note';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';

const NoteListContainer = styled.div`
  margin-top: 2rem;
`;

const NoteList: React.FC<{ notes: any[], updateNote: (note: any) => void }> = ({ notes, updateNote }) => {
  return (
    <NoteListContainer>
      <Grid container spacing={2}>
        {notes.length > 0 ? (
          notes.map(note => (
            <Grid item xs={12} sm={6} key={note.id}>
              <Note {...note} updateNote={updateNote} />
            </Grid>
          ))
        ) : (
          <p>No notes available.</p>
        )}
      </Grid>
    </NoteListContainer>
  );
};

export default NoteList;