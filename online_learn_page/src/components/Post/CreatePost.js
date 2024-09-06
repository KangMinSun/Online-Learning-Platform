import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill'; // Quill 편집기 가져오기
import 'react-quill/dist/quill.snow.css'; // Quill 기본 스타일

const CreatePost = () => {
  const { lectureId } = useParams();
  const [post, setPost] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/posts`, { ...post, lectureId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      });
      navigate(`/posts/lecture/${lectureId}`);
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
      type="text" 
      placeholder="Title" 
      onChange={e => setPost({ ...post, title: e.target.value })} required 
      />
      <ReactQuill
        value={post.content || ''} // 기본값을 빈 문자열로 설정하여 null 방지
        onChange={(value) => setPost({ ...post, content: value })}
        placeholder="Write your content here..."
        theme="snow" // Quill의 기본 테마 사용
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;


