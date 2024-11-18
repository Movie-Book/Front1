import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EditGenre from '../components/Movie/EditGenre';
import EditTaste from '../components/Movie/EditTaste';
import MyMovie from '../components/Movie/MyMovie';
import '../css/index.css';
import '../css/MyMovieLayout.css';


const MyMovieLayout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MyMovie />} />
        <Route path="/taste" element={<EditTaste />} />
        <Route path="/genre" element={<EditGenre />} />
      </Routes>
    </div>
  );
};

export default MyMovieLayout;