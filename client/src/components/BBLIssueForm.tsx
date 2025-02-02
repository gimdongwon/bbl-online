import React from 'react';
import styled from 'styled-components';

interface BBLApplyFormProps {
  recipientName: string;
  recipientTeam: string;
  recipientId: string;
  purpose: string;
  amount: number | '';
  onRecipientChange: (value: string) => void;
  onRecipientIdChange: (value: string) => void;
  onRecipientTeamChange: (value: string) => void;
  onPurposeChange: (value: string) => void;
  onAmountChange: (value: number | '') => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const BBLApplyForm: React.FC<BBLApplyFormProps> = ({
  recipientName,
  recipientTeam,
  recipientId,
  purpose,
  amount,
  onRecipientChange,
  onRecipientIdChange,
  onRecipientTeamChange,
  onPurposeChange,
  onAmountChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <FormContainer>
      <Form onSubmit={onSubmit}>
        <Title>BBL 발행</Title>
        <Input
          type='text'
          value={recipientName}
          onChange={(e) => onRecipientChange(e.target.value)}
          placeholder='수령인 이름'
          required
        />
        <Input
          type='text'
          value={recipientId}
          onChange={(e) => onRecipientIdChange(e.target.value)}
          placeholder='수령인 사번'
          required
        />
        <Input
          type='text'
          value={recipientTeam}
          onChange={(e) => onRecipientTeamChange(e.target.value)}
          placeholder='수령인 팀'
          required
        />
        <Select
          value={amount}
          onChange={(e) => onAmountChange(Number(e.target.value))}
          required
        >
          <option value=''>금액 선택</option>
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </Select>
        <Input
          type='text'
          value={purpose}
          onChange={(e) => onPurposeChange(e.target.value)}
          placeholder='발행 목적'
          required
        />
        <SubmitButton type='submit' disabled={isLoading}>
          {isLoading ? '발행 중...' : '발행하기'}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default BBLApplyForm;

const FormContainer = styled.div`
  width: 100%;
  max-width: 475px;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
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

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: #fafafa;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 18px 18px;
  box-sizing: border-box;
  appearance: none;
  &:focus {
    border-color: #d43131;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 30px;
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
