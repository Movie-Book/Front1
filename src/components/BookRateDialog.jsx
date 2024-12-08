import { useEffect, useRef, useState } from "react";
import Stars from "./Stars";
import axios from "axios";

function BookRateDialog({ openModal,isbn,bookTitle,bookImage,rate,review: initialReview,rateUpdate,onClose,}){
  const modalRef = useRef();
  const [rating, setRating] = useState(rate);
  const [review, setReview] = useState(initialReview || " ");

  // 모달이 열릴 때마다 초기 상태 설정
  useEffect(() => {
    if (openModal) {
      setRating(rate); // 새로운 책의 rating 반영
      setReview(initialReview || ""); // 새로운 책의 review 반영
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [openModal, rate, initialReview]);

  // 별점 및 리뷰 업데이트
  const modalClose = async () => {
    // 상태를 먼저 업데이트
    rateUpdate(isbn, rating, review.trim());
  
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.patch(
        "http://35.216.42.151:8080/api/v1/book/rating",
        {
          isbn: String(isbn),
          rating: Math.max(0, Math.min(Number(rating), 5)),
          review: review.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
  
      console.log("Response Data:", response.data);
    } catch (err) {
      console.error("Error during modalClose:", err.response || err);
    }
  
    // 모달 닫기
    onClose();
  };
  

  return (
    <div>
      <dialog ref={modalRef} className="bookRate">
        <h2>리뷰 작성하기</h2>
        <img src={bookImage} alt={bookTitle} />
        <div className="bookInfo">
          <h5 className="bookTitle">{bookTitle}</h5>
          <Stars rate={rating} setRate={setRating} />
          <textarea
            className="reviewInput"
            placeholder="책에 대한 리뷰를 작성하세요"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <button onClick={modalClose} className="dialogButton">
          확인
        </button>
      </dialog>
    </div>
  );
}

export default BookRateDialog;
