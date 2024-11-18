import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigationBar from "../../components/BottomNavigationBar";

function EditFavoriteGenre() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();
  const genres = [
    { genre: "액션", poster: "https://image.tmdb.org/t/p/w400/cadVm6gKYYukmPysHGCwrawUHHa.jpg" },
    { genre: "드라마", poster: "https://image.tmdb.org/t/p/w400/oAt6OtpwYCdJI76AVtVKW1eorYx.jpg" },
    { genre: "코미디", poster: "https://image.tmdb.org/t/p/w400/jbHNkNydiZstlqhhBSvG19lm4NL.jpg" },
    { genre: "로맨스", poster: "https://image.tmdb.org/t/p/w400/ntdgcdsmMuHd9s4oEKTvWDiUyU7.jpg" },
    { genre: "스릴러", poster: "https://image.tmdb.org/t/p/w400/izzk8dbmrLowcoGbFaebqJvzyXg.jpg" },
    { genre: "호러", poster: "https://image.tmdb.org/t/p/w400/k9AKtgRErXjz14lFHL2IJVCgwOT.jpg" },
    { genre: "SF", poster: "https://image.tmdb.org/t/p/w400/gDN2NWtHbs8ZWEBQM8Dh5OVXdb4.jpg" },
    { genre: "판타지", poster: "https://image.tmdb.org/t/p/w400/1ItejykqHTbFWbZXdzqlvqriv7K.jpg" },
    { genre: "애니메이션", poster: "https://image.tmdb.org/t/p/w400/ft5SBKI0MFZpdW1tlG75XD9JeHO.jpg" },
    { genre: "다큐멘터리", poster: "https://image.tmdb.org/t/p/w400/amdtSKEESxhst5Q2XOUvqdG3Q86.jpg" },
    { genre: "범죄", poster: "https://image.tmdb.org/t/p/w400/xYnL0kA0V7aDvg8wupmWQbdgb9a.jpg" },
  ];

  const toggleGenreSelection = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="edit-favorite-genre">
        <div className="Logo">
        <img onClick={() => navigate(-1)} className="back" src="/image/back.png" alt="back" />
        <h3 className="info">내 장르 편집</h3>
        <img onClick={() => navigate("/profile")} className="mypage" src="/image/mypage.png" alt="mypage" />
        </div>
        <h4 className="genre-info">좋아하는 장르를 선택해주세요.</h4>
      <div className="genre-container">
        {genres.map((g) => (
          <div
            key={g.genre}
            className={`genre-item ${selectedGenres.includes(g.genre) ? "selected" : ""}`}
            onClick={() => toggleGenreSelection(g.genre)}
          >
            <img src={g.poster} alt={g.genre} className="genre-poster" />
            <p className="genre-name">{g.genre}</p>
          </div>
        ))}
      </div>
      <button className="save-button" onClick={()=>{}}>
        저장
      </button>
      <BottomNavigationBar />
    </div>
  );
}

export default EditFavoriteGenre;
