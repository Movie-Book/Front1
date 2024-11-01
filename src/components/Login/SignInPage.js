import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from "../../components/Logo";

const SignInPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    const signUpData = {
      id: username,
      password: password,
      userName: name,
      email: email,
    };
  
    // 비밀번호 유효성 검사
    const passwordPattern = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{8,16}$/;
    if (!passwordPattern.test(password)) {
      setErrorMessage('비밀번호는 영어 소문자, 숫자, 특수문자를 포함해야 합니다.(8~16자리)');
      return;
    }
  
    try {
      const response = await axios.post('http://35.216.42.151:8080/user/join', signUpData, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
      });
  
      if (response.status === 200) {
        alert('회원가입 성공');
        navigate('/login/');
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.replace('유효성 검사 오류: ', '');
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage('서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    }
  };
  

  return (
    <div className="signup-container">
      <Logo/>
      <form className="signup-form" onSubmit={handleSignIn}>
        <h3 className='signup-title'>회원가입</h3>
        <input
          type="text"
          placeholder="아이디"
          className="signup-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="이름"
          className="signup-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="이메일주소"
          className="signup-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>} 
        <button type="submit" className="signup-button">회원가입</button>
        <div className="back-login">
          <a href="#" onClick={() => navigate('/login/')}>이미 계정이 있으신가요?</a>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;

