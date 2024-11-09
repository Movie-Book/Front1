import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigationBar from "../BottomNavigationBar";

const FriendList = () => {
  const friends = ['친구1', '친구2', '친구3', '친구4', '친구5'];
  const [favorites, setFavorites] = useState(Array(friends.length).fill(false));
  const navigate = useNavigate();

  const toggleFavorite = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites[index] = !updatedFavorites[index];
    setFavorites(updatedFavorites);
  };

  return (
    <div className="profile-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>{'<'}</button>
        <h2 className="profile-title">친구 목록</h2>
        <div className="back-button-placeholder"></div> 
      </div>
      <div className="search-bar">
        <img src={"../image/search.png"} alt="search" className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="친구를 검색하세요"
        />
      </div>
      <ul className="friend-list">
        {friends.map((friend, index) => (
          <li key={index} className="friend-item">
            <span
              className={`star-icon ${favorites[index] ? 'active' : ''}`}
              onClick={() => toggleFavorite(index)}
            >
              {favorites[index] ? '★' : '☆'}
            </span>{' '}
            {friend}
          </li>
        ))}
      </ul>
      <BottomNavigationBar />
    </div>
  );
};

export default FriendList;
