import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateLecture = () => {
  const [lecture, setLecture] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/lectures', lecture, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      navigate('/lectures');
    } catch (error) {
      console.error('Failed to create lecture', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        onChange={e => setLecture({ ...lecture, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        onChange={e => setLecture({ ...lecture, description: e.target.value })}
        required
      />
      <button type="submit">Create Lecture</button>
    </form>
  );
};

export default CreateLecture;
