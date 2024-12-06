import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNavigationBar from "../BottomNavigationBar";
import MovieTasteButton from "../MovieTasteButton";
import BackButtonWithMypage from "../BackButtonWithMypage";

const MyMovie = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state가 undefined인 경우를 처리
  const movies = location.state?.movies || []; // movies가 undefined라면 빈 배열로 대체

  return (
    <div>
      <BackButtonWithMypage title={"내 영화 편집"} />
      <div className="container">
        <div className="genre-button">
          <div>
            <a>영화 |</a>
            <a
              href="#"
              className="movie-genre-switch"
              onClick={() => navigate("/mymovie/genre")}
            >
              &nbsp;장르
            </a>
          </div>
          <button
            className="my-movie-edit-button"
            onClick={() => navigate("/mymovie/taste", { state: { movies } })}
          >
            편집
          </button>
        </div>
        <div className="movie-rate-edit-container">
          <div className="movie-list">
            {movies.length > 0 ? ( // 영화 데이터가 있는 경우와 없는 경우를 구분
              movies.map((movie) => (
                <MovieTasteButton
                  key={movie.movieId}
                  moviePoster={movie.poster}
                  movieTitle={movie.movieName}
                  rate={movie.rating || 0}
                  rating={false}
                />
              ))
            ) : (
              <p>등록된 영화가 없습니다.</p> // 데이터가 없을 때의 메시지
            )}
          </div>
        </div>
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default MyMovie;
