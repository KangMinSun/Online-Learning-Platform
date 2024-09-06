import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import LectureList from './components/Lecture/LectureList';
import CreateLecture from './components/Lecture/CreateLecture';
import PostList from './components/Post/PostList';
import CreatePost from './components/Post/CreatePost';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import './index.css';
import 'react-quill/dist/quill.snow.css';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('access_token');
  return token ? <Component /> : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
        <Route path="/lectures" element={<PrivateRoute element={LectureList} />} />
        <Route path="/posts/lecture/:lectureId" element={<PrivateRoute element={PostList} />} />
        <Route path="/create-post/:lectureId" element={<PrivateRoute element={CreatePost} />} />
        <Route path="/create-lecture" element={<PrivateRoute element={CreateLecture} />} />
      </Routes>
    </Router>
  );
};

const container = document.getElementById('root');
const root = createRoot(container); // createRoot를 사용하여 루트 컨테이너를 생성
root.render(<App />); // App을 렌더링

