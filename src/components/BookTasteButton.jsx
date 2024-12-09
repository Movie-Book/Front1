import React from "react";
import Stars from "./Stars";

function BookTasteButton(props) {
    const truncateTitle = (title, maxLength) => {
        if (title.length > maxLength+1) {
            return title.slice(0, maxLength) + "⋯"; 
        }
        return title; 
    };

    return (
        <div className="bookButton" onClick={props.onClick}>
            <img src={props.bookImage} alt={props.bookTitle} />
            <h5 className="bookButtonTitle">
                {truncateTitle(props.bookTitle, 20)} 
            </h5>
            <div className="stars">
                <Stars rate={props.rate} rating={false} />
            </div>
        </div>
    );
}

export default BookTasteButton;
