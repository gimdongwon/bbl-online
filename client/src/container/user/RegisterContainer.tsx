import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../api/auth';
import RegisterForm from '../../components/RegisterForm';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  name: string;
  email: string;
  companyNo: string;
  password: string;
  team: string;
  grade: string;
}

const RegisterFormContainer: React.FC = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      companyNo: '',
      password: '',
      team: '',
      grade: '',
    },
  });
  const navigate = useNavigate();

  const registerMutation = useMutation<
    { message: string }, // 성공 시 반환 타입
    Error, // 에러 타입
    {
      name: string;
      email: string;
      companyNo: string;
      password: string;
      team: string;
      grade: string;
    } // 요청 파라미터 타입
  >({
    mutationFn: registerUser,
    onSuccess: (data) => {
      alert(data.message);
      navigate('/login');
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다.');
    },
  });

  const onSubmit = (data: FormValues) => {
    registerMutation.mutate({ ...data });
  };

  return (
    <RegisterForm methods={methods} onSubmit={methods.handleSubmit(onSubmit)} />
  );
};

export default RegisterFormContainer;
