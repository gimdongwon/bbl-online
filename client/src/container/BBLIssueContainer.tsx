import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { issueBBL } from '../api/bbl';
import BBLIssueForm from '../components/BBLIssueForm';
import { useAuthStore } from '../store';

const BBLIssueContainer: React.FC = () => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [recipientTeam, setRecipientTeam] = useState('');
  const [purpose, setPurpose] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const { user, logout } = useAuthStore();

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
    if (!user) {
      alert('로그인 유저 정보가 없습니다. 로그인을 다시 해주세요');
      logout();
      return;
    }
    if (!recipientName || !recipientTeam || !purpose || !amount) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    issueBBLMutation.mutate({
      recipientName,
      recipientTeam,
      recipientId,
      purpose,
      amount: Number(amount),
      issuerId: user.companyNo,
    });
  };

  return (
    <BBLIssueForm
      recipientName={recipientName}
      recipientId={recipientId}
      recipientTeam={recipientTeam}
      purpose={purpose}
      amount={amount}
      onRecipientChange={setRecipientName}
      onRecipientIdChange={setRecipientId}
      onRecipientTeamChange={setRecipientTeam}
      onPurposeChange={setPurpose}
      onAmountChange={setAmount}
      onSubmit={handleSubmit}
      isLoading={issueBBLMutation.isPending}
    />
  );
};

export default BBLIssueContainer;
