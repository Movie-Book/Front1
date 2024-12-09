import React from "react";
import Stars from "./Stars";

function MovieTasteButton(props) {

    const selected = props.selected ? 'selected' : '';
    const truncateTitle = (title, maxLength) => {
        if (title.length > maxLength+1) {
            return title.slice(0, maxLength) + "⋯"; 
        }
        return title; 
    };

    return(
        <div className="movie" onClick={props.onClick}>
            <img className = {selected} src={props.moviePoster} alt={props.movieTitle} />
            <h5 className="movieTitle">{truncateTitle(props.movieTitle, 20)}</h5>
            <div className="stars"><Stars  rate={props.rate} rating = {false}/></div>
        </div>
    );
}

export default MovieTasteButton;