import { useNavigate } from "react-router-dom";
import BackButtonWithMypage from "../components/BackButtonWithMypage";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import MovieTasteButton from "../components/MovieTasteButton";
import BottomNavigationBar from "../components/BottomNavigationBar";
import MovieRateDialog from "../components/MovieRateDialog";

function MovieSearch(){
    const navigate=useNavigate();
    const [selectedMovie, setSelectedMovie] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMovieTitle, setSelectedMovieTitle] = useState(null);
    const [selectedMoviePoster, setSelectedMoviePoster] = useState(null);
    const [starRating, setStarRating] = useState({});

    const movies = [
        {moviePoster : "/image/parasite.jpg", movieTitle : "1"},
        {moviePoster : "/image/parasite.jpg", movieTitle : "12"},
        {moviePoster : "/image/parasite.jpg", movieTitle : "123"},
        {moviePoster : "/image/parasite.jpg", movieTitle : "4"},
        {moviePoster : "/image/parasite.jpg", movieTitle : "45"},
        {moviePoster : "/image/parasite.jpg", movieTitle : "456"},
        {moviePoster : "/image/parasite.jpg", movieTitle : "7"},
        {moviePoster : "/image/parasite.jpg", movieTitle : "78"},
        {moviePoster : "/image/parasite.jpg", movieTitle : "789"},
        {moviePoster : "/image/parasite.jpg", movieTitle : "9"},
        {moviePoster : "/image/parasite.jpg", movieTitle : "98"},
        {moviePoster : "/image/parasite.jpg", movieTitle : "987"},
      ]

      const [searchText, setSearchText] = useState('');
      const [searchResult, setSearchResult] = useState(movies);

      const search = (text) => {
        setSearchText(text);
        if(text===''){
            setSearchResult(movies);
        }
        else {
            const result = movies.filter((m)=>m.movieTitle.includes(text));
            setSearchResult(result);
        }
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

    return(
        <div>
            <BackButtonWithMypage title={"영화검색"}/>
            <div className="container">
                <SearchBar searchText={searchText} onSearch={search}/>
                <div className="searchResultContainer">
                    {searchResult.map((m) => (
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
            </div>
            <BottomNavigationBar/>
            <MovieRateDialog 
                openModal={openModal} 
                movieTitle={selectedMovieTitle} 
                moviePoster={selectedMoviePoster} 
                rate={starRating[selectedMovieTitle] || 0} 
                rateUpdate={updateRating}
                onClose={()=>setOpenModal(false)}
                />
        </div>
    )
}

export default MovieSearch;