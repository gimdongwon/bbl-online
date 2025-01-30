import React from 'react';

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
    <form onSubmit={onSubmit}>
      <h2>BBL 신청</h2>
      <input
        type='text'
        value={recipientName}
        onChange={(e) => onRecipientChange(e.target.value)}
        placeholder='수령인 이름'
        required
      />
      <input
        type='text'
        value={recipientTeam}
        onChange={(e) => onRecipientTeamChange(e.target.value)}
        placeholder='수령인 팀'
        required
      />
      <input
        type='text'
        value={purpose}
        onChange={(e) => onPurposeChange(e.target.value)}
        placeholder='발행 목적'
        required
      />
      <input
        type='text'
        value={bblNo}
        onChange={(e) => onBblNoChange(e.target.value)}
        placeholder='BBL 번호'
        required
      />
      <input
        type='date'
        value={issueDate}
        onChange={(e) => onIssueDateChange(e.target.value)}
        required
      />
      <input
        type='text'
        value={employeeId}
        onChange={(e) => onEmployeeIdChange(e.target.value)}
        placeholder='사번'
        required
      />
      <input
        type='number'
        value={amount}
        onChange={(e) => onAmountChange(Number(e.target.value))}
        placeholder='금액'
        required
      />
      <button type='submit' disabled={isLoading}>
        {isLoading ? '신청 중...' : '신청하기'}
      </button>
    </form>
  );
};

export default BBLApplyForm;
