import { useForm } from 'react-hook-form';
import { patchChangePassword } from '../api/auth';
import { useAuthStore } from '../store';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setFocus,
    setError,
  } = useForm<FormValues>();
  const newPassword = watch('newPassword');
  const { user, fetchUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      const { currentPassword, newPassword } = data;
      const req = {
        currentPassword,
        newPassword,
      };
      await patchChangePassword(req);
      alert('Change password successful!');
      logout();
      navigate('/login');
    } catch (error) {
      console.error(error);
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        (error as any).response?.data?.message === '현재 비밀번호가 틀립니다.'
      ) {
        setError('currentPassword', {
          type: 'manual',
          message: '현재 비밀번호가 틀립니다.',
        });
        setFocus('currentPassword');
        return;
      }
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [fetchUser, user]);
  return (
    <Container>
      <ChangePasswordBox>
        <Title>비밀번호 변경</Title>
        {user && (
          <LoginInfo>
            현재 로그인된 사용자:{' '}
            <strong>
              {user.name} {user.companyNo}
            </strong>
          </LoginInfo>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type='password'
            {...register('currentPassword', {
              required: '현재 비밀번호를 입력해주세요',
            })}
            placeholder='현재 비밀번호'
          />
          {errors.currentPassword && (
            <Error>{errors.currentPassword.message}</Error>
          )}

          <Input
            type='password'
            {...register('newPassword', {
              required: '새 비밀번호를 입력해주세요',
            })}
            placeholder='새 비밀번호'
          />
          {errors.newPassword && <Error>{errors.newPassword.message}</Error>}

          <Input
            type='password'
            {...register('confirmPassword', {
              required: '새 비밀번호를 다시 입력해주세요',
              validate: (value) =>
                value === newPassword || '비밀번호가 일치하지 않습니다',
            })}
            placeholder='새 비밀번호 확인'
          />
          {errors.confirmPassword && (
            <Error>{errors.confirmPassword.message}</Error>
          )}
          <RegisterButton type='submit'>비밀번호 변경</RegisterButton>
        </form>
      </ChangePasswordBox>
    </Container>
  );
};

export default ChangePasswordForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: #f9f9f9;
  padding: 20px;
`;

const ChangePasswordBox = styled.div`
  max-width: 475px;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
`;

const LoginInfo = styled.p`
  font-size: 14px;
  margin-bottom: 24px;
  color: #444;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: #fafafa;
  &:focus {
    border-color: #d43131;
    outline: none;
  }
`;

const Error = styled.p`
  margin-top: -12px;
  margin-bottom: 16px;
  color: #d43131;
  font-size: 13px;
  text-align: left;
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  margin-top: 10px;
  background-color: #d43131;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;
