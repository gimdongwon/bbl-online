import React, { FormEventHandler } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Controller, UseFormReturn } from 'react-hook-form';
import Select from 'react-select';
import { TEAM_LIST } from '../const/team';

interface FormValues {
  name: string;
  email: string;
  password: string;
  companyNo: string;
  team: string;
}

interface RegisterFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  methods: UseFormReturn<FormValues>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, methods }) => {
  const { register, control } = methods;
  return (
    <Container>
      <RegisterBox>
        <Title>회원가입 페이지</Title>
        <form onSubmit={onSubmit}>
          <Input
            type='name'
            {...register('name')}
            aria-label='name'
            placeholder='name'
          />
          <Input
            type='email'
            {...register('email')}
            aria-label='email'
            placeholder='email'
          />
          <Controller
            name='team'
            control={control}
            render={({ field }) => (
              <StyledSelect
                {...field}
                options={TEAM_LIST}
                placeholder='team'
                onChange={(selected) =>
                  field.onChange((selected as { value: string })?.value)
                } // 값을 문자열로 전달
                value={TEAM_LIST.find((option) => option.value === field.value)}
                isClearable
              />
            )}
          />
          <Input
            type='companyNo'
            {...register('companyNo')}
            aria-label='companyNo'
            placeholder='companyNo'
          />
          <Input
            type='password'
            {...register('password')}
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

export default RegisterForm;

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

export const StyledSelect = styled(Select).attrs({
  classNamePrefix: 'custom-select',
})`
  .custom-select__control {
    width: 100%;
    padding: 2px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    background-color: #fafafa;
    text-align: left;
    box-shadow: none;
    &:hover {
      border-color: #d43131;
    }
  }

  .custom-select__control--is-focused {
    border-color: #d43131;
  }

  .custom-select__menu {
    z-index: 9999;
  }

  .custom-select__menu-list {
    max-height: 200px;
    overflow-y: auto;
  }

  .custom-select__option {
    font-size: 14px;
    background-color: #fff;
    color: #333;
    cursor: pointer;
    text-align: left;
    padding: 10px;

    &:hover {
      background-color: #f2f2f2;
    }
  }

  .custom-select__option--is-focused {
    background-color: #ffecec;
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
