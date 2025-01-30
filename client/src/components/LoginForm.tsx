import React from 'react';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <h2>Login</h2>
        <input
          type='email'
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder='Email'
          required
        />
        <input
          type='password'
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder='Password'
          required
        />
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <Link to={'/register'}>회원가입하기</Link>
    </>
  );
};

export default LoginForm;
