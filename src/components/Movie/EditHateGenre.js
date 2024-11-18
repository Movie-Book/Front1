import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieGenreButton from "../MovieGenreButton";
import BottomNavigationBar from "../../components/BottomNavigationBar";

function EditHateGenre() {
  const navigate = useNavigate();
  const savedHateGenres = JSON.parse(localStorage.getItem("hateGenres")) || [];
  const [selectedHateGenre, setSelectedHateGenre] = useState(savedHateGenres);

  const genres = [
    { genre: "액션", poster: "URL1" },
    { genre: "드라마", poster: "URL2" },
    { genre: "코미디", poster: "URL3" },
    { genre: "로맨스", poster: "URL4" },
    // ...추가 장르
  ];

  const selectGenre = (genre) => {
    if (selectedHateGenre.includes(genre)) {
      setSelectedHateGenre(selectedHateGenre.filter((g) => g !== genre));
    } else {
      setSelectedHateGenre([...selectedHateGenre, genre]);
    }
  };

  const saveChanges = () => {
    localStorage.setItem("hateGenres", JSON.stringify(selectedHateGenre));
    navigate("/mymovie"); // 완료 후 MyMovie 페이지로 이동
  };

  return (
    <div>
      <h3 className="info">비선호 장르 편집</h3>
      <div className="movieContainer">
        {genres.map((g) => (
          <MovieGenreButton
            key={g.genre}
            onClick={() => selectGenre(g.genre)}
            moviePoster={g.poster}
            movieGenre={g.genre}
            selectedHate={selectedHateGenre.includes(g.genre)}
          />
        ))}
      </div>
      <button className="save-button" onClick={saveChanges}>
        저장
      </button>
      <BottomNavigationBar />
    </div>
  );
}

export default EditHateGenre;
