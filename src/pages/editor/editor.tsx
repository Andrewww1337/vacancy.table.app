import { useState, useEffect } from 'react';

import { Spin, message } from 'antd';

import { NotesTable } from '../../components/note-table/note-table';
import { NoteEditWindow } from '../../components/note-edit-window/note-edit-window';

import { SaveNoteTypes } from '../../types/edit-types';

import { getNotes, Note, updateNote, addNote } from '../../store/note-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import '../../components/styles/edit-window.css';

export const Editor = () => {
  const dispatch = useAppDispatch();

  const [editNote, setEditNote] = useState<Note>();
  const [createNote, setCreateNote] = useState(false);

  const notesFromServer = useAppSelector((state) => state.notes.notes);
  const notesError = useAppSelector((state) => state.notes.error);
  const notesIsLoading = useAppSelector((state) => state.notes.isLoading);

  useEffect(() => {
    dispatch(getNotes());
  }, []);
  useEffect(() => {
    if (notesError) {
      message.error(` ${notesError ? notesError : ''}`);
    }
  }, [notesError]);

  const saveNote = (value: SaveNoteTypes) => {
    if (editNote) {
      const updatedNote: {
        _id: string;
        company: string;
        vacancy: string;
        salary: string;
        response: string;
        note: string;
      } = {
        _id: editNote._id,
        company: value.company,
        vacancy: value.vacancy,
        salary: value.salary,
        response: value.response,
        note: value.note,
      };
      dispatch(updateNote(updatedNote));
      setEditNote(undefined);
    }
  };

  const addNewNote = (value: SaveNoteTypes) => {
    const note: {
      company: string;
      vacancy: string;
      salary: string;
      response: string;
      note: string;
    } = {
      company: value.company,
      vacancy: value.vacancy,
      salary: value.salary,
      response: value.response,
      note: value.note,
    };
    dispatch(addNote(note));
    setCreateNote(false);
  };

  if (notesIsLoading) {
    return <Spin fullscreen={true} size="large" />;
  }

  return (
    <div>
      {editNote && (
        <NoteEditWindow
          saveNote={saveNote}
          setEditNote={setEditNote}
          editNote={editNote}
          editor={true}
        />
      )}

      {createNote && (
        <NoteEditWindow
          setCreateNote={setCreateNote}
          editor={false}
          saveNote={addNewNote}
        />
      )}

      {notesFromServer && (
        <NotesTable
          notesFromServer={notesFromServer}
          setEditNote={setEditNote}
          setCreateNote={setCreateNote}
        />
      )}
    </div>
  );
};
