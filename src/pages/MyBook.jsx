import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BookRateDialog from "../components/BookRateDialog";
import BookTasteButton from "../components/BookTasteButton";
import BackButtonWithMypage from "../components/BackButtonWithMypage";
import BottomNavigationBar from "../components/BottomNavigationBar";

function MyBook() {
  const [selectedBook, setSelectedBook] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBookTitle, setSelectedBookTitle] = useState(null);
  const [selectedBookImage, setSelectedBookImage] = useState(null);
  const [selectedBookISBN, setSelectedBookISBN] = useState(null);
  const [starRating, setStarRating] = useState({});
  const [reviews, setReviews] = useState({});
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        setLoading(true);
        const response = await fetch("http://35.216.42.151:8080/api/v1/book/rec-list", {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`API 요청 실패: ${response.status}`);
        }

        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const selectBook = (bookTitle, bookImage, isbn) => {
    setOpenModal(true);
    setSelectedBookTitle(bookTitle);
    setSelectedBookImage(bookImage);
    setSelectedBookISBN(isbn);
  };

  const updateRating = (isbn, newRating, review) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.isbn === isbn
          ? { ...book, rating: newRating, review }
          : book
      )
    );
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
              key={book.isbn}
              onClick={() => selectBook(book.name, book.image, book.isbn)}
              bookImage={book.image}
              bookTitle={book.name}
              rate={starRating[book.name] || 0}
              selected={starRating[book.name] > 0}
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
        rate={starRating[selectedBookTitle] || 0}
        review={reviews[selectedBookTitle] || ""}
        rateUpdate={updateRating}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}

export default MyBook;
