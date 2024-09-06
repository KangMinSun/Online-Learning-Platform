import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/'); // 토큰이 없으면 로그인 페이지로 리디렉션
      return;
    }

    axios.get('/user/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    .then((response) => {
      setUser(response.data); // 백엔드에서 응답받은 유저 정보를 상태에 저장
    })
    .catch((error) => {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile.');
    });
  }, [navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Role:</strong> {user.role === 'professor' ? 'Professor' : 'Student'}</p>
      {user.role === 'student' && <p><strong>Student ID:</strong> {user.studentId}</p>}
      <button onClick={() => {
        localStorage.removeItem('access_token');
        navigate('/');
      }}>Logout</button>
    </div>
  );
};

export default Profile;


  


