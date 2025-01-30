import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Zustand & localStorage에서 토큰 삭제
    navigate('/login'); // 로그인 페이지로 이동
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
