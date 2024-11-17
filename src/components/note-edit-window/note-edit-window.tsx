import React from 'react';

import { Button, Select, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { NoteWithId } from '../../store/note-slice';

export const NoteEditWindow = ({
  editedNote,
  onSaveNote,
  setEditNote,
  setCreateNote,
  isEditor,
}: {
  setEditNote?: React.Dispatch<React.SetStateAction<NoteWithId | undefined>>;
  editedNote?: NoteWithId;
  onSaveNote: (e: NoteWithId) => void;
  setCreateNote?: React.Dispatch<React.SetStateAction<boolean>>;
  isEditor: boolean;
}) => {
  const selectOptions = [
    { value: 'Ожидание', label: 'Ожидание' },
    { value: 'Отклонен', label: 'Отклонен' },
    { value: 'Принят', label: 'Принят' },
  ];
  const goBack = () => {
    if (isEditor && setEditNote) {
      setEditNote(undefined);
    } else if (!isEditor && setCreateNote) {
      setCreateNote(false);
    }
  };
  return (
    <div onClick={goBack} className="editWindowWrapper">
      <div onClick={(e) => e.stopPropagation()} className="editWindow">
        <Form
          initialValues={
            isEditor
              ? {
                  company: editedNote?.company,
                  vacancy: editedNote?.vacancy,
                  salary: editedNote?.salary,
                  note: editedNote?.note,
                  response: editedNote?.response,
                }
              : {}
          }
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onSaveNote}
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
              <Select options={selectOptions} />
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
