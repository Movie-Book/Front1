import { useRef, useState } from "react";
import Stars from "./Stars";

function MovieRateDialog({openModal, movieTitle, moviePoster, rate}){
    const modalRef = useRef();

    const modalClose = () => {
        modalRef.current.close();
    }
    if(openModal)
        modalRef.current.showModal();

    return(
        <div>
            <dialog ref={modalRef} className="movieRate">
                <h2>별점 수정하기</h2>
                <img src={moviePoster} alt={movieTitle} />
                <div className="movieInfo">
                    <h5 className="movieTitle">{movieTitle}</h5>
                    <Stars rate={rate}/>
                </div>
                <button onClick={modalClose} className="dialogButton">확인</button>
            </dialog>
        </div>
    )
}

export default MovieRateDialog;
