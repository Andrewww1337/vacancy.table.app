import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';

import { deleteNote } from '../../store/note-slice';
import { useAppDispatch } from '../../store/hooks';
import { Note } from '../../store/note-slice';

interface DataType {
  key: string;
  company: string;
  vacancy: string;
  salary: string;
  response: string;
  note: string;
}

type DataIndex = keyof DataType;

export const NotesTable = ({
  setEditNote,
  notesFromServer,
  setCreateNote,
}: {
  setEditNote: React.Dispatch<React.SetStateAction<Note | undefined>>;
  notesFromServer: Note[];
  setCreateNote: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const transformNotes = notesFromServer?.map((note) => ({
    company: note.company,
    vacancy: note.vacancy,
    salary: note.salary,
    response: note.response,
    note: note.note,
    id: note._id,
    key: note._id,
  }));
  const dispatch = useAppDispatch();
  const data: DataType[] = transformNotes;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [deleteNotes, setDeleteNotes] = useState<React.Key[]>();
  const searchInput = useRef<InputRef>(null);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setDeleteNotes(selectedRowKeys);
    },
    getCheckboxProps: (record: DataType) => ({
      name: record.key,
    }),
  };
  const getDeleteNotes = () => {
    if (deleteNotes) {
      dispatch(deleteNote(deleteNotes.map(String)));
    }
  };

  const openNote = (noteId: string) => {
    const selectedNote = notesFromServer.find((note) => note._id === noteId);
    setEditNote(selectedNote);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div className="searchTableMenu" onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Компания',
      dataIndex: 'company',
      key: 'company',
      ...getColumnSearchProps('company'),
    },
    {
      title: 'Вакансия',
      dataIndex: 'vacancy',
      key: 'vacancy',
      ...getColumnSearchProps('vacancy'),
    },
    {
      title: 'Зарплатная вилка',
      dataIndex: 'salary',
      key: 'salary',
      ...getColumnSearchProps('salary'),
    },
    {
      title: 'Статус отклика',
      dataIndex: 'response',
      key: 'response',
      ...getColumnSearchProps('response'),
    },
    {
      title: 'Заметка',
      dataIndex: 'note',
      key: 'note',
      ...getColumnSearchProps('note'),
    },
  ];

  return (
    <div className="editTableWrapper">
      <Table
        pagination={{ pageSize: 15 }}
        className="editTable"
        bordered
        size="large"
        onRow={(record) => {
          return {
            onClick: () => {
              openNote(record.key);
            },
          };
        }}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
      {deleteNotes && deleteNotes.length > 0 && (
        <Button
          style={{ width: '10%', marginLeft: '20px' }}
          onClick={() => getDeleteNotes()}
        >
          Удалить
        </Button>
      )}
      <Button
        style={{
          width: '10%',
          marginLeft: '20px',
          backgroundColor: 'MediumSeaGreen',
          color: 'white',
        }}
        onClick={() => setCreateNote(true)}
      >
        Добавить
      </Button>
    </div>
  );
};
