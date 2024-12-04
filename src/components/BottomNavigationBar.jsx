
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";


function BottomNavigationBar(props){

    const [searchSelected, setSearchSelected] = useState(false);
    const [myMovieSelected, setMyMovieSelected] = useState(false);
    const [myBookSelected, setMyBookSelected] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const mymovie=async()=>{

        try{
            const token = localStorage.getItem('token');

            const response = await axios.get('http://35.216.42.151:8080/api/v1/movie/watch', {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });

            if(response.status === 200){
                return response.data;                
              }
            }
            catch(error){
              if(error.response){
                if(error.response.status===400){
                  setErrorMessage('조회할 영화 정보가 없습니다.');
                  console.log(errorMessage);
                }
                else if(error.response.status===403){
                  setErrorMessage('유효성검사 실패');
                  console.log(errorMessage);
                }
                else{
                  console.error('Error : ',error);
                  setErrorMessage('서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.')
                  console.log(errorMessage);
                }
              }
              return [];
        }
    }

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
    const selectMyMovie = async() => {
        const myMovies = await mymovie();
        navigate('/mymovie', {state : {'movies' : myMovies}});
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