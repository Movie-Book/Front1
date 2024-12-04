import MovieTasteButton from '../components/MovieTasteButton';
import Bottom2Button from "../components/Bottom2Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieRateDialog from "../components/MovieRateDialog";
import Logo from "../components/Logo";
import axios from 'axios';

function MovieTaste() {

  const [selectedMovie, setSelectedMovie] = useState([]);
  const [showWarning, setShowWarning] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState(null);
  const [selectedMoviePoster, setSelectedMoviePoster] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [starRating, setStarRating] = useState({});

  var user = "___";

  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);
  const movies = location.state?.movies || [];

  const movieWatched = async() => {
    try{
      const token = localStorage.getItem('token');

      const starRatingData = Object.entries(starRating).map(([movieId, rating]) => ({
        movieId, rating
      }));
      const response = await axios.post('http://35.216.42.151:8080/api/v1/movie/watch', starRatingData, {
        headers : {
          Authorization: `Bearer ${token}`
        },
      });
      if(response.status === 200){
        return response.data;
      }
    }
    catch(error){
      if(error.response){
        if(error.response.status===400){
          console.log('잘못된 접근입니다.');
        }
        else if(error.response.status===403){
          console.log('유효성검사 실패');
        }
        else{
          console.error('Error : ',error);
          console.log('서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.')
        }
      }
      return [];
    }
  }

  const back = () => {
    navigate('/movieGenre');
  }

  const done = () => {
    movieWatched();
    navigate('/');
  }

  const selectMovie = (movieId, movieName, poster) => {
    setOpenModal(true);
    setSelectedMovieId(movieId);
    setSelectedMovieTitle(movieName);
    setSelectedMoviePoster(poster);
  }

  const updateRating = (movieId, newRating) => {
    setStarRating(prevRatings => ({
      ...prevRatings,
      [movieId] : newRating
    }));
    
    if(newRating > 0 && !selectedMovie.includes(movieId)){
      setSelectedMovie([...selectedMovie, movieId]);
    }
    else if(newRating === 0){
      setSelectedMovie(selectedMovie.filter(m => m !== movieId));
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
                  key={m.movieId} 
                  onClick={() => selectMovie(m.movieId, m.movieName, m.poster)} 
                  moviePoster = {m.poster} 
                  movieTitle = {m.movieName} 
                  rate={starRating[m.movieId] || 0}
                  selected={starRating[m.movieId] > 0} 
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
          movieId = {selectedMovieId}
          movieTitle={selectedMovieTitle} 
          moviePoster={selectedMoviePoster} 
          rate={(movies.find(movie => movie.movieId === selectedMovieId)?.rating) || 0}
          rateUpdate={updateRating}
          onClose={()=>setOpenModal(false)}
        />
    </div>
  );
}

export default MovieTaste;