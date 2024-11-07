import { useEffect, useRef, useState } from "react";
import Stars from "./Stars";

function MovieRateDialog({openModal, movieTitle, moviePoster, rate, rateUpdate, onClose}){
    const modalRef = useRef();
    const [rating, setRating] = useState(rate);

    useEffect(() => {
        setRating(rate);
      }, [rate]);

    useEffect(() => {
        if (openModal) {
          modalRef.current.showModal();
        } else {
          modalRef.current.close();
        }
      }, [openModal]);

    const modalClose = () => {
        rateUpdate(movieTitle, rating);
        onClose();
    }

    return(
        <div>
            <dialog ref={modalRef} className="movieRate">
                <h2>이 영화는 어떠셨나요?</h2>
                <img src={moviePoster} alt={movieTitle} />
                <div className="movieInfo">
                    <h5 className="movieTitle">{movieTitle}</h5>
                    <Stars rate={rating} setRate={setRating}/>
                </div>
                <button onClick={modalClose} className="dialogButton">확인</button>
            </dialog>
        </div>
    )
}

export default MovieRateDialog;
