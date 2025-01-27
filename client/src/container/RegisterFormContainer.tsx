import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/auth';
import FormInput from '../components/FormInput';

const RegisterFormContainer: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerMutation = useMutation<
    { message: string }, // 성공 시 반환 타입
    Error, // 에러 타입
    { name: string; email: string; password: string } // 요청 파라미터 타입
  >({
    mutationFn: registerUser,
    onSuccess: (data) => {
      alert(data.message);
      setName('');
      setEmail('');
      setPassword('');
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <FormInput
        label='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormInput
        label='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        label='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Register</button>
    </form>
  );
};

export default RegisterFormContainer;
