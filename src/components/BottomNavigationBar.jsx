import { react, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function BottomNavigationBar(){

    const [searchSelected, setSearchSelected] = useState(false);
    const [myMovieSelected, setMyMovieSelected] = useState(false);
    const [myBookSelected, setMyBookSelected] = useState(false);
    const navigate = useNavigate();

    var search = "./image/search.png";
    var myMovie = "./image/myMovie.png";
    var myBook = "./image/myBook.png";

    const searchImg = searchSelected ? "./image/searchSelected.png" : "./image/search.png";
    const myMovieImg = myMovieSelected ? "./image/myMovieSelected.png" : "./image/myMovie.png";
    const myBookImg = myBookSelected ? "./image/myBookSelected.png" : "./image/myBook.png";

    const selectSearch = () => {
        setSearchSelected(prev => !prev);
        //navigate('/searchmovie');
    };
    const selectMyMovie = () => {
        setMyMovieSelected(prev => !prev);
        navigate('/mymovie/taste');
    };
    const selectMyBook = () => {
        setMyBookSelected(prev => !prev);
        //navigate('/mybook');
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