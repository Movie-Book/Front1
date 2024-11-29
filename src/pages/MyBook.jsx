import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieRateDialog from "../components/MovieRateDialog";
import Logo from "../components/Logo";
import BookTasteButton from '../components/BookTasteButton';
import BackButtonWithMypage from "../components/BackButtonWithMypage";
import BottomNavigationBar from "../components/BottomNavigationBar";

function MyBook() {
  const [selectedBook, setSelectedBook]=useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBookTitle, setSelectedBookTitle] = useState(null);
  const [selectedBookImage, setSelectedBookImage] = useState(null);
  const [starRating, setStarRating] = useState({});

  var user = "___";

  const navigate = useNavigate();

  const books = [
    {bookImage : "/image/book1.jpg", bookTitle : "책1"},
    {bookImage : "/image/book1.jpg", bookTitle : "책2"},
    {bookImage : "/image/book1.jpg", bookTitle : "책3"},
    {bookImage : "/image/book1.jpg", bookTitle : "책4"},
    {bookImage : "/image/book1.jpg", bookTitle : "책5"},
    {bookImage : "/image/book1.jpg", bookTitle : "책6"},
    {bookImage : "/image/book1.jpg", bookTitle : "책7"},
    {bookImage : "/image/book1.jpg", bookTitle : "책8"},
    {bookImage : "/image/book1.jpg", bookTitle : "책9"},
    {bookImage : "/image/book1.jpg", bookTitle : "책10"},
    {bookImage : "/image/book1.jpg", bookTitle : "책11"},
    {bookImage : "/image/book1.jpg", bookTitle : "책12"},

  ]

  const back = () => {
    navigate('/home');
  }

  const done = () => {
    navigate('/');
  }

  const selectBook = (bookTitle, bookImage) => {
    setOpenModal(true);
    setSelectedBookTitle(bookTitle);
    setSelectedBookImage(bookImage);
  }

  const updateRating = (bookTitle, newRating) => {
    setStarRating(prevRatings => ({
      ...prevRatings,
      [bookTitle] : newRating
    }));
    if(newRating > 0 && !selectedBook.includes(bookTitle)){
      setSelectedBook([...selectedBook, bookTitle]);
    }
    else if(newRating === 0){
      setSelectedBook(selectedBook.filter(m=>m !== bookTitle));
    }
  };

  return (
  <div>
    <BackButtonWithMypage title="내 도서"/>
      <div  className="container">
        <h3>추천 받은 책</h3>
        <div className="movieContainer">
        {books.map((m) => (
            <BookTasteButton 
                key={m.bookTitle} 
                onClick={() => selectBook(m.bookTitle, m.bookImage)} 
                bookImage = {m.bookImage} 
                bookTitle = {m.bookTitle} 
                rate={starRating[m.bookTitle] || 0}
                selected={starRating[m.bookTitle] > 0} 
            />
        ))}
        </div>
    </div>
    <BottomNavigationBar/>
      <MovieRateDialog 
          openModal={openModal} 
          movieTitle={selectedBookTitle} 
          moviePoster={selectedBookImage} 
          rate={starRating[selectedBookTitle] || 0} 
          rateUpdate={updateRating}
          onClose={()=>setOpenModal(false)}
        />
    </div>
  );
}

export default MyBook;