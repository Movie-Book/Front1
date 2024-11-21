
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";


function BottomNavigationBar(props){

    const [searchSelected, setSearchSelected] = useState(false);
    const [myMovieSelected, setMyMovieSelected] = useState(false);
    const [myBookSelected, setMyBookSelected] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const searchImg = searchSelected ? "/image/searchSelected.png" : "/image/search.png";
    const myMovieImg = myMovieSelected ? "/image/myMovieSelected.png" : "/image/myMovie.png";
    const myBookImg = myBookSelected ? "/image/myBookSelected.png" : "/image/myBook.png";    

    useEffect(() => {
        // 모든 상태 초기화
        setSearchSelected(false);
        setMyMovieSelected(false);
        setMyBookSelected(false);

        switch (location.pathname) {
            case "/search":
                setSearchSelected(true);
                break;
            case "/mymovie":
                setMyMovieSelected(true);
                break;
            case "/mymovie/taste":
                setMyMovieSelected(true);
                break;
            case "/mymovie/genre":
                setMyMovieSelected(true);
                break;
            case "/mymovie/genre":
                setMyMovieSelected(true);
                break;
            case "/mybook":
                setMyBookSelected(true);
                break;
            default:
                break;
        }
    }, [location]);

    const selectSearch = () => {
        navigate('/search');
    };
    const selectMyMovie = () => {
        navigate('/mymovie');
    };
    const selectMyBook = () => {
        navigate('/mybook');
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