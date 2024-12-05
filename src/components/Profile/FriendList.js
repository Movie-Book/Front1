import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigationBar from "../BottomNavigationBar";
import SearchBar from "../SearchBar";
import FriendButton from "../FriendButton";
import AddFriendDialog from "../AddFriendDialog";

function FriendList() {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("token") || sessionStorage.getItem("token"); // JWT 토큰 가져오기

  const [friends, setFriends] = useState([]); // 친구 목록 상태
  const [searchText, setSearchText] = useState(""); // 검색어 상태
  const [searchResult, setSearchResult] = useState([]); // 검색 결과 상태
  const [openModal, setOpenModal] = useState(false); // 모달 상태
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태

  // **친구 목록 API 호출**
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get("http://35.216.42.151:8080/api/v1/friend", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${jwtToken}`, // 인증 헤더 추가
          },
        });

        // **데이터 검증 후 상태에 저장**
        const validFriends = Object.values(
          response.data
            .filter((friend) => friend?.id)
            .reduce((acc, friend) => {
              acc[friend.id] = friend; 
              return acc;
            }, {})
        );
        
        setFriends(validFriends);
        setSearchResult(validFriends); // 초기 검색 결과 설정
      } catch (error) {
        console.error("친구 목록 가져오기 오류:", error);
        setErrorMessage("친구 목록을 불러오지 못했습니다. 다시 시도해주세요.");
      }
    };

    fetchFriends();
  }, [jwtToken]);

  // **검색 기능**
  useEffect(() => {

    const result = friends.filter(
      (friend) => friend.id && friend.id.includes(searchText) // `friend.id` 검증 및 검색
    );


    setSearchResult(result);
  }, [friends, searchText]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  // **친구 즐겨찾기 상태 토글**
  const toggleFavorite = (id) => {

    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.id === id ? { ...friend, favorite: !friend.favorite } : friend
      )
    );
  };

  return (
    <div>
      <div className="Logo">
        <img
          onClick={() => navigate(-1)}
          className="back"
          src="/image/back.png"
          alt="back"
        />
        <h3 className="info">친구 목록</h3>
        <img
          onClick={() => setOpenModal(true)}
          className="addFriend"
          src="/image/addFriend.png"
          alt="addFriend"
        />
      </div>
      <div className="container">
        <SearchBar
          text="친구를 검색하세요"
          searchText={searchText}
          onSearch={handleSearch}
        />
        <div>
          {errorMessage ? ( // 에러 메시지 표시
            <p>{errorMessage}</p>
          ) : searchResult.length === 0 ? (
            <p>친구가 없어요</p>
          ) : (
            searchResult.map((friend) => (
              <FriendButton
                key={friend.id} 
                name={friend.id} 
                favorite={friend.favorite}
                toggleStar={() => toggleFavorite(friend.id)}
                onClick={() =>
                  navigate("/friendInfo", { state: { id: friend.id } })
                }
              />
            ))
          )}
        </div>
      </div>
      <BottomNavigationBar />
      <AddFriendDialog openModal={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}

export default FriendList;
