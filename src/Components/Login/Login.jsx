import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import Home from '../Home/Home';


const Login = () => {
  const [nid, setNid] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userExists, setUserExists] = useState(true);

  // Funksioni për verifikimin e përdoruesit
  const verifyUser = (nid, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('userDataList')) || [];
    const foundUser = storedUsers.find(user => user.nid === nid && user.password === password);
    return foundUser;
  };

  const handleLogin = () => {
    const foundUser = verifyUser(nid, password);
    if (foundUser) {
      message.success('Ju jeni identifikuar me sukses!');
      setLoggedIn(true);
    } else {
      message.error('Nuk ekziston perdorues me kredencialet e dhena!');
      setLoggedIn(false);
    }
  };

  return (
    <div className='container'>
      <h1>Menaxhimi i te dhenave studentore</h1>
      <Form>
        <Form.Item label="NID student" style={{ width: 400 }}>
          <Input value={nid} onChange={e => setNid(e.target.value)} />
        </Form.Item>
        <Form.Item label="Fjalëkalimi" style={{ width: 405 }}>
          <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleLogin}>Identifikohu</Button>
        </Form.Item>
      </Form>
      {loggedIn && <Home />}
      {!loggedIn && <p></p>}
    </div>
  );
};

export default Login;
