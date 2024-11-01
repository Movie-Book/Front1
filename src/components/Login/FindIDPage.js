import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../components/Logo";
import axios from 'axios';

const FindIDPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFindId = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://35.216.42.151:8080/user/find-id`, {
        params: {
          userName: name,
          email: email,
        },
        headers: {
          'accept': 'application/json',
        },
      });

      if (response.status === 200) {
        setUserId(response.data); 
        setErrorMessage('');  
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data || '아이디를 찾을 수 없습니다.');
        setUserId(''); 
      } else {
        setErrorMessage('서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="find-id-container">
      <Logo/>
      <form className="find-id-form" onSubmit={handleFindId}>
        <h3 className='find-id-title'>아이디 찾기</h3>
        <input 
          type="text" 
          placeholder="이름" 
          className="find-id-input" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="이메일주소" 
          className="find-id-input" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button type="submit" className="find-id-button">아이디 찾기</button>
        {userId && <p className="success-message">{userId}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="back-login">
          <a href="#" onClick={() => navigate('/profile/')}>로그인</a> | 
          <a href="#" onClick={() => navigate('/profile/signin')}>회원가입</a>
        </div>
      </form>
    </div>
  );
};

export default FindIDPage;
