import { useEffect, useRef, useState } from "react";
import axios from "axios";

function AddFriendDialog({ openModal, onClose }) {
  const modalRef = useRef();
  const [friendId, setFriendId] = useState(""); // 입력된 친구 아이디 상태
  const jwtToken = localStorage.getItem("token") || sessionStorage.getItem("token"); // JWT 토큰 가져오기

  useEffect(() => {
    if (openModal) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [openModal]);

  // 친구 추가 API 호출
  const addFriend = async () => {
    if (!friendId || friendId.trim() === "") {
      alert("친구 아이디를 입력해주세요.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://35.216.42.151:8080/api/v1/friend/add",
        { "id" : friendId },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setFriendId("");
      alert(`친구 추가에 성공했습니다.\n친구 아이디: ${friendId}`);
      onClose();
    } catch (error) {
        alert(`친구 추가에 실패했습니다.\n친구 아이디: ${friendId}`);
    }
  };
  
  return (
    <div className="container">
      <dialog ref={modalRef} className="addFriendDialog">
        <h2>친구 추가하기</h2>
        <input
          className="dialogInput"
          placeholder="친구 아이디"
          value={friendId}
          onChange={(e) => setFriendId(e.target.value)}
        />
        <div className="dialogButtonDiv">
          <button className="dialogButton" onClick={addFriend}>
            추가
          </button>
          <button className="dialogButton cancelButton" onClick={onClose}>
            취소
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default AddFriendDialog;
