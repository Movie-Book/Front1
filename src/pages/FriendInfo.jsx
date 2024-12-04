import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import YesNoModal from "../components/YesNoModal";
import BookTasteButton from "../components/BookTasteButton";
import axios from "axios";

function FriendInfo() {
  const location = useLocation();
  const name = location.state?.id || "___";
  const navigate = useNavigate();
  const [starRating, setStarRating] = useState({});
  const [books, setBooks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const friendRecommendedBook = async (name) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://35.216.42.151:8080/api/v1/friend/${name}/book`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data.bookList;
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log("잘못된 접근입니다.");
        } else if (error.response.status === 403) {
          console.log("유효성 검사 실패");
        } else {
          console.error("Error: ", error);
          console.log("서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.");
        }
      }
      return [];
    }
  };

  const handleDeleteFriend = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("토큰: ", token);
console.log("전송 데이터: ", { id: name });
      const response = await axios.patch(
        "http://35.216.42.151:8080/api/v1/friend/delete",
        { id: name }, 
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("친구 삭제에 성공했습니다.");
        setIsModalOpen(false); // 모달 닫기
        navigate("/friendlist"); // 친구 목록 페이지로 이동
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log("존재하지 않는 유저입니다.");
        } else if (error.response.status === 403) {
          console.log("잘못된 접근 권한입니다.");
        } else {
          console.error("Error: ", error);
          console.log("서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.");
        }
      }
      setIsModalOpen(false); // 모달 닫기
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (name) {
      friendRecommendedBook(name).then((bookList) => {
        setBooks(bookList || []); // 책 리스트 상태 업데이트
      });
    }
  }, [name]);

  return (
    <div>
      <div className="Logo">
        <img onClick={() => navigate(-1)} className="back" src="/image/back.png" alt="back" />
        <h3 className="info">{name}</h3>
      </div>
      <div className="container">
        <h3>{name}님이 추천 받은 책</h3>
        <div className="movieContainer">
          {books.map((m) => (
            <BookTasteButton
              key={m.bookTitle}
              onClick={null}
              bookImage={m.image}
              bookTitle={m.name}
              rate={m.rating || 0}
              selected={m.rating > 0}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#ffffff",
          position: "sticky",
          bottom: "0",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: "5px 0px",
        }}
      >
        <button
          style={{
            backgroundColor: "#808080",
            color: "#ffffff",
            width: "100%",
            fontSize: "25px",
            fontWeight: "bold",
            border: "none",
            margin: "20px 0px",
          }}
          onClick={openModal}
        >
          <h3>친구 삭제</h3>
        </button>
      </div>

      <YesNoModal
        isOpen={isModalOpen}
        message="정말 삭제하시겠습니까?"
        onConfirm={handleDeleteFriend}
        onCancel={closeModal}
      />
    </div>
  );
}

export default FriendInfo;
