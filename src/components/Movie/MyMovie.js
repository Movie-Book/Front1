import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNavigationBar from "../BottomNavigationBar";
import MovieTasteButton from "../MovieTasteButton";
import BackButtonWithMypage from "../BackButtonWithMypage";

const MyMovie = () => {
  const navigate = useNavigate();
  const location = useLocation();


  // 영화 데이터
  const movies = location.state.movies

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
            <button className="my-movie-edit-button" onClick={() => navigate("/mymovie/taste", { state: { movies } })}>편집</button>
        </div>
        <div className="movie-rate-edit-container">
          <div className="movie-list">
            {movies.map((movie) => (
              <MovieTasteButton
                key={movie.movieId}
                moviePoster={movie.poster}
                movieTitle={movie.movieName}
                rate={movie.rating || 0} 
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
