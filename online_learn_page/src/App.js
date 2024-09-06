import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import LectureList from './components/Lecture/LectureList';
import CreateLecture from './components/Lecture/CreateLecture';
import PostList from './components/Post/PostList';
import CreatePost from './components/Post/CreatePost';
import Home from './pages/Home';
import Profile from './pages/Profile';
import 'react-quill/dist/quill.snow.css';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    // 토큰이 없는 경우 로그인 페이지로 리디렉션
    return <Navigate to="/" />;
  }

  // 토큰이 있는 경우 요청한 컴포넌트를 렌더링
  return children;
};

function App(){
  return (
    <Router>
      <Routes>
        {/* 첫 시작 화면은 Home 페이지 */}
        <Route path="/" element={<Home />} />
        
        {/* 로그인이나 회원가입은 토큰이 없을 때만 접근 가능 */}
        <Route path="/login" element={!localStorage.getItem('access_token') ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!localStorage.getItem('access_token') ? <Signup /> : <Navigate to="/" />} />

        {/* 토큰이 없으면 로그인 페이지로 이동, 있으면 보호된 경로로 이동 */}
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/lectures" element={<PrivateRoute><LectureList /></PrivateRoute>} />
        <Route path="/posts/lecture/:lectureId" element={<PrivateRoute><PostList /></PrivateRoute>} />
        <Route path="/create-post/:lectureId" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
        <Route path="/create-lecture" element={<PrivateRoute><CreateLecture /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;





