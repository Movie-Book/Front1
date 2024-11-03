import MovieTasteButton from '../MovieTasteButton';
import Bottom2Button from "../Bottom2Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieRateDialog from "../MovieRateDialog";
import Logo from "../Logo";

function MovieTaste() {
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [showWarning, setShowWarning] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState(null);
  const [selectedMoviePoster, setSelectedMoviePoster] = useState(null);
  const [stars, setStars] = useState(0);
  const [movieRatings, setMovieRatings] = useState({}); 

  const navigate = useNavigate();

  const movies = [
    { moviePoster: "/image/parasite.jpg", movieTitle: "영화1" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "영화2" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "영화3" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "영화4" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "영화5" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "영화6" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "영화7" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "영화8" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "영화9" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "영화10" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "영화11" },
    { moviePoster: "/image/parasite.jpg", movieTitle: "영화12" },
  ];

  const back = () => {
    navigate(-1);
  };

  const done = () => {
    navigate('/');
  };

  const selectMovie = (movieTitle, moviePoster) => {
    setOpenModal(true);
    setStars(movieRatings[movieTitle] || 0);
    setSelectedMovieTitle(movieTitle);
    setSelectedMoviePoster(moviePoster);
    if (selectedMovie.includes(movieTitle)) {
      setSelectedMovie(selectedMovie.filter((m) => m !== movieTitle));
    } else {
      setSelectedMovie([...selectedMovie, movieTitle]);
    }
  };

  const saveRating = () => {
    setMovieRatings(prev => {
      const updatedRatings = { ...prev, [selectedMovieTitle]: stars };
      localStorage.setItem('movieRatings', JSON.stringify(updatedRatings)); 
      return updatedRatings;
    });
    setOpenModal(false);
  };

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem('movieRatings')) || {};
    setMovieRatings(savedRatings);
    if (selectedMovie.length < 3) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [selectedMovie]);

  return (
    <div>
      <div className="container">
        <div className="header">
          <button className="back-button" onClick={() => navigate(-1)}>{'<'}</button>
          <h1 className="profile-title">내 영화 편집</h1>
          <div className="back-button-placeholder"></div>
        </div>
        {showWarning && (
          <p style={{ color: 'red' }}>3개 이상 선택해주세요</p>
        )}
        <div className="movieContainer">
          {movies.map((m) => (
            <MovieTasteButton
              key={m.movieTitle}
              onClick={() => selectMovie(m.movieTitle, m.moviePoster)}
              moviePoster={m.moviePoster}
              movieTitle={m.movieTitle}
              selected={selectedMovie.includes(m.movieTitle)}
              rating={movieRatings[m.movieTitle] || 0}
            />
          ))}
        </div>
        <Bottom2Button
          text1="장르다시선택하기"
          text2="선택완료"
          onClick1={back}
          onClick2={done}
        />
      </div>
      <MovieRateDialog
        openModal={openModal}
        movieTitle={selectedMovieTitle}
        moviePoster={selectedMoviePoster}
        rate={stars}
        onStarChange={setStars} 
        onSaveRating={saveRating} 
      />
    </div>
  );
}

export default MovieTaste;
