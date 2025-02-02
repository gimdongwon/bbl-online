import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../api/auth';
import RegisterForm from '../../components/RegisterForm';
import { useNavigate } from 'react-router-dom';

const RegisterFormContainer: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [companyNo, setCompanyNo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const registerMutation = useMutation<
    { message: string }, // 성공 시 반환 타입
    Error, // 에러 타입
    { name: string; email: string; companyNo: string; password: string } // 요청 파라미터 타입
  >({
    mutationFn: registerUser,
    onSuccess: (data) => {
      alert(data.message);
      setName('');
      setEmail('');
      setCompanyNo('');
      setPassword('');
      navigate('/login');
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ name, email, companyNo, password });
  };

  return (
    <RegisterForm
      handleSubmit={handleSubmit}
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      companyNo={companyNo}
      setCompanyNo={setCompanyNo}
      password={password}
      setPassword={setPassword}
    />
  );
};

export default RegisterFormContainer;
