import { all, fork } from 'redux-saga/effects';

import {
  watchNotes,
  watchUpdateNote,
  watchAddNote,
  watchDeleteNote,
} from './note-saga';

function* rootSaga() {
  yield all([fork(watchNotes)]);
  yield all([fork(watchUpdateNote)]);
  yield all([fork(watchAddNote)]);
  yield all([fork(watchDeleteNote)]);
}

export default rootSaga;
