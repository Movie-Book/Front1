import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BookRateDialog from "../components/BookRateDialog";
import BookTasteButton from "../components/BookTasteButton";
import BackButtonWithMypage from "../components/BackButtonWithMypage";
import BottomNavigationBar from "../components/BottomNavigationBar";
import axios from "axios";

function MyBook() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBookTitle, setSelectedBookTitle] = useState(null);
  const [selectedBookImage, setSelectedBookImage] = useState(null);
  const [selectedBookISBN, setSelectedBookISBN] = useState(null);
  const [books, setBooks] = useState([]); // 책 데이터
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // 책 데이터 가져오기
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        setLoading(true);

        const response = await axios.get("http://35.216.42.151:8080/api/v1/book/rec-list", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        setBooks(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // 책 선택 시 모달 열기
  const selectBook = (bookTitle, bookImage, isbn) => {
    setOpenModal(true);
    setSelectedBookTitle(bookTitle);
    setSelectedBookImage(bookImage);
    setSelectedBookISBN(isbn);
  };

  // 별점 및 리뷰 업데이트
  const updateRating = (isbn, newRating, review) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.isbn === isbn
          ? {
              ...book,
              rating: newRating,
              review: review?.trim() || "", // 빈 리뷰는 빈 문자열로 처리
            }
          : book
      )
    );

    // 상태 업데이트가 완료된 후 모달을 닫기
    setOpenModal(false);
  };

  return (
    <div>
      <BackButtonWithMypage title="내 도서" />
      <div className="container">
        <h3>추천 받은 책</h3>
        <div className="movieContainer">
          {books.map((book) => (
            <BookTasteButton
              key={book.isbn}
              onClick={() => selectBook(book.name, book.image, book.isbn)}
              bookImage={book.image}
              bookTitle={book.name}
              rate={book.rating || 0} // 책 데이터에 저장된 별점
              selected={!!book.rating}
            />
          ))}
        </div>
      </div>
      <BottomNavigationBar />
      <BookRateDialog
        openModal={openModal}
        bookTitle={selectedBookTitle}
        bookImage={selectedBookImage}
        isbn={selectedBookISBN}
        rate={books.find((book) => book.isbn === selectedBookISBN)?.rating || 0}
        review={books.find((book) => book.isbn === selectedBookISBN)?.review || ""}
        rateUpdate={updateRating}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}

export default MyBook;
