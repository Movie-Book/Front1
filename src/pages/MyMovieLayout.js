import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EditTaste from '../components/Movie/EditTaste';
import EditFavoriteGenre from '../components/Movie/EditFavoriteGenre';
import EditHateGenre from '../components/Movie/EditHateGenre';
import MyMovie from '../components/Movie/MyMovie';
import '../css/index.css';
import '../css/MyMovieLayout.css';
import MyGenre from '../components/Movie/MyGenre';
import EditFavoriteGenre from '../components/Movie/EditFavoriteGenre';
import EditHateGenre from '../components/Movie/EditHateGenre';


const MyMovieLayout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MyMovie />} />
        <Route path="/taste" element={<EditTaste />} />
        <Route path="/genre" element={<MyGenre/>} />
        <Route path="/editFavoriteGenre" element={<EditFavoriteGenre />} />
        <Route path="/editHateGenre" element={<EditHateGenre />} />
      </Routes>
    </div>
  );
};

export default MyMovieLayout;