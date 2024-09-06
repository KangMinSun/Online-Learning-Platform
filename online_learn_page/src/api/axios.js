import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // 백엔드 API 주소
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 시 토큰을 자동으로 추가
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // 로컬스토리지에서 토큰을 가져옴
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰을 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 401 Unauthorized 에러가 발생하면 로그인 페이지로 리디렉션
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token'); // 토큰 삭제
      window.location.href = '/'; // 로그인 페이지로 리디렉션
    }
    return Promise.reject(error);
  }
);

export default instance;


