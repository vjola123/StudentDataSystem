import React from 'react';
import { Menu } from 'antd';

const Navbar = () => {
  const handleLoginClick = () => {
    
    window.location.href = '/login';
  };

  const handleRegisterClick = () => {
    
    window.location.href = '/register';
  };

  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ display: 'flex' }}>
      <Menu.Item key="1" onClick={handleLoginClick} style={{ marginRight: '10px' }}>
        <h2>Home</h2>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleRegisterClick} style={{ marginLeft: 'auto' }}>
        <h2>Login</h2>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
