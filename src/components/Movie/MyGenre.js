import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigationBar from "../../components/BottomNavigationBar";
import BackButtonWithMypage from "../BackButtonWithMypage";

function MyGenre() {
  const navigate = useNavigate();

  const favoriteGenres = [
    { poster: "https://image.tmdb.org/t/p/w400/cadVm6gKYYukmPysHGCwrawUHHa.jpg", genre: "액션" },
    { poster: "https://image.tmdb.org/t/p/w400/oAt6OtpwYCdJI76AVtVKW1eorYx.jpg", genre: "드라마" },
    { poster: "https://image.tmdb.org/t/p/w400/jbHNkNydiZstlqhhBSvG19lm4NL.jpg", genre: "코미디" },
  ];

  const hateGenres = [
    { poster: "https://image.tmdb.org/t/p/w400/ntdgcdsmMuHd9s4oEKTvWDiUyU7.jpg", genre: "로맨스" },
    { poster: "https://image.tmdb.org/t/p/w400/izzk8dbmrLowcoGbFaebqJvzyXg.jpg", genre: "스릴러" },
    { poster: "https://image.tmdb.org/t/p/w400/ft5SBKI0MFZpdW1tlG75XD9JeHO.jpg", genre: "애니메이션" },
  ];

  return (
    <div>
       {/*<div className="Logo">
        <img onClick={() => navigate(-1)}className="back" src="/image/back.png"alt="back"/>
        <h3 className="info">내 장르</h3>
        <img onClick={() => navigate("/profile")} className="mypage" src="/image/mypage.png" alt="mypage"/>
      </div>*/}
      <BackButtonWithMypage title="내 장르"/>

      <div className="container">
      <div className="genre-button">
        <div className="noEditButton">        
            <a href="#" className="movie-genre-switch" onClick={() => navigate("/mymovie")}>영화 |</a><a>&nbsp;장르</a>
        </div>
      </div>
      <div>
        <div className="genre-section">
            <div className="genre-button">
                <h3>내 선호 장르</h3>
                <button className="my-movie-edit-button" onClick={() => navigate("/mymovie/editFavoriteGenre")}>편집</button>
            </div>
          <div className="genre-list">
            {favoriteGenres.map((genre, index) => (
              <div key={index} className="genre-card">
                <img className="genre-poster" src={genre.poster} alt={genre.genre} />
                <h5 className="genre-name">{genre.genre}</h5>
              </div>
            ))}
          </div>
        </div>
        <div className="genre-section">
            <div className="genre-button">
            <h3>내 불호 장르</h3>
            <button className="my-movie-edit-button" onClick={() => navigate("/mymovie/editHateGenre")}>편집</button>
          </div>
          <div className="genre-list">
            {hateGenres.map((genre, index) => (
              <div key={index} className="genre-card">
                <img className="genre-poster" src={genre.poster} alt={genre.genre} />
                <h5 className="genre-name">{genre.genre}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      <BottomNavigationBar />
    </div>
  );
}

export default MyGenre;