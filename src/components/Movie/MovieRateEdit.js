import { useRef, useState } from "react";
import Stars from "./Stars";

function MovieRateDialog({openModal, movieTitle, moviePoster, rate, /*추가*/ rateUpdate, onClose}){
    const modalRef = useRef();
    /*추가*/
    const [rating, setRating] = useState(rate);
   
    /*추가*/
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

      /*수정*/
    const modalClose = () => {
        rateUpdate(movieTitle, rating);
        onClose();
    }
    /*
    const modalClose = () => {
        modalRef.current.close();
    }
    if(openModal)
        modalRef.current.showModal();
    */
    return(
        <div>
            <dialog ref={modalRef} className="movieRate">
                <h2>별점 수정하기</h2>
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
