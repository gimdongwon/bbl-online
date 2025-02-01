import React from 'react';
import styled from 'styled-components';
interface FormInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
}) => {
  return (
    <FloatingInputWrapper>
      <Input
        type={type}
        value={value}
        placeholder={value}
        onChange={onChange}
      />
      <FloatingLabel>{label}</FloatingLabel>
    </FloatingInputWrapper>
  );
};

export default FormInput;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: #fafafa;
  box-sizing: border-box;
  &:focus {
    border-color: #d43131;
    outline: none;
  }
`;

const FloatingInputWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const FloatingLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  background: white;
  padding: 0 4px;
  font-size: 14px;
  color: #aaa;
  transition: all 0.2s;
  pointer-events: none;

  input:focus + &,
  input:not(:placeholder-shown) + & {
    top: -8px;
    left: 10px;
    font-size: 12px;
    color: #d43131;
  }
`;
