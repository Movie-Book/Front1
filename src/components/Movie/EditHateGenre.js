import axios from "axios";
import MovieGenreButton from "../MovieGenreButton";
import BottomButton from "../BottomButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButtonWithMypage from "../BackButtonWithMypage";

function EditHateGenre() {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("token"); // JWT 토큰 가져오기

  // 로컬 스토리지에서 장르 정보 가져오기
  const savedFavoriteGenres = JSON.parse(localStorage.getItem("favoriteGenre")) || [];
  const savedHateGenres = JSON.parse(localStorage.getItem("hateGenre")) || [];

  const [selectedFavoriteGenre, setSelectedFavoriteGenre] = useState(savedFavoriteGenres);
  const [selectedHateGenre, setSelectedHateGenre] = useState(savedHateGenres);

  // 장르 목록 (ID와 이름 추가)
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

  // 장르 선택 핸들러
  const selectGenre = (genre) => {
    if (selectedHateGenre.includes(genre)) {
      setSelectedHateGenre(selectedHateGenre.filter((g) => g !== genre));
    } else {
      setSelectedHateGenre([...selectedHateGenre, genre]);
    }
  };

  // 변경 사항 저장 함수
  const saveChanges = async () => {
    // API 요청을 통해 서버에 비선호 장르 저장
    try {
      await axios.patch(
        "http://35.216.42.151:8080/api/v1/genre/dislike",
        {
          genres: selectedHateGenre.map(
            (genre) => genres.find((g) => g.genre === genre)?.id // 선택된 장르의 ID 전송
          ),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      console.log("비선호 장르가 성공적으로 저장되었습니다.");
      // 저장 후 '내 장르' 페이지로 이동
      navigate("/mymovie/genre");
    } catch (error) {
      console.error("비선호 장르 저장 오류:", error);
    }
  };

  return (
    <div>
      <BackButtonWithMypage title="내 장르 편집" />
      <div className="container">
        <h3>싫어하는 영화 장르를 알려주세요</h3>
        <div className="movieContainer">
          {genres.map((g) => (
            <MovieGenreButton
              key={g.genre}
              onClick={() => selectGenre(g.genre)}
              moviePoster={g.poster}
              movieGenre={g.genre}
              selectedFavorite={selectedFavoriteGenre.includes(g.genre)}
              selectedHate={selectedHateGenre.includes(g.genre)}
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
