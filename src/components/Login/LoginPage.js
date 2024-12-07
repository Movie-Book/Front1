import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from "../../components/Logo";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // "로그인 유지" 체크 상태


  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      id: username,
      password: password,
    };

    try {
      const response = await axios.post('http://35.216.42.151:8080/api/v1/user/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json' 
        },
      });

      if (response.status === 200) {
        // 로그인 성공 시 토큰 및 유저 ID 저장
        if (rememberMe) {
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem('userId', username); // 유저 ID 저장
        } else {
          sessionStorage.setItem('token', response.data.accessToken);
          sessionStorage.setItem('userId', username); // 유저 ID 저장
        }
        console.log(localStorage.getItem('token') || sessionStorage.getItem('token'));
        console.log(localStorage.getItem('userId') || sessionStorage.getItem('userId'));
        
        const exist = await axios.get("http://35.216.42.151:8080/api/v1/genre/like", {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')||sessionStorage.getItem('token')}`,
          },
        });
        console.log(exist.data.length);

        if(exist.data.length > 0){
          navigate('/home'); // 로그인 성공 후 홈으로 이동
        }
        else{
          navigate('/movieGenre');
        }
      }
    } catch (error) {
      if (error.response) {
        // 서버 응답이 있는 경우
        if (error.response.status === 409) {
          setErrorMessage('올바르지 않은 로그인입니다.');
        } else {
          setErrorMessage(error.response.data.message || '로그인에 실패했습니다.');
        }
      } else {
        // 네트워크 또는 기타 오류
        console.error('Error:', error);
        setErrorMessage('서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="login-container">
      <Logo />
      <form className="login-form" onSubmit={handleLogin}>
        <h3 className="login-title">로그인</h3>
        <input
          type="text"
          placeholder="아이디"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="remember-me">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me">로그인 유지</label>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="login-button">
          로그인
        </button>
        <button
          type="button"
          className="signin-button"
          onClick={() => navigate('/login/signin')}
        >
          회원가입
        </button>
        <div className="helper-links">
          <a href="#" onClick={() => navigate('/login/find-id')}>
            아이디 찾기
          </a>{' '}
          |{' '}
          <a href="#" onClick={() => navigate('/login/reset-pw')}>
            비밀번호 찾기
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
