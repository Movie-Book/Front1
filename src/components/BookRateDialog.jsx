import { useEffect, useRef, useState } from "react";
import Stars from "./Stars";

function BookRateDialog({ openModal, isbn, bookTitle, bookImage, rate, review: initialReview, rateUpdate, onClose }) {
  const modalRef = useRef();
  const [rating, setRating] = useState(rate);
  const [review, setReview] = useState(initialReview || "");

  // 모달이 열릴 때마다 상태를 업데이트
  useEffect(() => {
    if (openModal) {
      setRating(rate); // 새로운 책의 rating 반영
      setReview(initialReview || ""); // 새로운 책의 review 반영
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [openModal, rate, initialReview]);

  const modalClose = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch("http://35.216.42.151:8080/api/v1/book/rating", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isbn: String(isbn), // ISBN 추가
          rating: Math.max(0, Math.min(Number(rating), 5)),
          review: review.trim() || "No review provided.",
        }),
      });
  
      if (!response.ok) {
        let errorResponse;
        try {
          errorResponse = await response.json();
        } catch {
          errorResponse = await response.text();
        }
        console.error("서버 응답:", errorResponse);
        throw new Error(`리뷰 업데이트 실패: ${errorResponse}`);
      }
  
      const updatedBook = await response.json();
      rateUpdate(updatedBook.isbn, updatedBook.rating, updatedBook.review);
    } catch (err) {
      console.error("별점/리뷰 업데이트 오류:", err);
    }
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
