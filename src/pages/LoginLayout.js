import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../components/Login/LoginPage';
import SignInPage from '../components/Login/SignInPage';
import FindIDPage from '../components/Login/FindIDPage';
import ResetPWPage from '../components/Login/ResetPWPage';
import '../css/LoginLayout.css';

const LoginLayout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="find-id" element={<FindIDPage />} />
        <Route path="reset-pw" element={<ResetPWPage />} />
      </Routes>
    </div>
  );
};

export default LoginLayout;