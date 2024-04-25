import React, { useState, useEffect } from 'react';
import {Button, message, Modal, Form, Input } from 'antd';
import UserTable from './UserTable'; // Importo komponentin e ri UserTable

const Home = ({  }) => {
  const [userDataList, setUserDataList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedUserDataList = JSON.parse(localStorage.getItem('userDataList')) || [];
    setUserDataList(storedUserDataList);
  }, []);

  const handleDelete = (id) => {
    const updatedUserDataList = userDataList.filter(user => user.id !== id);
    localStorage.setItem('userDataList', JSON.stringify(updatedUserDataList));
    setUserDataList(updatedUserDataList);
    message.success('Perdoruesi u fshi me sukses!');
  };

  const handleEdit = (userData) => {
    setEditUserData(userData);
    setIsModalVisible(true);
    form.setFieldsValue(userData);
  };

  const handleEditOk = () => {
    form.validateFields()
      .then(values => {
        const updatedUserDataList = userDataList.map(user => {
          if (user.id === editUserData.id) {
            return { ...user, ...values };
          }
          return user;
        });
        localStorage.setItem('userDataList', JSON.stringify(updatedUserDataList));
        setUserDataList(updatedUserDataList);
        setIsModalVisible(false);
        message.success('Te dhenat u axhornuan me sukses!');
      })
      .catch(error => {
        console.error('Gabim gjate validimit:', error);
      });
  };

  const handleEditCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: 'NID studenti',
      dataIndex: 'nid',
      key: 'nid',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Emër studenti',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mbiemër studenti',
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
          dataIndex: 'subject',
          key: 'subject',
        },
        {
          title: 'Subscribe',
          dataIndex: 'subscribe',
          key: 'subscribe',
          render: (text) => <span>{text ? 'Po' : 'Jo'}</span>,
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
          <Button type="danger" onClick={() => handleDelete(record.id)}>Fshi</Button>
        </div>
      ),
    },
  ];

  const goToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div>
      
      <UserTable userDataList={userDataList} onDelete={handleDelete} onEdit={handleEdit} />

      <Modal
        title="Edito te dhenat"
        visible={isModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form
          form={form}
          layout="vertical"
          name="editForm"
          initialValues={editUserData}
        >
          <Form.Item label="NID studenti" name="nid" rules={[{ required: true, message: 'Ju lutem shkruani NID studentit!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Emer studenti" name="name" rules={[{ required: true, message: 'Ju lutem shkruani emrin e studentit!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mbiemer studenti" name="surname" rules={[{ required: true, message: 'Ju lutem shkruani mbiemrin e studentit!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Nota mesatare" name="averageGrade">
            <Input />
          </Form.Item>
          <Form.Item label="Profesioni i deshiruar" name="desiredProfession">
            <Input />
          </Form.Item>
          <Form.Item label="Te dhena te pergjithshme te shkollimit" name="educationInfo">
            <Input />
          </Form.Item>
        
        </Form>
      </Modal>
      <Button type="primary" onClick={goToLogin} style={{ float: 'right', backgroundColor: 'red' }}>Dil</Button>

    </div>
    
  );
};

export default Home;
