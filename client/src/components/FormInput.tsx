import React from 'react';

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
    <div>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default FormInput;
