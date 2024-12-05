import MovieTasteButton from '../MovieTasteButton';
import Bottom2Button from "../Bottom2Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieRateDialog from "../MovieRateDialog";
import Logo from "../Logo";
import BottomNavigationBar from '../BottomNavigationBar';
import BackButtonWithMypage from '../BackButtonWithMypage';
import axios from 'axios';

function MovieTaste() {
  
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMovie, setSelectedMovie] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState(null);
  const [selectedMoviePoster, setSelectedMoviePoster] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [user, setUser] = useState(""); // 사용자 ID 상태 추가

  const movies = location.state.movies;

  useEffect(() => {
    // 로컬 스토리지에서 사용자 ID 가져오기
    const storedUserId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    if (storedUserId) {
      setUser(storedUserId);
    } else {
      setUser("사용자"); // ID가 없을 때 기본값
    }
  }, []);

  const selectMovie = (movieId, movieName, poster) => {
    setOpenModal(true);
    setSelectedMovieId(movieId);
    setSelectedMovieTitle(movieName);
    setSelectedMoviePoster(poster);
  }

  const updateRating = async(movieId, newRating) => {
    movies.find((m) => m.movieId === movieId).rating = newRating;
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem("token");
      const starRatingData = movies.map((m) => ({
        movieId: m.movieId,
        rating: m.rating
      }));
      const response = await axios.patch('http://35.216.42.151:8080/api/v1/movie/rating', starRatingData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      if (response.status === 200) {
        console.log("영화별점수정완료");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log("수정할 영화 정보가 없습니다.");
        } else if (error.response.status === 403) {
          console.log("유효성검사 실패");
        } else {
          console.error('Error : ', error);
          console.log('서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.')
        }
      }
    }
  };

  return (
    <div>
      <BackButtonWithMypage title="내 영화 편집" />
      <div className="container">
        <h3>{user}님이 본 영화를 평가해주세요</h3>
        <h5 style={{ color: 'red' }}>별점을 수정하고 싶은 영화를 누르고 수정해주세요</h5>
        <div className="movieContainer">
          {movies.map((m) => (
            <MovieTasteButton
              key={m.movieId}
              onClick={() => selectMovie(m.movieId, m.movieName, m.poster)}
              moviePoster={m.poster}
              movieTitle={m.movieName}
              rate={m.rating || 0}
              selected={m.rating > 0}
            />
          ))}
        </div>
      </div>
      <BottomNavigationBar />
      <MovieRateDialog
        openModal={openModal}
        movieId={selectedMovieId}
        movieTitle={selectedMovieTitle}
        moviePoster={selectedMoviePoster}
        rate={(movies.find(movie => movie.movieId === selectedMovieId)?.rating) || 0}
        rateUpdate={updateRating}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default MovieTaste;
