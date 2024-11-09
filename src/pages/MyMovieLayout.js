import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EditGenre from '../components/Movie/EditGenre';
import EditTaste from '../components/Movie/EditTaste';


const MyMovieLayout = () => {
  return (
    <div>
      <Routes>
        <Route path="/genre" element={<EditGenre />} />
        <Route path="/taste" element={<EditTaste />} />
      </Routes>
    </div>
  );
};

export default MyMovieLayout;