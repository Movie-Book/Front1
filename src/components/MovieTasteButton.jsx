import React from "react";
import Stars from "./Stars";

function MovieTasteButton(props) {

    const selected = props.selected ? 'selected' : '';

    return(
        <div className="movie" onClick={props.onClick}>
            <img className = {selected} src={props.moviePoster} alt={props.movieTitle} />
            <h5 className="movieTitle">{props.movieTitle}</h5>
            <div className="stars"><Stars  rate={props.rate} rating = {false}/></div>
        </div>
    );
}

export default MovieTasteButton;