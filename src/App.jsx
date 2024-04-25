import React, { useState } from 'react';
import Navbar from './Components/Login/Navbar';
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import Home from './Components/Home/Home';




function App() {
  const [userDataList, setUserDataList] = useState([]);

  const handleRegister = (userData) => {
    setUserDataList([...userDataList, userData]);
  };

  return (
    <div className="App">
      <Navbar />
      <Login />
      <Register onRegister={handleRegister} />
      {userDataList.length > 0 && <Home userDataList={userDataList}  />}
    </div>
  );
}

export default App;