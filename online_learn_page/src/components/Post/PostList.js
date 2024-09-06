import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useParams, Link } from 'react-router-dom';

const PostList = () => {
  const { lectureId } = useParams();
  const [posts, setPosts] = useState([]);
  const [role, setRole] = useState(null); // role의 초기값을 null로 설정
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('No token found');
      return;
    }

    // 사용자 정보 로드
    axios.get('/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setRole(response.data.role); // role 설정
      return axios.get(`/posts/lecture/${lectureId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    })
    .then(response => {
      setPosts(response.data);
      setLoading(false); // 로딩 종료
    })
    .catch(error => {
      console.error('Failed to fetch posts', error);
      setError('Failed to load posts.');
      setLoading(false); // 로딩 종료
    });
  }, [lectureId]);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!role) {
    return <div>Loading user role...</div>; // role이 아직 설정되지 않았을 때
  }

  return (
    <div>
      <h1>Post List</h1>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </li>
        ))}
      </ul>

      {/* role이 교수일 때 게시물 작성 버튼 표시 */}
      {role === 'professor' && (
          <Link to={`/create-post/${lectureId}`}>
            <button>Create Post</button>
          </Link>
        )}
    </div>
  );
};

export default PostList;
