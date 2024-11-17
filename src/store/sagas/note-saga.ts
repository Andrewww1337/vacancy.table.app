import { call, put, takeLatest } from 'redux-saga/effects';
import { axios } from '../api/axios';

import { PayloadAction } from '@reduxjs/toolkit';
import {
  NoteWithId,
  getNotes,
  addNote,
  getNotesSuccess,
  setNotesFailure,
  updateNote,
  deleteNote,
  updateNoteSuccess,
  addNoteSuccess,
  deleteNoteSuccess,
} from '../note-slice';

function* handleGetNotes() {
  try {
    const {
      data: { notes },
    }: { data: { notes: NoteWithId[] } } = yield call(
      axios.get,
      '/api/user/all-notes'
    );
    yield put(getNotesSuccess({ notes }));
  } catch (error) {
    yield put(setNotesFailure('Failed to fetch notes. Refresh the page.'));
  }
}

function* handleUpdateNote(action: PayloadAction<NoteWithId>) {
  try {
    const { data }: { data: { note: NoteWithId } } = yield call(() =>
      axios({
        method: 'post',
        url: '/api/user/update-note',
        data: { note: action.payload, id: action.payload._id },
      })
    );
    yield put(updateNoteSuccess(data.note));
  } catch (error) {
    yield put(setNotesFailure('Failed to update note. Refresh the page.'));
  }
}

function* handleAddNote(action: PayloadAction<NoteWithId>) {
  try {
    const { data }: { data: { note: NoteWithId } } = yield call(() =>
      axios({
        method: 'post',
        url: '/api/user/add-note',
        data: { note: action.payload },
      })
    );
    yield put(addNoteSuccess(data.note));
  } catch (error) {
    yield put(setNotesFailure('Failed to add note. Refresh the page.'));
  }
}

function* handleDeleteNotes(action: PayloadAction<number[]>) {
  try {
    const {
      data: { ids },
    }: { data: { ids: string[] } } = yield call(() =>
      axios({
        method: 'delete',
        url: '/api/user/delete-notes',
        data: { ids: action.payload },
      })
    );
    yield put(deleteNoteSuccess(ids));
  } catch (error) {
    yield put(setNotesFailure('Failed to delete notes. Refresh the page.'));
  }
}

export function* watchUpdateNote() {
  yield takeLatest(updateNote.type, handleUpdateNote);
}
export function* watchAddNote() {
  yield takeLatest(addNote.type, handleAddNote);
}
export function* watchNotes() {
  yield takeLatest(getNotes.type, handleGetNotes);
}
export function* watchDeleteNote() {
  yield takeLatest(deleteNote.type, handleDeleteNotes);
}
