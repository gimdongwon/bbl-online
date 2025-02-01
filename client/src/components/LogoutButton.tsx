import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LogoutButton: React.FC = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Zustand & localStorage에서 토큰 삭제
    navigate('/login'); // 로그인 페이지로 이동
  };

  return <LogoutButtonStyled onClick={handleLogout}>Logout</LogoutButtonStyled>;
};

export default LogoutButton;

const LogoutButtonStyled = styled.button`
  padding: 5px 10px;
  background-color: #d43131;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #b32424;
  }
`;
