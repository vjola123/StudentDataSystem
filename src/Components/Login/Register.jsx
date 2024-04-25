import React, { useState } from 'react';
import { Table, Button, Form, Input, Select, Checkbox, DatePicker, message } from 'antd';

const { Option } = Select;

const Register = ({ onCancel, onRegister }) => {
  const [dataSource, setDataSource] = useState([]);
  const [nid, setNid] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [averageGrade, setAverageGrade] = useState('');
  const [desiredProfession, setDesiredProfession] = useState('');
  const [educationInfo, setEducationInfo] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [date, setDate] = useState(null);
  const [otherInfo, setOtherInfo] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [registered, setRegistered] = useState(false); 

  const handleAddSubject = () => {
    const newSubject = { subjectName, subscribe, date: date ? date.format('YYYY-MM-DD') : '', otherInfo };
    setDataSource([...dataSource, newSubject]);
    setSubjectName('');
    setSubscribe(false);
    setDate(null);
    setOtherInfo('');
  };

  const handleRegister = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      message.error('Fjalekalimi duhet te permbaje te pakten nje germe te madhe, nje numer dhe te jete jo me pak se 8 karaktere!');
      return;
    }

    if (!nid || !password) {
      message.error('NID studenti dhe Fjalekalimi jane fusha të detyrueshme!');
      return;
    }

    const newUser = {
      id: Date.now(),
      nid,
      name,
      surname,
      password,
      averageGrade,
      desiredProfession,
      educationInfo,
      subjects: dataSource,
    };

    onRegister(newUser);

    const storedDataList = JSON.parse(localStorage.getItem('userDataList')) || [];
    localStorage.setItem('userDataList', JSON.stringify([...storedDataList, newUser]));

    message.success('Ju u rregjistruat me sukses!');

    setNid('');
    setName('');
    setSurname('');
    setPassword('');
    setAverageGrade('');
    setDesiredProfession('');
    setEducationInfo('');
    setDataSource([]);
    setSubjectName('');
    setSubscribe(false);
    setDate(null);
    setOtherInfo('');

    setShowForm(false);
   
    setRegistered(true);
  };

  return (
    <div className='container'>
      {!showForm && !registered && (
        <Button type="primary" onClick={() => setShowForm(true)}>Regjistrohu</Button>
      )}
      {showForm && !registered && (
        <Form>
          <Form.Item label="NID studenti" style={{ width: 400 }}>
            <Input value={nid} onChange={e => setNid(e.target.value)} />
          </Form.Item>
          <Form.Item label="Emer studenti" style={{ width: 400 }}>
            <Input value={name} onChange={e => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Mbiemer studenti" style={{ width: 400 }}>
            <Input value={surname} onChange={e => setSurname(e.target.value)} />
          </Form.Item>
          <Form.Item label="Fjalekalimi" style={{ width: 400 }}>
            <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item label="Nota mesatare" style={{ width: 400 }}>
            <Select style={{ width: 200 }} defaultValue="Nota mesatare" onChange={setAverageGrade}>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
              <Option value="6">6</Option>
              <Option value="7">7</Option>
              <Option value="8">8</Option>
              <Option value="9">9</Option>
              <Option value="10">10</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Profesioni i deshiruar" style={{ width: 400 }}>
            <Input value={desiredProfession} onChange={e => setDesiredProfession(e.target.value)} />
          </Form.Item>
          <Form.Item label="Arsimi" style={{ width: 400 }}>
            <Select style={{ width: 400 }} defaultValue="Zgjidh llojin e arsimit" onChange={setEducationInfo}>
              <Option value="arsim_i_larte">Arsim i larte</Option>
              <Option value="arsim_i_mesem">Arsim i mesem</Option>
              <Option value="profesional">Arsim Profesional</Option>
              <Option value="gjimnaz">Gjimnaz</Option>
              <Option value="tjeter">Tjeter</Option>
            </Select>
          </Form.Item>
          <Form.Item  style={{ width: 500 }}>
            <Input value={subjectName} onChange={e => setSubjectName(e.target.value)} placeholder="Te dhena te pergjithshme" />
           
            <DatePicker value={date} onChange={setDate} placeholder="Data" />
            {dataSource.length < 3 ? (
              <Select style={{ width: 200 }} defaultValue="Zgjidh llojin e lëndës" onChange={value => console.log(value)}>
                <Option value="arte_te_vecanta">Arte te vecanta</Option>
                <Option value="arte_jo_te_vecanta">Arte jo te vecanta</Option>
                <Option value="arte_te_thjeshta">Arte te thjeshta</Option>
              </Select>
            ) : (
              <Select style={{ width: 200 }} defaultValue="Zgjidh llojin e lendes" onChange={value => console.log(value)}>
                <Option value="arte_te_tjera">Arte te tjera </Option>
              </Select>
            )}
            <Input value={otherInfo} onChange={e => setOtherInfo(e.target.value)} placeholder="Info te tjera" />
            <Button onClick={handleAddSubject}>Shto Lenden</Button>
            <ul>
              {dataSource.map((subject, index) => (
                <li key={index}>
                  Lenda: {subject.subjectName}, Subscribe: {subject.subscribe ? 'Po' : 'Jo'}, Data: {subject.date}, Info te tjera: {subject.otherInfo}
                </li>
              ))}
            </ul>
          </Form.Item>
          <Checkbox className='checkbox' checked={subscribe} onChange={e => setSubscribe(e.target.checked)}>Subscribe</Checkbox>
          <Form.Item style={{ width: 400 }}>
            <Button type="primary" onClick={handleRegister}>Regjistrohu</Button>
            
            <Button onClick={() => { window.location.href = '/login'; }} style={{ marginLeft: '10px' }}>Anullo</Button>

          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Register;
