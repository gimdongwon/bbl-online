import React from 'react';
import styled from 'styled-components';

interface BBLApplyFormProps {
  recipientName: string;
  recipientTeam: string;
  purpose: string;
  bblNo: string;
  issueDate: string;
  employeeId: string;
  amount: number | '';
  onRecipientChange: (value: string) => void;
  onRecipientTeamChange: (value: string) => void;
  onPurposeChange: (value: string) => void;
  onBblNoChange: (value: string) => void;
  onIssueDateChange: (value: string) => void;
  onEmployeeIdChange: (value: string) => void;
  onAmountChange: (value: number | '') => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const BBLApplyForm: React.FC<BBLApplyFormProps> = ({
  recipientName,
  recipientTeam,
  purpose,
  bblNo,
  issueDate,
  employeeId,
  amount,
  onRecipientChange,
  onRecipientTeamChange,
  onPurposeChange,
  onBblNoChange,
  onIssueDateChange,
  onEmployeeIdChange,
  onAmountChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <FormContainer>
      <Form onSubmit={onSubmit}>
        <h2>BBL 신청</h2>
        <Input
          type='text'
          value={recipientName}
          onChange={(e) => onRecipientChange(e.target.value)}
          placeholder='수령인 이름'
          required
        />
        <Input
          type='text'
          value={recipientTeam}
          onChange={(e) => onRecipientTeamChange(e.target.value)}
          placeholder='수령인 팀'
          required
        />
        <Input
          type='text'
          value={purpose}
          onChange={(e) => onPurposeChange(e.target.value)}
          placeholder='발행 목적'
          required
        />
        <Input
          type='number'
          value={amount}
          onChange={(e) => onAmountChange(Number(e.target.value))}
          placeholder='금액'
          required
        />
        <Input
          type='text'
          value={bblNo}
          onChange={(e) => onBblNoChange(e.target.value)}
          placeholder='BBL 번호'
          required
        />
        <Input
          type='date'
          value={issueDate}
          onChange={(e) => onIssueDateChange(e.target.value)}
          required
        />
        <Input
          type='text'
          value={employeeId}
          onChange={(e) => onEmployeeIdChange(e.target.value)}
          placeholder='사번'
          required
        />
        <SubmitButton type='submit' disabled={isLoading}>
          {isLoading ? '신청 중...' : '신청하기'}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default BBLApplyForm;

const FormContainer = styled.div`
  width: 360px;
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

const SubmitButton = styled.button`
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
