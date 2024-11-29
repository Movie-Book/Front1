import React from "react";
import Stars from "./Stars";

function BookTasteButton(props) {

    return(
        <div className="bookButton" onClick={props.onClick}>
            <img src={props.bookImage} alt={props.bookTitle} />
            <h5 className="bookButtonTitle">{props.bookTitle}</h5>
            <div className="stars"><Stars  rate={props.rate} rating = {false}/></div>
        </div>
    );
}

export default BookTasteButton;