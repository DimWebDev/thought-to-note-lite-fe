// Represents a complete note, as returned by the backend
export interface NoteType {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Represents a new note being created, before it's saved by the backend. 
// updatetAt and createdAt are not needed, since they are generated automatically by the Backend
export interface NewNoteType {
  title: string;
  content: string;
}


export {};