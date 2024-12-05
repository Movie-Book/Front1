import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BottomNavigationBar from "../BottomNavigationBar";
import YesNoModal from "../YesNoModal"; // YesNoModal 컴포넌트 import

const MyPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  useEffect(() => {
    // localStorage 또는 sessionStorage에서 유저 ID를 가져옴
    const fetchUserId = async () => {
      const storedId = localStorage.getItem("userId") || sessionStorage.getItem("userId");

      if (storedId) {
        setUserId(storedId); // 유저 ID 설정
      } else {
        setErrorMessage("유저 정보를 가져오는 데 실패했습니다.");
      }
    };

    fetchUserId();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) throw new Error("JWT 토큰이 없습니다.");

      const response = await axios.post(
        "http://35.216.42.151:8080/api/v1/user/logout",
        {}, // POST 요청 시 빈 객체 전달
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${token}`, // JWT 토큰 추가
          },
        }
      );

      console.log("Logout successful:", response.data); // 로그아웃 성공 로그
      localStorage.removeItem("token");
      localStorage.removeItem("userId"); // 로그아웃 시 유저 ID 삭제
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      if (error.response) {
        const serverErrorMessage =
          error.response.data?.error || "알 수 없는 서버 오류가 발생했습니다.";
        setErrorMessage(`로그아웃 실패: ${serverErrorMessage}`);
        console.error("서버 응답 오류:", error.response.data);
      } else {
        console.error("요청 오류:", error.message);
        setErrorMessage("로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true); // 로그아웃 버튼 클릭 시 모달 열기
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false); // 모달 닫기
    handleLogout(); // 로그아웃 실행
  };

  const handleModalCancel = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div>
      <div className="Logo">
        <img
          onClick={() => navigate(-1)}
          className="back"
          src="/image/back.png"
          alt="back"
        />
        <h3 className="info">내 정보</h3>
      </div>
      <div className="profile-container">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="welcome-message">안녕하세요! {userId}님</div>
        <hr className="separator" />
        <ul className="mypage-menu">
          <li onClick={() => navigate("/profile/edit-user")}>회원정보 수정</li>
          <li onClick={() => navigate("/profile/friend-list")}>친구 목록</li>
          <li onClick={handleLogoutClick}>로그아웃</li>
          <li>환경설정</li>
        </ul>
      </div>
      <BottomNavigationBar />

      <YesNoModal
        isOpen={isModalOpen}
        message="로그아웃하시겠습니까?"
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </div>
  );
};

export default MyPage;
