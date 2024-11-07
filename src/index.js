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
import reportWebVitals from './reportWebVitals';
import MovieSearch from './pages/MovieSearch';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <Routes>
        <Route path="/movieGenre" element={<MovieGenre />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/movie" element={<MovieTaste/>}/>
        <Route path="/bookInfo" element={<BookInfo/>}/>
        <Route path="/search" element={<MovieSearch/>}/>
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/login/*" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
