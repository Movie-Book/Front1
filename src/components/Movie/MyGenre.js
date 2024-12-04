import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigationBar from "../../components/BottomNavigationBar";
import BackButtonWithMypage from "../BackButtonWithMypage";

// 장르 목록 (ID와 이름 및 포스터 URL 매칭)
const genreList = [
  { id: 1, name: "액션", posterUrl: "https://image.tmdb.org/t/p/w400/cadVm6gKYYukmPysHGCwrawUHHa.jpg" },
  { id: 2, name: "드라마", posterUrl: "https://image.tmdb.org/t/p/w400/oAt6OtpwYCdJI76AVtVKW1eorYx.jpg" },
  { id: 3, name: "코미디", posterUrl: "https://image.tmdb.org/t/p/w400/jbHNkNydiZstlqhhBSvG19lm4NL.jpg" },
  { id: 4, name: "로맨스", posterUrl: "https://image.tmdb.org/t/p/w400/ntdgcdsmMuHd9s4oEKTvWDiUyU7.jpg" },
  { id: 5, name: "스릴러", posterUrl: "https://image.tmdb.org/t/p/w400/izzk8dbmrLowcoGbFaebqJvzyXg.jpg" },
  { id: 6, name: "호러", posterUrl: "https://image.tmdb.org/t/p/w400/k9AKtgRErXjz14lFHL2IJVCgwOT.jpg" },
  { id: 7, name: "SF", posterUrl: "https://image.tmdb.org/t/p/w400/gDN2NWtHbs8ZWEBQM8Dh5OVXdb4.jpg" },
  { id: 8, name: "판타지", posterUrl: "https://image.tmdb.org/t/p/w400/1ItejykqHTbFWbZXdzqlvqriv7K.jpg" },
  { id: 9, name: "애니메이션", posterUrl: "https://image.tmdb.org/t/p/w400/ft5SBKI0MFZpdW1tlG75XD9JeHO.jpg" },
  { id: 10, name: "다큐멘터리", posterUrl: "https://image.tmdb.org/t/p/w400/amdtSKEESxhst5Q2XOUvqdG3Q86.jpg" },
  { id: 11, name: "범죄", posterUrl: "https://image.tmdb.org/t/p/w400/xYnL0kA0V7aDvg8wupmWQbdgb9a.jpg" },
];

function MyGenre() {
  const navigate = useNavigate();
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [hateGenres, setHateGenres] = useState([]);
  const jwtToken = localStorage.getItem("token"); // 토큰 정보 가져오기

  // 선호 장르 가져오기
  const fetchFavoriteGenres = async () => {
    try {
      const response = await axios.get("http://35.216.42.151:8080/api/v1/genre/like", {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      // ID를 이름 및 포스터로 변환
      const favoriteData = response.data.map((id) => genreList.find((g) => g.id === id));
      setFavoriteGenres(favoriteData);
    } catch (error) {
      handleError(error);
    }
  };

  // 비선호 장르 가져오기
  const fetchHateGenres = async () => {
    try {
      const response = await axios.get("http://35.216.42.151:8080/api/v1/genre/dislike", {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      // ID를 이름 및 포스터로 변환
      const hateData = response.data.map((id) => genreList.find((g) => g.id === id));
      setHateGenres(hateData);
    } catch (error) {
      handleError(error);
    }
  };

  // 에러 처리 공통 함수
  const handleError = (error) => {
    if (error.response) {
      console.error("API 요청 오류:", error.response.data.message || error.response.status);
    } else {
      console.error("네트워크 또는 기타 오류:", error);
    }
  };

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    if (jwtToken) {
      fetchFavoriteGenres();
      fetchHateGenres();
    } else {
      console.error("유효한 JWT 토큰이 없습니다.");
    }
  }, [jwtToken]);

  return (
    <div>
      <BackButtonWithMypage title="내 장르" />
      <div className="container">
      <div className="genre-button">
          <div>
            <a href="#" className="movie-genre-switch"  onClick={() => navigate("/mymovie")}>영화 |</a> <a>&nbsp;장르</a>
          </div>
        </div>
        <div className="genre-section">
          <div className="genre-header">
            <h3>내 선호 장르</h3>
            <button className="my-movie-edit-button" onClick={() => navigate("/mymovie/editFavoriteGenre")}>
              편집
            </button>
          </div>
          <div className="genre-list">
            {favoriteGenres.map((genre, index) => (
              <div key={index} className="genre-card">
                <img src={genre?.posterUrl} alt={genre?.name} />
                <h5>{genre?.name}</h5>
              </div>
            ))}
          </div>
        </div>

        {/* 비선호 장르 */}
        <div className="genre-section">
          <div className="genre-header">
            <h3>내 비선호 장르</h3>
            <button className="my-movie-edit-button" onClick={() => navigate("/mymovie/editHateGenre")}>
              편집
            </button>
          </div>
          <div className="genre-list">
            {hateGenres.map((genre, index) => (
              <div key={index} className="genre-card">
                <img src={genre?.posterUrl} alt={genre?.name} />
                <h5>{genre?.name}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNavigationBar />
    </div>
  );
}

export default MyGenre;
