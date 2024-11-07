import React from "react";
import Stars from "./Stars";

function MovieGenreButton(props) {

    const selected = props.selectedFavorite ? 'selectedFavorite' : props.selectedHate ? 'selectedHate' : '';

    return(
        <div className="genre" onClick={props.onClick}>
            <img className = {selected} src={props.moviePoster} alt={props.movieGenre} />
            <h5 className="movieGenre">{props.movieGenre}</h5>
        </div>
    );
}

export default MovieGenreButton;