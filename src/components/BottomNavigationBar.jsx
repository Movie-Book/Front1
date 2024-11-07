import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";

function BottomNavigationBar(props){

    const [searchSelected, setSearchSelected] = useState(false);
    const [myMovieSelected, setMyMovieSelected] = useState(false);
    const [myBookSelected, setMyBookSelected] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const searchImg = searchSelected ? "./image/searchSelected.png" : "./image/search.png";
    const myMovieImg = myMovieSelected ? "./image/myMovieSelected.png" : "./image/myMovie.png";
    const myBookImg = myBookSelected ? "./image/myBookSelected.png" : "./image/myBook.png";

    useEffect(() => {
        if (location.pathname === "/search") {
            setSearchSelected(true);
        }
    }, [location]);

    const selectSearch = () => {
        navigate('/search');
    };
    const selectMyMovie = () => {
    };
    const selectMyBook = () => {
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