import MovieGenreButton from "../MovieGenreButton";
import BottomButton from "../BottomButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButtonWithMypage from "../BackButtonWithMypage";

function EditFavoriteGenre() {
  const navigate = useNavigate();

  const savedFavoriteGenres = JSON.parse(localStorage.getItem("favoriteGenres")) || [];
  const savedHateGenres = JSON.parse(localStorage.getItem("hateGenres")) || [];

  const [selectedFavoriteGenre, setSelectedFavoriteGenre] = useState(savedFavoriteGenres);
  const [selectedHateGenre, setSelectedHateGenre] = useState(savedHateGenres);
  const [step, setStep] = useState("선호");


  const genres = [
    { poster: "https://image.tmdb.org/t/p/w400/cadVm6gKYYukmPysHGCwrawUHHa.jpg", genre: "액션" },
    { poster: "https://image.tmdb.org/t/p/w400/oAt6OtpwYCdJI76AVtVKW1eorYx.jpg", genre: "드라마" },
    { poster: "https://image.tmdb.org/t/p/w400/jbHNkNydiZstlqhhBSvG19lm4NL.jpg", genre: "코미디" },
    { poster: "https://image.tmdb.org/t/p/w400/ntdgcdsmMuHd9s4oEKTvWDiUyU7.jpg", genre: "로맨스" },
    { poster: "https://image.tmdb.org/t/p/w400/izzk8dbmrLowcoGbFaebqJvzyXg.jpg", genre: "스릴러" },
    { poster: "https://image.tmdb.org/t/p/w400/k9AKtgRErXjz14lFHL2IJVCgwOT.jpg", genre: "호러" },
    { poster: "https://image.tmdb.org/t/p/w400/gDN2NWtHbs8ZWEBQM8Dh5OVXdb4.jpg", genre: "SF" },
    { poster: "https://image.tmdb.org/t/p/w400/1ItejykqHTbFWbZXdzqlvqriv7K.jpg", genre: "판타지" },
    { poster: "https://image.tmdb.org/t/p/w400/ft5SBKI0MFZpdW1tlG75XD9JeHO.jpg", genre: "애니메이션" },
    { poster: "https://image.tmdb.org/t/p/w400/amdtSKEESxhst5Q2XOUvqdG3Q86.jpg", genre: "다큐멘터리" },
    { poster: "https://image.tmdb.org/t/p/w400/xYnL0kA0V7aDvg8wupmWQbdgb9a.jpg", genre: "범죄" },
  ];

  const selectGenre = (genre) => {
   
    if (selectedFavoriteGenre.includes(genre)) {
    setSelectedFavoriteGenre(selectedFavoriteGenre.filter((g) => g !== genre));
    } else {
    setSelectedFavoriteGenre([...selectedFavoriteGenre, genre]);
    }
  };

  const saveChanges = () => {
    localStorage.setItem("favoriteGenres", JSON.stringify(selectedFavoriteGenre));
    localStorage.setItem("hateGenres", JSON.stringify(selectedHateGenre));
    navigate('/mymovie');
  };

  return (
    <div>
       {/*<div className="Logo">
        <img onClick={() => navigate(-1)}className="back" src="/image/back.png"alt="back"/>
        <h3 className="info">내 장르 편집</h3>
        <img onClick={() => navigate("/profile")} className="mypage" src="/image/mypage.png" alt="mypage"/>
      </div>*/}
      <BackButtonWithMypage title="내 장르 편집"/>
      <div className="container">
      <h3>좋아하는 영화 장르를 알려주세요</h3>
        <div className="movieContainer">
          {genres.map((g) => (
            <MovieGenreButton
              key={g.genre}
              onClick={() => selectGenre(g.genre)}
              moviePoster={g.poster}
              movieGenre={g.genre}
              selectedFavorite={selectedFavoriteGenre.includes(g.genre)}
              selectedHate={selectedHateGenre.includes(g.genre)}
              isHateStep={step === "비선호"}
            />
          ))}
        </div>
      </div>
      <BottomButton
          text={"저장"}
          backgroundColor="#d04040"
          onClick={() => {
              saveChanges();
          }}
      />
    </div>
  );
}

export default EditFavoriteGenre;