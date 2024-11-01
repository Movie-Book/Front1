import React from 'react';
import ReactDOM from 'react-dom/client';

import MovieGenre from './pages/MovieGenre';
import Home from './pages/Home';
import MovieTaste from './pages/MovieTaste';
import BookInfo from './pages/BookInfo';
<<<<<<< HEAD
import './css/index.css';
=======
import './index.css';
>>>>>>> 41fe2e0ba4ebf5a778d2c7166f095312874cf6f1
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginLayout';
import Profile from './pages/ProfileLayout';
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
<<<<<<< HEAD
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/login/*" element={<Login />} />
=======
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/find-id" element={<FindIDPage />} />
        <Route path="/reset-pw" element={<ResetPWPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/edit-user" element={<EditUser />} />
        <Route path="/friend-list" element={<FriendList />} />
>>>>>>> 41fe2e0ba4ebf5a778d2c7166f095312874cf6f1
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
