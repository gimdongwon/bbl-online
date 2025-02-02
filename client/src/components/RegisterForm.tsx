import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface RegisterFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  companyNo: string;
  setCompanyNo: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
}

const RegisterFormContainer: React.FC<RegisterFormProps> = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  companyNo,
  setCompanyNo,
  password,
  setPassword,
}) => {
  return (
    <Container>
      <RegisterBox>
        <Title>회원가입 페이지</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label='email'
            placeholder='name'
          />
          <Input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label='email'
            placeholder='email'
          />
          <Input
            type='companyNo'
            value={companyNo}
            onChange={(e) => setCompanyNo(e.target.value)}
            aria-label='companyNo'
            placeholder='companyNo'
          />
          <Input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label='password'
            placeholder='password'
          />
          <RegisterButton type='submit'>다음</RegisterButton>
        </form>
        <LoginLink>
          <Link to={'/login'}>로그인하러가기</Link>
        </LoginLink>
      </RegisterBox>
    </Container>
  );
};

export default RegisterFormContainer;

// --- Styled Components ---
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

const RegisterBox = styled.div`
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

const RegisterButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  margin-top: 30px;
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

const LoginLink = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 10px;

  a {
    color: #666;
    text-decoration: underline;
  }
`;
