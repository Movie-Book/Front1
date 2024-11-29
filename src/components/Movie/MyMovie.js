import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigationBar from "../BottomNavigationBar";
import MovieTasteButton from "../MovieTasteButton";
import BackButtonWithMypage from "../BackButtonWithMypage";

const MyMovie = () => {
  const navigate = useNavigate();

  // 영화 데이터
  const movies = [
    { moviePoster: "/image/parasite.jpg", movieTitle: "Parasite" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "Inception" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "Interstellar" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "Avatar" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "Avengers" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "Titanic" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "Joker" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "Gladiator" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "etc" },
  ];

  // 별점 데이터 (초기값 설정)
  const [starRating] = useState({
    Parasite: 5,
    Inception: 4,
    Interstellar: 5,
    Avatar: 3,
    Avengers: 4,
    Titanic: 5,
    Joker: 2,
    Gladiator: 4,
    etc: 0,
  });

  return (
    <div>
       {/*<div className="Logo">
        <img onClick={() => navigate(-1)}className="back" src="/image/back.png"alt="back"/>
        <h3 className="info">내 영화 편집</h3>
        <img onClick={() => navigate("/profile")} className="mypage" src="/image/mypage.png" alt="mypage"/>
      </div>*/}
      <BackButtonWithMypage title={"내 영화 편집"}/>
      <div className="container">
        <div className="genre-button">
            <div>
            <a>영화 |</a><a href="#" className="movie-genre-switch" onClick={() => navigate("/mymovie/genre")}>&nbsp;장르</a>
            </div>
            <button className="my-movie-edit-button" onClick={() => navigate("/mymovie/taste", { state: { starRating } })}>편집</button>
        </div>
        <div className="movie-rate-edit-container">
          <div className="movie-list">
            {movies.map((movie) => (
              <MovieTasteButton
                key={movie.movieTitle}
                moviePoster={movie.moviePoster}
                movieTitle={movie.movieTitle}
                rate={starRating[movie.movieTitle] || 0} 
                rating={false}
            />
            ))}
          </div>
        </div>
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default MyMovie;
