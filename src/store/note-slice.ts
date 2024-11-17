import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  company: string;
  vacancy: string;
  salary: string;
  response: string;
  note: string;
}
export interface NoteWithId extends Note {
  _id: string;
}

interface AdminsState {
  notes: NoteWithId[] | null;
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
    getNotesSuccess: (
      state,
      action: PayloadAction<{ notes: NoteWithId[] }>
    ) => {
      const { notes } = action.payload;
      state.isLoading = false;
      state.notes = notes;
    },
    setNotesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateNote: (state, action: PayloadAction<NoteWithId>) => {
      if (action.payload) {
        state.isLoading = true;
        state.error = null;
      }
    },
    updateNoteSuccess: (state, action: PayloadAction<NoteWithId>) => {
      if (action.payload) {
        state.isLoading = false;
        state.error = null;
        const updatedNotes = state?.notes?.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        if (updatedNotes) {
          state.notes = updatedNotes;
        }
      }
    },
    addNoteSuccess: (state, action: PayloadAction<NoteWithId>) => {
      if (action.payload) {
        state.isLoading = false;
        state.error = null;
        if (state.notes) {
          const updatedNotes = [...state.notes, action.payload];
          if (updatedNotes) {
            state.notes = updatedNotes;
          }
        }
      }
    },
    deleteNoteSuccess: (state, action: PayloadAction<string[]>) => {
      if (action.payload) {
        state.isLoading = false;
        state.error = null;
        if (state.notes) {
          const updatedNotes = state.notes.filter(
            (item) => !action.payload.includes(item._id)
          );
          if (updatedNotes) {
            state.notes = updatedNotes;
          }
        }
      }
    },
    addNote: (state, action: PayloadAction<Note>) => {
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
  setNotesFailure,
  updateNote,
  deleteNote,
  updateNoteSuccess,
  addNoteSuccess,
  deleteNoteSuccess,
} = notesSlice.actions;
export default notesSlice.reducer;
