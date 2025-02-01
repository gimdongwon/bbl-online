import React from 'react';
import FormInput from '../components/FormInput';
import styled from 'styled-components';

interface RegisterFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
}

const RegisterFormContainer: React.FC<RegisterFormProps> = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <Container>
      <RegisterBox>
        <Title>회원가입 페이지</Title>
        <Form onSubmit={handleSubmit}>
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
          <RegisterButton type='submit'>Register</RegisterButton>
        </Form>
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
  background-color: #f9f9f9;
  padding: 20px;
`;

const RegisterBox = styled.div`
  width: 360px;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background-color: #d43131;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;
