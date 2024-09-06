import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [error, setError] = useState(null); // 오류 메시지 상태 추가
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 아이디와 비밀번호가 모두 입력되었는지 확인
    if (!credentials.id || !credentials.password) {
      setError('ID와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post('/auth/login', credentials);
      localStorage.setItem('access_token', response.data.access_token);
      navigate('/'); // 로그인 성공 후 홈으로 리디렉션
    } catch (error) {
      setError('로그인에 실패했습니다. 아이디나 비밀번호를 확인해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* 오류 메시지 표시 */}
      <input
        type="text"
        placeholder="ID"
        onChange={e => setCredentials({ ...credentials, id: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;


