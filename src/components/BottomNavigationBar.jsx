import { react, useEffect, useState } from "react"
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
>>>>>>> 41fe2e0ba4ebf5a778d2c7166f095312874cf6f1

function BottomNavigationBar(){

    const [searchSelected, setSearchSelected] = useState(false);
    const [myMovieSelected, setMyMovieSelected] = useState(false);
    const [myBookSelected, setMyBookSelected] = useState(false);
<<<<<<< HEAD
    const navigate = useNavigate();
=======
>>>>>>> 41fe2e0ba4ebf5a778d2c7166f095312874cf6f1

    var search = "./image/search.png";
    var myMovie = "./image/myMovie.png";
    var myBook = "./image/myBook.png";

    const searchImg = searchSelected ? "./image/searchSelected.png" : "./image/search.png";
    const myMovieImg = myMovieSelected ? "./image/myMovieSelected.png" : "./image/myMovie.png";
    const myBookImg = myBookSelected ? "./image/myBookSelected.png" : "./image/myBook.png";

    const selectSearch = () => {
        setSearchSelected(prev => !prev);
<<<<<<< HEAD
        //navigate('/searchmovie');
    };
    const selectMyMovie = () => {
        setMyMovieSelected(prev => !prev);
        //navigate('/mymovie');
    };
    const selectMyBook = () => {
        setMyBookSelected(prev => !prev);
        //navigate('/mybook');
=======
    };
    const selectMyMovie = () => {
        setMyMovieSelected(prev => !prev);
    };
    const selectMyBook = () => {
        setMyBookSelected(prev => !prev);
>>>>>>> 41fe2e0ba4ebf5a778d2c7166f095312874cf6f1
    };


    return(
        <div className="BottomNavigationBar">
            <img className="BottomNavigationBarButton" src={searchImg} alt="search" onClick={selectSearch}></img>
            <img className="BottomNavigationBarButton" src={myMovieImg} alt="movie" onClick={selectMyMovie}></img>
            <img className="BottomNavigationBarButton" src={myBookImg} alt="book" onClick={selectMyBook}></img>
        </div>
    )
}

export default BottomNavigationBar;