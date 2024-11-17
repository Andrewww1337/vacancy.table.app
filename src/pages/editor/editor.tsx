import { useState, useEffect } from 'react';

import { Spin, message } from 'antd';

import { NotesTable } from '../../components/note-table/note-table';
import { NoteEditWindow } from '../../components/note-edit-window/note-edit-window';

import {
  getNotes,
  updateNote,
  addNote,
  NoteWithId,
  Note,
} from '../../store/note-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import '../../components/styles/edit-window.css';

export const Editor = () => {
  const dispatch = useAppDispatch();

  const [editedNote, setEditedNote] = useState<NoteWithId>();
  const [createNote, setCreateNote] = useState(false);

  const notesState = useAppSelector((state) => state.notes);

  useEffect(() => {
    dispatch(getNotes());
  }, []);
  useEffect(() => {
    if (notesState.error) {
      message.error(notesState.error);
    }
  }, [notesState.error]);

  const onSaveNote = (value: NoteWithId) => {
    if (editedNote) {
      const updatedNote: NoteWithId = {
        _id: editedNote._id,
        company: value.company,
        vacancy: value.vacancy,
        salary: value.salary,
        response: value.response,
        note: value.note,
      };
      dispatch(updateNote(updatedNote));
      setEditedNote(undefined);
    }
  };

  const onAddNewNote = (value: NoteWithId) => {
    const note: Note = {
      company: value.company,
      vacancy: value.vacancy,
      salary: value.salary,
      response: value.response,
      note: value.note,
    };
    dispatch(addNote(note));
    setCreateNote(false);
  };

  if (notesState.isLoading) {
    return <Spin fullscreen={true} size="large" />;
  }

  return (
    <div>
      {editedNote && (
        <NoteEditWindow
          onSaveNote={onSaveNote}
          setEditNote={setEditedNote}
          editedNote={editedNote}
          isEditor={true}
        />
      )}

      {createNote && (
        <NoteEditWindow
          setCreateNote={setCreateNote}
          isEditor={false}
          onSaveNote={onAddNewNote}
        />
      )}

      {notesState.notes && (
        <NotesTable
          notes={notesState.notes}
          setEditedNote={setEditedNote}
          setCreateNote={setCreateNote}
        />
      )}
    </div>
  );
};
