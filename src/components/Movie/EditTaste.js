import MovieTasteButton from '../MovieTasteButton';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieRateDialog from "../MovieRateDialog";
import BottomNavigationBar from "../../components/BottomNavigationBar";

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
      <div className="Logo">
        <img onClick={() => navigate(-1)}className="back" src="/image/back.png"alt="back"/>
        <h3 className="info">내 영화 편집</h3>
        <img onClick={() => navigate("/profile")} className="mypage" src="/image/mypage.png" alt="mypage"/>
      </div>
      <div className="container">
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
      </div>
      <MovieRateDialog
        openModal={openModal}
        movieTitle={selectedMovieTitle}
        moviePoster={selectedMoviePoster}
        rate={stars}
        onStarChange={setStars} 
        onSaveRating={saveRating} 
      />
      <button className="save-button" onClick={()=>navigate("/mymovie")}>
        저장
      </button>
      <BottomNavigationBar />
    </div>
  );
}

export default MovieTaste;
