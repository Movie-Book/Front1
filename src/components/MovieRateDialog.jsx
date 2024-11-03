import { useRef } from "react";
import Stars from "./Stars";

function MovieRateDialog({ openModal, movieTitle, moviePoster, rate, onRateSubmit }) {
    const modalRef = useRef();
    const newRate = useRef(rate); 

    const modalClose = () => {
        modalRef.current.close();
        if (onRateSubmit) {
            onRateSubmit(newRate.current); 
        }
    };

    if (openModal) {
        modalRef.current.showModal();
    }

    const handleRateChange = (updatedRate) => {
        newRate.current = updatedRate;
    };

    return (
        <div>
            <dialog ref={modalRef} className="movieRate">
                <h2>별점 수정하기</h2>
                <img src={moviePoster} alt={movieTitle} />
                <div className="movieInfo">
                    <h5 className="movieTitle">{movieTitle}</h5>
                    <Stars rate={rate} onRateChange={handleRateChange} />
                </div>
                <button onClick={modalClose} className="dialogButton">확인</button>
            </dialog>
        </div>
    );
}

export default MovieRateDialog;
