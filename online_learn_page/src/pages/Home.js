import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');  // localStorage에서 토큰 가져오기

  const handleLogout = () => {
    localStorage.removeItem('access_token');  // 로그아웃 시 토큰 제거
    navigate('/');  // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <div>
      <h1>Welcome to Online Learning Platform</h1>
      <nav>
        <ul>
          {token ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/lectures">Lectures</Link></li>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Home;








