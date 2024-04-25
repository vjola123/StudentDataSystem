import React from 'react';
import { Table, Button, Popconfirm, message } from 'antd';

const UserTable = ({ userDataList, onDelete, onEdit }) => {
  const handleDelete = (id) => {
    onDelete(id);
    message.success('Përdoruesi u fshi me sukses!');
  };

  const handleEdit = (record) => {
    onEdit(record);
  };

  const columns = [
    {
      title: 'NID studenti',
      dataIndex: 'nid',
      key: 'nid',
    },
    {
      title: 'Emer studenti',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mbiemer studenti',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Nota mesatare',
      dataIndex: 'averageGrade',
      key: 'averageGrade',
    },
    {
      title: 'Profesioni i deshiruar',
      dataIndex: 'desiredProfession',
      key: 'desiredProfession',
    },
    {
      title: 'Te dhena te pergjithshme te shkollimit',
      dataIndex: 'educationInfo',
      key: 'educationInfo',
    },
    {
      title: 'Lendet',
      children: [
        {
          title: 'Lenda',
          dataIndex: 'subjectName',
          key: 'subjectName',
        },
        
        {
          title: 'Data',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Info te tjera',
          dataIndex: 'otherInfo',
          key: 'otherInfo',
        },
      ],
    },
    {
      title: 'Veprime',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="A jeni i sigurt qe deshironi te fshini kete perdorues?"
            onConfirm={() => handleDelete(record.id)}
            okText="Po"
            cancelText="Jo"
          >
            <Button type="danger">Fshi</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={userDataList} rowKey="id" />
  );
};

export default UserTable;
