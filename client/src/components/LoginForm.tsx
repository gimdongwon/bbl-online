import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  rememberId: boolean;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isLoading,
  rememberId,
  handleCheckboxChange,
}) => {
  return (
    <LoginPageContainer>
      <LoginBox>
        <Logo>Encar</Logo>
        <LogoSub>BBL-ONLINE</LogoSub>
        <CheckboxContainer>
          <input
            type='checkbox'
            id='rememberId'
            checked={rememberId}
            onChange={handleCheckboxChange}
          />
          <label htmlFor='rememberId'>아이디 저장</label>
        </CheckboxContainer>
        <form onSubmit={onSubmit}>
          <Input
            type='email'
            value={email}
            onChange={onEmailChange}
            placeholder='Email'
            required
            aria-label={email}
          />
          <Input
            type='password'
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder='Password'
            required
            aria-label='password'
          />
          <LoginButton type='submit' disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </LoginButton>
        </form>
        <FooterLinks>
          <Link to={'/register'}>회원가입하기</Link>
          <PasswordInitial
            onClick={() =>
              alert(
                '비밀번호 초기화는 관리자에게 문의해주세요. (People & Culture 팀 유예은 대리님한테 연락주세요)'
              )
            }
          >
            비밀번호 초기화
          </PasswordInitial>
        </FooterLinks>
        <FooterText>FE2 winter1 © Encar 1599-5455</FooterText>
      </LoginBox>
    </LoginPageContainer>
  );
};

export default LoginForm;

// styled

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  background-color: #f9f9f9;
  padding: 20px;
`;

const LoginBox = styled.div`
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Logo = styled.h1`
  font-size: 36px;
  color: #d43131;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
`;
const LogoSub = styled.p`
  font-size: 18px;
  color: #666;
  font-weight: 600;
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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 20px;
  font-size: 14px;

  input[type='checkbox'] {
    margin-right: 8px;
    width: 16px;
    height: 16px;
    border: 1px solid #ccc; /* 기본 테두리 */
    border-radius: 4px;
    background-color: white; /* 기본 배경 */
    cursor: pointer;
    appearance: none;
  }
  input[type='checkbox']:checked {
    background-color: #d43131; /* 체크된 배경 */
    border-color: #d43131;
    content: '✔'; /* 체크 표시 추가 */
    display: flex;
    justify-content: center;
    align-items: center;
    color: white; /* 체크 표시 색상 */
  }
  label {
    cursor: pointer; /* 라벨 클릭 시 체크박스 활성화 */
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px 16px;
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

const FooterLinks = styled.div`
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

const PasswordInitial = styled.span`
  cursor: pointer;
  color: #666;
  text-decoration: underline;
`;

const FooterText = styled.div`
  margin-top: 30px;
  font-size: 12px;
  color: #999;
`;
