import React, { useState } from 'react';
import axios from '../../api/axios';  
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  // 사용자 정보 초기 상태 설정
  const [user, setUser] = useState({ id: '', password: '', name: '', studentId: '', role: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 학생일 때만 studentId 필드 포함
      const data = user.role === 'student'
        ? { id: user.id, password: user.password, name: user.name, studentId: user.studentId, role: user.role }
        : { id: user.id, password: user.password, name: user.name, role: user.role };
      
      // 회원가입 API 호출
      await axios.post('/user/signup', data);
      navigate('/login');  // 회원가입 성공 후 로그인 페이지로 리디렉션
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 역할 선택 */}
      <label>
        <strong>Select Role:</strong>
        <select
          value={user.role}
          onChange={e => setUser({ ...user, role: e.target.value })}
          required
        >
          <option value="">Select Role</option>
          <option value="professor">Professor</option>
          <option value="student">Student</option>
        </select>
      </label>

      {/* 공통 정보 입력: 아이디, 비밀번호, 이름 */}
      {user.role && (
        <>
          <input
            type="text"
            placeholder="ID"
            value={user.id}
            onChange={e => setUser({ ...user, id: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={e => setUser({ ...user, name: e.target.value })}
            required
          />
        </>
      )}

      {/* 학생일 경우 학번 입력 */}
      {user.role === 'student' && (
        <input
          type="text"
          placeholder="Student ID"
          value={user.studentId}
          onChange={e => setUser({ ...user, studentId: e.target.value })}
          required
        />
      )}

      {/* 교수나 학생 정보가 입력된 경우에만 Submit 버튼 표시 */}
      {user.role && <button type="submit">Sign Up</button>}
    </form>
  );
};

export default Signup;

