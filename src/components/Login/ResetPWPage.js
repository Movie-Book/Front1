import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from "../../components/Logo";


const ResetPWPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    password: '',
    confirmPassword: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const validatePassword = () => {
    let errors = { password: '', confirmPassword: '' };

    if (!password) {
      errors.password = '비밀번호를 입력해주세요.';
    }

    if (!confirmPassword) {
      errors.confirmPassword = '비밀번호를 확인해주세요.';
    }

    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrorMessage(errors);

    return !errors.password && !errors.confirmPassword;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (validatePassword()) {
      try {
        const response = await axios.post('http://35.216.42.151:8080/user/reset-pw', {
          id: userId,
          password: password,
          rePassword: confirmPassword,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
          }
        });

        if (response.status === 200) {
          setSuccessMessage('비밀번호가 성공적으로 변경되었습니다!');
          setErrorMessage({ password: '', confirmPassword: '' });
        }
      } catch (error) {
        if (error.response) {
          setErrorMessage({ password: error.response.data || '비밀번호 재설정에 실패했습니다.' });
        } else {
          setErrorMessage({ password: '서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.' });
        }
      }
    }
  };

  return (
    <div className="reset-pw-container">
      <Logo/>
      <form className="reset-pw-form" onSubmit={handleResetPassword}>
        <h3 className='reset-pw-title'>비밀번호 재설정</h3>
        <input 
          type="text" 
          placeholder="아이디" 
          className="reset-pw-input" 
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="비밀번호" 
          className="reset-pw-input" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage.password && <p className="error-message">{errorMessage.password}</p>}
        
        <input 
          type="password" 
          placeholder="비밀번호 확인" 
          className="reset-pw-input" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errorMessage.confirmPassword && <p className="error-message">{errorMessage.confirmPassword}</p>}
        
        <button 
          type="submit" 
          className="reset-pw-button"
        >
          비밀번호 재설정
        </button>
        
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="back-login">
          <a href="#" onClick={() => navigate('/login/')}>로그인</a> | 
          <a href="#" onClick={() => navigate('/login/signin')}>회원가입</a>
        </div>
      </form>
    </div>
  );
};

export default ResetPWPage;

