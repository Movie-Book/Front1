import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNavigationBar from "../BottomNavigationBar";
import MovieTasteButton from "../MovieTasteButton";
import BackButtonWithMypage from "../BackButtonWithMypage";
import axios from "axios";

const MyMovie = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state가 undefined인 경우를 처리
  const [movies, setMovies] = useState(location.state?.movies || []);
  console.log(location.state)
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태

  const mymovie = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      const response = await axios.get("http://35.216.42.151:8080/api/v1/movie/watch", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // 중복된 movieId 제거 후 데이터 설정
        const uniqueMovies = response.data.filter(
          (movie, index, self) => index === self.findIndex((m) => m.movieId === movie.movieId)
        );
        setMovies(uniqueMovies);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage("조회할 영화 정보가 없습니다.");
        } else if (error.response.status === 403) {
          setErrorMessage("유효성 검사 실패");
        } else {
          setErrorMessage("서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.");
        }
      } else {
        console.error("Error:", error);
        setErrorMessage("알 수 없는 에러가 발생했습니다.");
      }
      setMovies([]); // 에러 발생 시 빈 배열로 초기화
    }
  };

  // 컴포넌트가 렌더링될 때마다 데이터 요청
  useEffect(() => {
    mymovie();
  }, []);

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
