import { useNavigate } from "react-router-dom";
import BackButtonWithMypage from "../components/BackButtonWithMypage";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import MovieTasteButton from "../components/MovieTasteButton";
import BottomNavigationBar from "../components/BottomNavigationBar";
import MovieRateDialog from "../components/MovieRateDialog";
import axios from "axios";

function MovieSearch() {
    const navigate = useNavigate();
    const [selectedMovie, setSelectedMovie] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMovieTitle, setSelectedMovieTitle] = useState(null);
    const [selectedMoviePoster, setSelectedMoviePoster] = useState(null);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [starRating, setStarRating] = useState({});

    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const searchMovies = async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem("token");
            const response = await axios.get(`http://35.216.42.151:8080/api/v1/movie/search?keyword=${encodeURIComponent(searchText)}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    console.log('잘못된 검색입니다');
                } else if (error.response.status === 403) {
                    console.log('유효성검사 실패');
                } else {
                    console.error('Error : ', error);
                    console.log('서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
                }
            }
            return [];
        }
    };

    const search = async (text) => {
        setSearchText(text);
        if (text === '') {
            setSearchResult([]);
        } else {
            const result = await searchMovies();
            setSearchResult(result);
        }
    };

    const selectMovie = (movieId, movieName, poster) => {
        setOpenModal(true);
        setSelectedMovieId(movieId);
        setSelectedMovieTitle(movieName);
        setSelectedMoviePoster(poster);
    };

    const movieWatched = async (starRatingData) => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            console.log("Star rating data:", starRatingData);

            const response = await axios.post('http://35.216.42.151:8080/api/v1/movie/watch', starRatingData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                console.log('영화별점등록완료');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    console.log('잘못된 접근입니다.');
                } else if (error.response.status === 403) {
                    console.log('유효성검사 실패');
                } else {
                    console.error('Error : ', error);
                    console.log('서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
                }
            }
        }
    };

    const updateRating = (movieId, newRating) => {
        setStarRating((prevRatings) => {
            const updatedRatings = {
                ...prevRatings,
                [movieId]: newRating,
            };
            console.log("Updated starRating:", updatedRatings);
            return updatedRatings;
        });

        if (newRating > 0 && !selectedMovie.includes(movieId)) {
            setSelectedMovie([...selectedMovie, movieId]);
        } else if (newRating === 0) {
            setSelectedMovie(selectedMovie.filter((m) => m !== movieId));
        }
    };

    const update = async (movieId, newRating) => {
        updateRating(movieId, newRating); // 상태 업데이트

        const updatedRatings = {
            ...starRating,
            [movieId]: newRating,
        };

        const starRatingData = Object.entries(updatedRatings)
            .filter(([, rating]) => rating > 0) // 0점 제외
            .map(([id, rating]) => ({ movieId: id, rating }));

        console.log("Final starRatingData:", starRatingData);

        await movieWatched(starRatingData); // 최종 데이터 전달
    };

    const uniqueSearchResult = Array.from(new Set(searchResult.map((m) => m.movieName))).map((title) => searchResult.find((m) => m.movieName === title));

    return (
        <div>
            <BackButtonWithMypage title={"영화검색"} />
            <div className="container">
                <SearchBar text="영화제목을 입력하세요" searchText={searchText} onSearch={search} />
                <div className="searchResultContainer">
                    {
                        searchResult ? uniqueSearchResult.map((m) => (
                            <MovieTasteButton
                                key={m.movieId}
                                onClick={() => selectMovie(m.movieId, m.movieName, m.poster)}
                                moviePoster={m.poster}
                                movieTitle={m.movieName}
                                rate={starRating[m.movieId] || 0}
                                selected={starRating[m.movieId] > 0}
                            />
                        )) : <div>검색결과가 없습니다</div>
                    }
                </div>
            </div>
            <BottomNavigationBar />
            <MovieRateDialog
                openModal={openModal}
                movieId={selectedMovieId}
                movieTitle={selectedMovieTitle}
                moviePoster={selectedMoviePoster}
                rate={starRating[selectedMovieId] || 0}
                rateUpdate={update}
                onClose={() => setOpenModal(false)}
            />
        </div>
    );
}

export default MovieSearch;
