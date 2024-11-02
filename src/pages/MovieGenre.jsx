import MovieGenreButton from "../components/MovieGenreButton";
import BottomButton from "../components/BottomButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

function MovieGenre() {

  const [selectedFavoriteGenre, setSelectedFavoriteGenre] = useState([]);
  const [showWarning, setShowWarning] = useState(true);
  const [selectedHateGenre, setSelectedHateGenre] = useState([]);
  const [step, setStep] = useState("선호");

  var user = "___";

  const genres = [
    {poster : "https://image.tmdb.org/t/p/w400/cadVm6gKYYukmPysHGCwrawUHHa.jpg", genre : "액션"},
    {poster : "https://image.tmdb.org/t/p/w400/oAt6OtpwYCdJI76AVtVKW1eorYx.jpg", genre : "드라마"},
    {poster : "https://image.tmdb.org/t/p/w400/jbHNkNydiZstlqhhBSvG19lm4NL.jpg", genre : "코미디"},
    {poster : "https://image.tmdb.org/t/p/w400/ntdgcdsmMuHd9s4oEKTvWDiUyU7.jpg", genre : "로맨스"},
    {poster : "https://image.tmdb.org/t/p/w400/izzk8dbmrLowcoGbFaebqJvzyXg.jpg", genre : "스릴러"},
    {poster : "https://image.tmdb.org/t/p/w400/k9AKtgRErXjz14lFHL2IJVCgwOT.jpg", genre : "호러"},
    {poster : "https://image.tmdb.org/t/p/w400/gDN2NWtHbs8ZWEBQM8Dh5OVXdb4.jpg", genre : "SF"},
    {poster : "https://image.tmdb.org/t/p/w400/1ItejykqHTbFWbZXdzqlvqriv7K.jpg", genre : "판타지"},
    {poster : "https://image.tmdb.org/t/p/w400/ft5SBKI0MFZpdW1tlG75XD9JeHO.jpg", genre : "애니메이션"},
    {poster : "https://image.tmdb.org/t/p/w400/amdtSKEESxhst5Q2XOUvqdG3Q86.jpg", genre : "다큐멘터리"},
    {poster : "https://image.tmdb.org/t/p/w400/xYnL0kA0V7aDvg8wupmWQbdgb9a.jpg", genre : "범죄"},
  ]

  const navigate = useNavigate();

  const selectGenre = (genre) => {
    setShowWarning(false);
    if(step === "선호"){
      if(selectedFavoriteGenre.includes(genre)){
        setSelectedFavoriteGenre(selectedFavoriteGenre.filter((g) => g !== genre));
      } else{
        setSelectedFavoriteGenre([...selectedFavoriteGenre, genre]);
      }
    }
    else{
      if(selectedHateGenre.includes(genre)){
        setSelectedHateGenre(selectedHateGenre.filter((g) => g !==genre));
      } else{
        setSelectedHateGenre([...selectedHateGenre, genre]);
      }
    } 
  }

  const nextPage = () => {
    navigate('/movie');
  }

  const next = () => {
    if(step === "선호" && selectedFavoriteGenre.length > 0){
      setStep("비선호");
      window.scrollTo({
        top : 0,
        behavior : "smooth"
      })
    }
    if(step === "비선호"){
      nextPage();
      window.scrollTo({
        top : 0,
        behavior : "smooth"
      })
    }
  }

  useEffect(() => {
    if (selectedFavoriteGenre.length === 0) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [selectedFavoriteGenre]);

  return (
  <div>
      <div  className="container">
          <Logo/>
          <h1>{user}님이 {step === "선호" ? "좋아하는" : "싫어하는"} 영화 장르를 알려주세요</h1>
          {showWarning && (
            <h5 style={{color : 'red'}}>1가지 이상의 장르를 선택해주세요</h5>
          )}
          <div className="movieContainer">
            {genres.map((g) => (
                <MovieGenreButton 
                  key={g.genre} 
                  onClick={() => selectGenre(g.genre)} 
                  moviePoster = {g.poster} 
                  movieGenre = {g.genre} 
                  selectedFavorite={selectedFavoriteGenre.includes(g.genre)} 
                  selectedHate={selectedHateGenre.includes(g.genre)} 
                  isHateStep={step==="비선호"}
                />
            ))}        
          </div>
            <BottomButton 
              text="선택완료" 
              disabled={selectedFavoriteGenre.length===0} 
              backgroundColor = {selectedFavoriteGenre.length === 0 ? "gray" : "#d04040"}
              onClick={next}
              />
        </div>
    </div>
  );
}

export default MovieGenre;