import React from 'react';
import Note from './Note';
import { Grid } from '@mui/material';
import { NoteType } from '../../interfaces/types'; 

interface NoteListProps {
  notes: NoteType[];
  editNote: (id: number, note: NoteType) => void;
  deleteNote: (id: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, editNote, deleteNote }) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <Grid container spacing={2}>
        {notes.length > 0 ? (
          notes.map(note => (
            <Grid item xs={12} sm={6} key={note.id}>
              <Note {...note} editNote={editNote} deleteNote={deleteNote} />
            </Grid>
          ))
        ) : (
          <p>No notes available.</p>
        )}
      </Grid>
    </div>
  );
};

export default NoteList;