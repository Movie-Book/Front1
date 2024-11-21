import MovieTasteButton from '../components/MovieTasteButton';
import Bottom2Button from "../components/Bottom2Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieRateDialog from "../components/MovieRateDialog";
import Logo from "../components/Logo";

function MovieTaste() {

  const [selectedMovie, setSelectedMovie] = useState([]);
  const [showWarning, setShowWarning] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState(null);
  const [selectedMoviePoster, setSelectedMoviePoster] = useState(null);
  const [starRating, setStarRating] = useState({});

  var user = "___";

  const navigate = useNavigate();

  const movies = [
    {moviePoster : "/image/parasite.jpg", movieTitle : "영화1"},
    {moviePoster : "/image/parasite.jpg", movieTitle : "영화2"},
    {moviePoster : "/image/parasite.jpg", movieTitle : "영화3"},
    {moviePoster : "/image/parasite.jpg", movieTitle : "영화4"},
    {moviePoster : "/image/parasite.jpg", movieTitle : "영화5"},
    {moviePoster : "/image/parasite.jpg", movieTitle : "영화6"},
    {moviePoster : "/image/parasite.jpg", movieTitle : "영화7"},
    {moviePoster : "/image/parasite.jpg", movieTitle : "영화8"},
    {moviePoster : "/image/parasite.jpg", movieTitle : "영화9"},
    {moviePoster : "/image/parasite.jpg", movieTitle : "영화10"},
    {moviePoster : "/image/parasite.jpg", movieTitle : "영화11"},
    {moviePoster : "/image/parasite.jpg", movieTitle : "영화12"},
  ]

  const back = () => {
    navigate('/movieGenre');
  }

  const done = () => {
    navigate('/');
  }

  const selectMovie = (movieTitle, moviePoster) => {
    setOpenModal(true);
    setSelectedMovieTitle(movieTitle);
    setSelectedMoviePoster(moviePoster);
  }

  const updateRating = (movieTitle, newRating) => {
    setStarRating(prevRatings => ({
      ...prevRatings,
      [movieTitle] : newRating
    }));
    if(newRating > 0 && !selectedMovie.includes(movieTitle)){
      setSelectedMovie([...selectedMovie, movieTitle]);
    }
    else if(newRating === 0){
      setSelectedMovie(selectedMovie.filter(m=>m !== movieTitle));
    }
  };

  useEffect(() => {
    if (selectedMovie.length < 3) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [selectedMovie]);

  return (
  <div>
      <div  className="container">
        <Logo/>
          <h1>{user}님이 본 영화를 평가해주세요</h1>
          {showWarning && (
            <h5 style={{color : 'red'}}>3개 이상 선택해주세요</h5>
          )}
          <div className="movieContainer">
          {movies.map((m) => (
                <MovieTasteButton 
                  key={m.movieTitle} 
                  onClick={() => selectMovie(m.movieTitle, m.moviePoster)} 
                  moviePoster = {m.moviePoster} 
                  movieTitle = {m.movieTitle} 
                  rate={starRating[m.movieTitle] || 0}
                  selected={starRating[m.movieTitle] > 0} 
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
          rate={starRating[selectedMovieTitle] || 0} 
          rateUpdate={updateRating}
          onClose={()=>setOpenModal(false)}
        />
    </div>
  );
}

export default MovieTaste;