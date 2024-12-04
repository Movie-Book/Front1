import axios from "axios";
import MovieGenreButton from "../components/MovieGenreButton";
import BottomButton from "../components/BottomButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import axios from "axios";

function MovieGenre() {
  const [selectedFavoriteGenre, setSelectedFavoriteGenre] = useState([]);
  const [showWarning, setShowWarning] = useState(true);
  const [selectedHateGenre, setSelectedHateGenre] = useState([]);
  const [step, setStep] = useState("선호");
  var [movies, setMovies] = useState([]);

  const recommendMovies = async()=> {

    try{
      const token = localStorage.getItem('token');
    
      const response = await axios.get('http://35.216.42.151:8080/api/v1/movie/recommend', {
        headers : {
          Authorization: `Bearer ${token}`
        }
      });

      if(response.status === 200){
        return response.data;
      }
    }
    catch(error){
      if(error.response){
        if(error.response.status===400){
          console.log('존재하지 않는 유저입니다.');
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
  var user = "___";
  const jwtToken = localStorage.getItem("token"); // JWT 토큰 가져오기

  const genres = [
    { id: 1, poster: "https://image.tmdb.org/t/p/w400/cadVm6gKYYukmPysHGCwrawUHHa.jpg", genre: "액션" },
    { id: 2, poster: "https://image.tmdb.org/t/p/w400/oAt6OtpwYCdJI76AVtVKW1eorYx.jpg", genre: "드라마" },
    { id: 3, poster: "https://image.tmdb.org/t/p/w400/jbHNkNydiZstlqhhBSvG19lm4NL.jpg", genre: "코미디" },
    { id: 4, poster: "https://image.tmdb.org/t/p/w400/ntdgcdsmMuHd9s4oEKTvWDiUyU7.jpg", genre: "로맨스" },
    { id: 5, poster: "https://image.tmdb.org/t/p/w400/izzk8dbmrLowcoGbFaebqJvzyXg.jpg", genre: "스릴러" },
    { id: 6, poster: "https://image.tmdb.org/t/p/w400/k9AKtgRErXjz14lFHL2IJVCgwOT.jpg", genre: "호러" },
    { id: 7, poster: "https://image.tmdb.org/t/p/w400/gDN2NWtHbs8ZWEBQM8Dh5OVXdb4.jpg", genre: "SF" },
    { id: 8, poster: "https://image.tmdb.org/t/p/w400/1ItejykqHTbFWbZXdzqlvqriv7K.jpg", genre: "판타지" },
    { id: 9, poster: "https://image.tmdb.org/t/p/w400/ft5SBKI0MFZpdW1tlG75XD9JeHO.jpg", genre: "애니메이션" },
    { id: 10, poster: "https://image.tmdb.org/t/p/w400/amdtSKEESxhst5Q2XOUvqdG3Q86.jpg", genre: "다큐멘터리" },
    { id: 11, poster: "https://image.tmdb.org/t/p/w400/xYnL0kA0V7aDvg8wupmWQbdgb9a.jpg", genre: "범죄" },
  ];

  const selectGenre = (genre) => {
    setShowWarning(false);
    if (step === "선호") {
      if (selectedFavoriteGenre.includes(genre.id)) {
        setSelectedFavoriteGenre(selectedFavoriteGenre.filter((g) => g !== genre.id));
      } else {
        setSelectedFavoriteGenre([...selectedFavoriteGenre, genre.id]);
      }
    } else {
      if (selectedHateGenre.includes(genre.id)) {
        setSelectedHateGenre(selectedHateGenre.filter((g) => g !== genre.id));
      } else {
        setSelectedHateGenre([...selectedHateGenre, genre.id]);
      }
    }
  };

  const nextPage = async() => {
    const recommendedMovies = await recommendMovies();
    const uniqueRecommendMovies = Array.from(new Set(recommendedMovies.map((m) => m.movieName))).map((title) => recommendedMovies.find((m) => m.movieName === title));
    setMovies(uniqueRecommendMovies);
    navigate('/movie', {state : {'movies' : uniqueRecommendMovies}});
  }
  const saveGenres = async () => {
    try {
      if (step === "선호") {
        await axios.post(
          "http://35.216.42.151:8080/api/v1/genre/like",
          { genres: selectedFavoriteGenre },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        console.log("선호 장르 저장 성공");
      } else {
        await axios.post(
          "http://35.216.42.151:8080/api/v1/genre/dislike",
          { genres: selectedHateGenre },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        console.log("비선호 장르 저장 성공");
      }
    } catch (error) {
      console.error("장르 저장 실패:", error);
    }
  };

  const next = async () => {
    if (step === "선호" && selectedFavoriteGenre.length > 0) {
      await saveGenres(); // 선호 장르 저장
      setStep("비선호");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === "비선호") {
      await saveGenres(); // 비선호 장르 저장
      navigate("/movie");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (selectedFavoriteGenre.length === 0 && step === "선호") {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [selectedFavoriteGenre, step]);

  return (
    <div>
      <div className="container">
        <Logo />
        <h1>
          {step === "선호" ? "좋아하는" : "싫어하는"} 영화 장르를 선택하세요
        </h1>
        {showWarning && <h5 style={{ color: "red" }}>1가지 이상의 장르를 선택해주세요</h5>}
        <div className="movieContainer">
          {genres.map((g) => (
            <MovieGenreButton
              key={g.id}
              onClick={() => selectGenre(g)}
              moviePoster={g.poster}
              movieGenre={g.genre}
              selectedFavorite={selectedFavoriteGenre.includes(g.id)}
              selectedHate={selectedHateGenre.includes(g.id)}
              isHateStep={step === "비선호"}
            />
          ))}
        </div>
      </div>
      <BottomButton
        text={step === "선호" ? "다음" : "저장하고 완료"}
        disabled={step === "선호" && selectedFavoriteGenre.length === 0}
        backgroundColor={selectedFavoriteGenre.length === 0 ? "gray" : "#d04040"}
        onClick={next}
      />
    </div>
  );
}

export default MovieGenre;
