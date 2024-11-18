import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import BottomNavigationBar from "../BottomNavigationBar";

const MyPage = () => {
  const navigate = useNavigate(); 
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // 서버에서 사용자 아이디를 받아오는 로직을 여기에 추가
    // 예시로 'user123'이라는 아이디를 가져온다고 가정
    const fetchUserId = async () => {
      // 실제 API 호출로 대체해야 함
      const fetchedId = 'user123';
      setUserId(fetchedId);
    };

    fetchUserId();
  }, []);

  return (
    <div>
      <div className="Logo">
        <img  onClick={() => navigate(-1)}  className="back" src="/image/back.png" alt="back" />
        <h3 className="info">내 정보</h3>
      </div>
      <div className="profile-container">
        <div className="welcome-message">안녕하세요! @{userId}님</div>
        <hr className="separator" />
        <ul className="mypage-menu">
          <li onClick={() => navigate('/profile/edit-user')}>회원정보 수정</li>
          <li onClick={() => navigate('/profile/friend-list')}>친구 목록</li> 
          <li>환경설정</li>
        </ul>
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default MyPage;

