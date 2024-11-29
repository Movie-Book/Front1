import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigationBar from "../BottomNavigationBar";
import SearchBar from '../SearchBar';
import FriendButton from '../FriendButton';
import AddFriendDialog from '../AddFriendDialog';

const FriendList = () => {
  const [friends, setFriends] = useState([
    {name : "친구1", favorite : false},
    {name : "친구2", favorite : false},
    {name : "친구3", favorite: false},
    {name : "친구4", favorite : false},
    {name : "친구5", favorite : false},
  ]);

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(friends);
  const [openModal, setOpenModal] = useState(false);

  useEffect(()=>{
    const result = friends.filter((f)=>f.name.includes(searchText));
    setSearchResult(result);
  }, [friends, searchText]);

  const search = (text) => {
    setSearchText(text);
  }

  const toggleFavorite = (name) => {
    setFriends((prevFriends)=>
      prevFriends.map((friends)=>
        friends.name===name ? {...friends, favorite : !friends.favorite} : friends
      )
    )
  };

  return (
    <div>
      <div className="Logo">
        <img  onClick={() => navigate(-1)}  className="back" src="/image/back.png" alt="back" />
        <h3 className="info">친구 목록</h3>
        <img onClick={()=>setOpenModal(true)} className='addFriend' src="/image/addFriend.png" alt="addFriend"></img>
      </div>
      <div className="container">
        <SearchBar text="친구를 검색하세요" searchText={searchText} onSearch={search}/>
        <div>
          {searchResult.map((f)=>(
            <FriendButton
              name={f.name}
              favorite={f.favorite}
              toggleStar={()=>toggleFavorite(f.name)}
              onClick={()=>navigate('/friendInfo', {state : { name: f.name}})}
            />
          ))}
        </div>
      </div>
      <BottomNavigationBar />
      <AddFriendDialog
        openModal={openModal}
        onClose={()=>setOpenModal(false)}
      />
    </div>
  );
};

export default FriendList;
