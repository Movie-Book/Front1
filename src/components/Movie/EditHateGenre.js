import axios from "axios";
import MovieGenreButton from "../MovieGenreButton";
import BottomButton from "../BottomButton";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButtonWithMypage from "../BackButtonWithMypage";

function EditHateGenre() {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("token") || sessionStorage.getItem("token");
  const [user, setUser] = useState(""); // 사용자 ID 상태 추가

  const location = useLocation();
  const [hateGenres, setHateGenres] = useState(location.state.hateGenre); // 비선호 장르 상태

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
    if (hateGenres.includes(genre.id)) {
      setHateGenres(hateGenres.filter((g) => g !== genre.id));
    } else {
      setHateGenres([...hateGenres, genre.id]);
    }
  };

  const saveChanges = async () => {
    try {
      await axios.patch(
        "http://35.216.42.151:8080/api/v1/genre/dislike",
        {
          genres: hateGenres,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      navigate("/mymovie/genre");
    } catch (error) {
      console.error("비선호 장르 저장 오류:", error);
    }
  };

  useEffect(() => {
    // 로컬 스토리지에서 사용자 ID 가져오기
    const storedUserId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    if (storedUserId) {
      setUser(storedUserId);
    } else {
      setUser("사용자"); // ID가 없을 때 기본값
    }
  }, []);

  return (
    <div>
      <BackButtonWithMypage title="내 장르 편집" />
      <div className="container">
        <h3>{user}님이 싫어하는 영화 장르를 알려주세요</h3>
        <div className="movieContainer">
          {genres.map((g) => (
            <MovieGenreButton
              key={g.id}
              onClick={() => selectGenre(g)}
              moviePoster={g.poster}
              movieGenre={g.genre}
              selectedHate={hateGenres.includes(g.id)}
              isHateStep={true}
            />
          ))}
        </div>
      </div>
      <BottomButton text="저장" backgroundColor="#d04040" onClick={saveChanges} />
    </div>
  );
}

export default EditHateGenre;
