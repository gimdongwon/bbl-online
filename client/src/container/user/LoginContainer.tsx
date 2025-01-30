import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../api/auth';
import { useAuthStore } from '../../store/authStore';
import LoginForm from '../../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginContainer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  // useMutation에 명시적 타입 추가
  const loginMutation = useMutation<
    {
      user: {
        name: string;
        email: string;
        id: string;
      };
      token: string;
    }, // 성공 시 반환 타입
    Error, // 에러 타입
    { email: string; password: string } // 요청 변수 타입
  >({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setToken(data.token);
      alert('Login successful!');
      navigate('/'); // 로그인 성공 시 '/'로 이동
    },
    onError: (error) => {
      alert('Login failed: ' + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <LoginForm
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      isLoading={loginMutation.isPending}
    />
  );
};

export default LoginContainer;
