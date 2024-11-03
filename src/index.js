import React from 'react';
import ReactDOM from 'react-dom/client';

import MovieGenre from './pages/MovieGenre';
import Home from './pages/Home';
import MovieTaste from './pages/MovieTaste';
import BookInfo from './pages/BookInfo';
import './css/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginLayout';
import Profile from './pages/ProfileLayout';
import MyMovie from './pages/MyMovieLayout';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <Routes>
        <Route path='/' element={<MovieGenre />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/movie" element={<MovieTaste/>}/>
        <Route path="/bookInfo" element={<BookInfo/>}/>
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/mymovie/*" element={<MyMovie />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
