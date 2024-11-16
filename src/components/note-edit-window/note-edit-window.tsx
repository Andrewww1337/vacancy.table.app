import React from 'react';

import { Button, Select, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { SaveNoteTypes } from '../../types/edit-types';
import { Note } from '../../store/note-slice';

export const NoteEditWindow = ({
  editNote,
  saveNote,
  setEditNote,
  setCreateNote,
  editor,
}: {
  setEditNote?: React.Dispatch<React.SetStateAction<Note | undefined>>;
  editNote?: Note;
  saveNote: (e: SaveNoteTypes) => void;
  setCreateNote?: React.Dispatch<React.SetStateAction<boolean>>;
  editor: boolean;
}) => {
  const goBack = () => {
    if (editor && setEditNote) {
      setEditNote(undefined);
    } else if (!editor && setCreateNote) {
      setCreateNote(false);
    }
  };
  return (
    <div onClick={goBack} className="editWindowWrapper">
      <div onClick={(e) => e.stopPropagation()} className="editWindow">
        <Form
          initialValues={
            editor
              ? {
                  company: editNote?.company,
                  vacancy: editNote?.vacancy,
                  salary: editNote?.salary,
                  note: editNote?.note,
                  response: editNote?.response,
                }
              : {}
          }
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={saveNote}
          style={{ width: '100%' }}
        >
          <div className="editWindowItems">
            <Form.Item
              style={{ width: '45%' }}
              rules={[
                {
                  required: true,
                  message: 'Это поле не может быть пустым',
                },
              ]}
              name="company"
              label="Компания"
            >
              <Input />
            </Form.Item>
            <Form.Item
              style={{ width: '45%' }}
              rules={[
                {
                  required: true,
                  message: 'Это поле не может быть пустым',
                },
              ]}
              name="vacancy"
              label="Вакансия"
            >
              <Input />
            </Form.Item>
          </div>
          <div className="editWindowItems">
            <Form.Item
              style={{ width: '45%' }}
              name="salary"
              label="Зарплатная вилка"
              rules={[
                {
                  required: true,
                  message: 'Это поле не может быть пустым',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              style={{ width: '45%' }}
              rules={[
                {
                  required: true,
                  message: 'Это поле не может быть пустым',
                },
              ]}
              name="response"
              label="Статус отклика"
            >
              <Select
                options={[
                  { value: 'Ожидание', label: 'Ожидание' },
                  { value: 'Отклонен', label: 'Отклонен' },
                  { value: 'Принят', label: 'Принят' },
                ]}
              />
            </Form.Item>
          </div>
          <Form.Item
            style={{ width: '100%' }}
            rules={[
              {
                required: true,
                message: 'Это поле не может быть пустым',
              },
            ]}
            name="note"
            label="Заметка"
          >
            <TextArea />
          </Form.Item>

          <div className="editWindowButtons">
            <Button style={{ width: '45%' }} size="large" onClick={goBack}>
              Назад
            </Button>
            <Button
              style={{ width: '45%' }}
              type="primary"
              size="large"
              htmlType="submit"
            >
              Сохранить
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
