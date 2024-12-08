import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNavigationBar from "../BottomNavigationBar";
import MovieTasteButton from "../MovieTasteButton";
import BackButtonWithMypage from "../BackButtonWithMypage";

const MyMovie = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 상태로 movies 관리
  const [movies, setMovies] = useState(location.state?.movies || []); // 초기 상태를 location.state에서 가져옴

  const handleEditComplete = (updatedMovies) => {
    // 편집 완료 후 업데이트된 movies를 반영
    setMovies(updatedMovies);
  };

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
            onClick={() =>
              navigate("/mymovie/taste", { state: { movies, onEditComplete: handleEditComplete } })
            }
          >
            편집
          </button>
        </div>
        <div className="movie-rate-edit-container">
          <div className="movie-list">
            {movies.length > 0 ? (
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
              <p>등록된 영화가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default MyMovie;
