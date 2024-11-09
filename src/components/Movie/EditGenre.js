import MovieGenreButton from "../MovieGenreButton";
import BottomButton from "../BottomButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditGenre() {
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
    if (step === "선호") {
      if (selectedFavoriteGenre.includes(genre)) {
        setSelectedFavoriteGenre(selectedFavoriteGenre.filter((g) => g !== genre));
      } else {
        setSelectedFavoriteGenre([...selectedFavoriteGenre, genre]);
      }
    } else {
      if (selectedHateGenre.includes(genre)) {
        setSelectedHateGenre(selectedHateGenre.filter((g) => g !== genre));
      } else {
        setSelectedHateGenre([...selectedHateGenre, genre]);
      }
    }
  };

  const saveChanges = () => {
    localStorage.setItem("favoriteGenres", JSON.stringify(selectedFavoriteGenre));
    localStorage.setItem("hateGenres", JSON.stringify(selectedHateGenre));
    navigate('/home'); // 임시
  };

  return (
    <div>
      <div className="container">
        <div className="header">
            <button className="back-button" onClick={() => navigate(-1)}>{'<'}</button>
            <h1 className="profile-title">내 장르 편집</h1>
            <div className="back-button-placeholder"></div> 
        </div>
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
        <BottomButton
          text={step === "선호" ? "다음" : "저장"}
          backgroundColor="#d04040"
          onClick={() => {
            if (step === "선호") {
              setStep("비선호");
            } else {
              saveChanges();
            }
          }}
        />
      </div>
    </div>
  );
}

export default EditGenre;
