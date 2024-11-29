import MovieTasteButton from '../MovieTasteButton';
import Bottom2Button from "../Bottom2Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieRateDialog from "../MovieRateDialog";
import Logo from "../Logo";
import BottomNavigationBar from '../BottomNavigationBar';
import BackButtonWithMypage from '../BackButtonWithMypage';

function MovieTaste() {
  
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMovie, setSelectedMovie] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState(null);
  const [selectedMoviePoster, setSelectedMoviePoster] = useState(null);
  /*const [stars, setStars] = useState(0);*/
  const [movieRatings, setMovieRatings] = useState({}); 

  var user = "___";

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
/*    setStars(movieRatings[movieTitle] || 0); */
    setSelectedMovieTitle(movieTitle);
    setSelectedMoviePoster(moviePoster);
/*    if (selectedMovie.includes(movieTitle)) {
      setSelectedMovie(selectedMovie.filter((m) => m !== movieTitle));
    } else {
      setSelectedMovie([...selectedMovie, movieTitle]);
    }
  */
  };

/*  const saveRating = () => {
    setMovieRatings(prev => {
      const updatedRatings = { ...prev, [selectedMovieTitle]: movieRatings };
      localStorage.setItem('movieRatings', JSON.stringify(updatedRatings)); 
      return updatedRatings;
    });
    setOpenModal(false);
  };
*/

  const updateRating = (movieTitle, newRating) => {
    setMovieRatings(prevRatings => ({
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

/*  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem('movieRatings')) || {};
    setMovieRatings(savedRatings);
    if (selectedMovie.length < 3) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [selectedMovie]); */

  return (
    <div>
      {/*<div className="Logo">
        <img onClick={() => navigate(-1)}className="back" src="/image/back.png"alt="back"/>
        <h3 className="info">내 영화 편집</h3>
        <img onClick={() => navigate("/profile")} className="mypage" src="/image/mypage.png" alt="mypage"/>
      </div>*/}
      <BackButtonWithMypage title="내 영화 편집"/>
      <div className="container">
        <h3>{user}님이 본 영화를 평가해주세요</h3>
        <h5 style={{color : 'red'}}>별점을 수정하고 싶은 영화를 누르고 수정해주세요</h5>
        <div className="movieContainer">
          {movies.map((m) => (
            <MovieTasteButton
              key={m.movieTitle}
              onClick={() => selectMovie(m.movieTitle, m.moviePoster)}
              moviePoster={m.moviePoster}
              movieTitle={m.movieTitle}
              selected={movieRatings[m.movieTitle] > 0}
              rate={movieRatings[m.movieTitle] || 0}
            />
          ))}
        </div>
      </div>
      <BottomNavigationBar/>
      <MovieRateDialog
        openModal={openModal}
        movieTitle={selectedMovieTitle}
        moviePoster={selectedMoviePoster}
        rate={movieRatings[selectedMovieTitle]||0}
        /*rate={stars}*/
        /*onStarChange={setStars} */
        rateUpdate={updateRating} 
        onClose={()=>setOpenModal(false)}
      />
    </div>
  
  );
}

export default MovieTaste;
