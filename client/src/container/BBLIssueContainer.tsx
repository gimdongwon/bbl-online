import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { issueBBL } from '../api/bbl';
import BBLIssueForm from '../components/BBLIssueForm';

const BBLIssueContainer: React.FC = () => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientTeam, setRecipientTeam] = useState('');
  const [purpose, setPurpose] = useState('');
  const [bblNo, setBblNo] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const queryClient = useQueryClient(); // React Query의 QueryClient 사용

  const issueBBLMutation = useMutation({
    mutationFn: issueBBL,
    onSuccess: () => {
      alert('BBL 신청이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['bblList'] });
    },
    onError: (error: any) => {
      alert('BBL 신청 실패: ' + error.response.data.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !recipientName ||
      !recipientTeam ||
      !purpose ||
      !bblNo ||
      !issueDate ||
      !employeeId ||
      !amount
    ) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    issueBBLMutation.mutate({
      recipientName,
      recipientTeam,
      purpose,
      bblNo,
      issueDate,
      employeeId,
      amount: Number(amount),
      issuer: '인사팀',
    });
  };

  return (
    <BBLIssueForm
      recipientName={recipientName}
      recipientTeam={recipientTeam}
      purpose={purpose}
      bblNo={bblNo}
      issueDate={issueDate}
      employeeId={employeeId}
      amount={amount}
      onRecipientChange={setRecipientName}
      onRecipientTeamChange={setRecipientTeam}
      onPurposeChange={setPurpose}
      onBblNoChange={setBblNo}
      onIssueDateChange={setIssueDate}
      onEmployeeIdChange={setEmployeeId}
      onAmountChange={setAmount}
      onSubmit={handleSubmit}
      isLoading={issueBBLMutation.isPending}
    />
  );
};

export default BBLIssueContainer;
