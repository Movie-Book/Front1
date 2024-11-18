import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import BottomNavigationBar from "../BottomNavigationBar";

const EditUser = () => {
  const navigate = useNavigate(); 

  return (
    <div>
      <div className="Logo">
        <img  onClick={() => navigate(-1)}  className="back" src="/image/back.png" alt="back" />
        <h3 className="info">회원정보 수정</h3>
      </div>
      <div className="profile-container">
        <form className="edit-user-form">
          <label>아이디</label>
          <input type="text" className="signup-input" readOnly />
          <label>비밀번호</label>
          <input type="password" className="signup-input" />
          <label>이름</label>
          <input type="text" className="signup-input" />
          <label>이메일 주소</label>
          <input type="email" className="signup-input" />
          <button type="submit" className="signup-button">수정</button>
        </form>
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default EditUser;


