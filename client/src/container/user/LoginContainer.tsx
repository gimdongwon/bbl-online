import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../api/auth';
import { useAuthStore } from '../../store/authStore';
import LoginForm from '../../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginContainer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);
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

  // 페이지 로드 시 localStorage에서 아이디 복원
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberId(true);
    }
  }, []);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setRememberId(isChecked);

    if (isChecked) {
      localStorage.setItem('savedEmail', email); // 아이디 저장
    } else {
      localStorage.removeItem('savedEmail'); // 저장된 아이디 삭제
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (rememberId) {
      localStorage.setItem('savedEmail', value); // 저장된 아이디 업데이트
    }
  };

  return (
    <LoginForm
      email={email}
      password={password}
      onEmailChange={handleEmailChange}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      isLoading={loginMutation.isPending}
      rememberId={rememberId}
      handleCheckboxChange={handleCheckboxChange}
    />
  );
};

export default LoginContainer;
