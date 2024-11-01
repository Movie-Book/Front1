import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyPage from '../components/Profile/MyPage';
import EditUser from '../components/Profile/EditUser';
import FriendList from '../components/Profile/FriendList';
import '../css/ProfileLayout.css';

const ProfileLayout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MyPage />} />
        <Route path="edit-user" element={<EditUser />} />
        <Route path="friend-list" element={<FriendList />} />
      </Routes>
    </div>
  );
};

export default ProfileLayout;