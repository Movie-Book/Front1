import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieRateDialog from "../components/MovieRateDialog";
import BookTasteButton from "../components/BookTasteButton";
import BackButtonWithMypage from "../components/BackButtonWithMypage";
import BottomNavigationBar from "../components/BottomNavigationBar";

function MyBook() {
  const [selectedBook, setSelectedBook] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBookTitle, setSelectedBookTitle] = useState(null);
  const [selectedBookImage, setSelectedBookImage] = useState(null);
  const [starRating, setStarRating] = useState({});
  const [books, setBooks] = useState([]); // 추천 도서 리스트 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  const navigate = useNavigate();

  // API 호출
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://35.216.42.151:8080/api/v1/book/rec-list", {
          headers: {
            "accept": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`API 요청 실패: ${response.status}`);
        }

        const data = await response.json(); // JSON 데이터 파싱
        setBooks(data); // 추천 도서 리스트 저장
      } catch (err) {
        setError(err.message); // 에러 메시지 저장
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchBooks();
  }, []);

  const selectBook = (bookTitle, bookImage) => {
    setOpenModal(true);
    setSelectedBookTitle(bookTitle);
    setSelectedBookImage(bookImage);
  };

  const updateRating = (bookTitle, newRating) => {
    setStarRating((prevRatings) => ({
      ...prevRatings,
      [bookTitle]: newRating,
    }));
    if (newRating > 0 && !selectedBook.includes(bookTitle)) {
      setSelectedBook([...selectedBook, bookTitle]);
    } else if (newRating === 0) {
      setSelectedBook(selectedBook.filter((m) => m !== bookTitle));
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  return (
    <div>
      <BackButtonWithMypage title="내 도서" />
      <div className="container">
        <h3>추천 받은 책</h3>
        <div className="movieContainer">
          {books.map((book) => (
            <BookTasteButton
              key={book.name}
              onClick={() => selectBook(book.name, book.image)}
              bookImage={book.image}
              bookTitle={book.name}
              rate={starRating[book.name] || 0}
              selected={starRating[book.name] > 0}
            />
          ))}
        </div>
      </div>
      <BottomNavigationBar />
      <MovieRateDialog
        openModal={openModal}
        movieTitle={selectedBookTitle}
        moviePoster={selectedBookImage}
        rate={starRating[selectedBookTitle] || 0}
        rateUpdate={updateRating}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}

export default MyBook;
