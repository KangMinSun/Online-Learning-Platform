import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';

const LectureList = () => {
  const [lectures, setLectures] = useState([]);
  const [enrolledLectures, setEnrolledLectures] = useState([]);
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No token found');
      return;
    }

    // 사용자 정보 로드
    axios.get('/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setRole(response.data.role);

      // 강의 목록 로드 (교수일 경우)
      if (response.data.role === 'professor') {
        return axios.get('/lectures', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // 학생일 경우 모든 강의 목록 로드
        return axios.get('/lectures/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    })
    .then(response => {
      setLectures(response.data);
      
      // 학생일 경우 수강 신청한 강의도 로드
      if (role === 'student') {
        return axios.get('/lectures/student', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    })
    .then(response => {
      if (role === 'student') {
        setEnrolledLectures(response.data);
      }
    })
    .catch(error => {
      console.error('Failed to fetch lectures:', error);
      setError('Failed to load lectures.');
    });
  }, [role]);

  const handleEnroll = async (lectureId) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      // 수강 신청 요청
      await axios.post('/lectures/enroll', { lectureId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // 수강 신청 후 수강한 강의 목록 업데이트
      const enrolledResponse = await axios.get('/lectures/student', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEnrolledLectures(enrolledResponse.data);
    } catch (error) {
      console.error('Enrollment failed:', error);
      setError('Failed to enroll in lecture.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  // 수강 신청 여부 확인 함수
  const isEnrolled = (lectureId) => {
    return enrolledLectures.some(enrolledLecture => enrolledLecture._id === lectureId);
  };

  return (
    <div>
      <h2>Lecture List</h2>

      {/* 교수일 경우 Create Lecture 버튼을 표시 */}
      {role === 'professor' && (
        <Link to="/create-lecture">
          <button>Create Lecture</button>
        </Link>
      )}

      {role === 'professor' ? (
        <ul>
          {lectures.map(lecture => (
            <li key={lecture._id}>
              <h3>{lecture.title}</h3>
              <p>{lecture.description}</p>
              <Link to={`/posts/lecture/${lecture._id}`}>View Posts</Link>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <h3>All Lectures</h3>
          <ul>
            {lectures.map(lecture => (
              <li key={lecture._id}>
                <h3>{lecture.title}</h3>
                <p>{lecture.description}</p>

                {/* 이미 수강 신청한 강의에는 수강 신청 버튼 표시 X */}
                {!isEnrolled(lecture._id) && (
                  <button onClick={() => handleEnroll(lecture._id)}>Enroll</button>
                )}
              </li>
            ))}
          </ul>
          
          <h3>Enrolled Lectures</h3>
          <ul>
            {enrolledLectures.map(lecture => (
              <li key={lecture._id}>
                <h3>{lecture.title}</h3>
                <p>{lecture.description}</p>
                <Link to={`/posts/lecture/${lecture._id}`}>View Posts</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default LectureList;







