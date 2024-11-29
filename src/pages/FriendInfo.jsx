import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookTasteButton from "../components/BookTasteButton";

function FriendInfo(){
    const location = useLocation();
    const {name} = location.state || {};
    const navigate = useNavigate();
    const [starRating, setStarRating] = useState({});
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

    return(
        <div>
            <div className="Logo">
                <img  onClick={() => navigate(-1)}  className="back" src="/image/back.png" alt="back" />
                <h3 className="info">{name}</h3>
            </div>
            <div className="container">
                <h3>{name}님이 추천 받은 책</h3>
                <div className="movieContainer">
                {books.map((m) => (
                    <BookTasteButton 
                        key={m.bookTitle} 
                        onClick={null} 
                        bookImage = {m.bookImage} 
                        bookTitle = {m.bookTitle} 
                        rate={starRating[m.bookTitle] || 0}
                        selected={starRating[m.bookTitle] > 0} 
                    />
                ))}
                </div>
            </div>
        </div>
        
    )
}

export default FriendInfo;