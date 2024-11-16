import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  company: string;
  vacancy: string;
  salary: string;
  response: string;
  note: string;
  _id: string;
}
export interface AddNote {
  company: string;
  vacancy: string;
  salary: string;
  response: string;
  note: string;
}

interface AdminsState {
  notes: Note[] | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: AdminsState = {
  notes: null,
  error: null,
  isLoading: false,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    getNotes: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getNotesSuccess: (state, action: PayloadAction<{ notes: Note[] }>) => {
      const { notes } = action.payload;
      state.isLoading = false;
      state.notes = notes;
    },
    getNotesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      if (action.payload) {
        state.isLoading = true;
        state.error = null;
      }
    },
    addNote: (state, action: PayloadAction<AddNote>) => {
      if (action.payload) {
        state.isLoading = true;
        state.error = null;
      }
    },
    deleteNote: (state, action: PayloadAction<string[]>) => {
      state.isLoading = true;
      state.error = null;
    },
  },
});

export const {
  getNotes,
  addNote,
  getNotesSuccess,
  getNotesFailure,
  updateNote,
  deleteNote,
} = notesSlice.actions;
export default notesSlice.reducer;
