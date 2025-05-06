import React, { useCallback, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { issueBBL } from '../api/bbl';
import BBLIssueForm from '../components/BBLIssueForm';
import { useAuthStore } from '../store';
import { getSearchUser } from '../api/auth';
import debounce from 'lodash.debounce';

const BBLIssueContainer: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const [purpose, setPurpose] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [userOptions, setUserOptions] = useState([]);

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
    if (!user || !selectedUser || !purpose || !amount) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    issueBBLMutation.mutate({
      recipientName: selectedUser.value,
      recipientTeam: selectedUser.team,
      recipientId: selectedUser.companyNo,
      purpose,
      amount: Number(amount),
      issuerId: user.companyNo,
    });
  };

  const fetchUserOptions = async (input: string) => {
    if (!input) return;
    try {
      const users = await getSearchUser(input);
      const formatted = users.map((user: any) => ({
        label: `${user.name} | ${user.companyNo} | ${user.team}`,
        value: user.name,
        team: user.team,
        companyNo: user.companyNo,
      }));
      setUserOptions(formatted);
    } catch (err) {
      console.error(err);
    }
  };
  // debounce 적용된 함수 메모이제이션
  const debouncedFetchUserOptions = useMemo(
    () => debounce(fetchUserOptions, 500),
    []
  );

  const handleInputChange = useCallback(
    (input: string) => {
      debouncedFetchUserOptions(input);
    },
    [debouncedFetchUserOptions]
  );

  return (
    <BBLIssueForm
      selectedUser={selectedUser}
      purpose={purpose}
      amount={amount}
      onSelectUser={setSelectedUser}
      onPurposeChange={setPurpose}
      onAmountChange={setAmount}
      onSubmit={handleSubmit}
      isLoading={issueBBLMutation.isPending}
      userOptions={userOptions}
      onInputChange={handleInputChange}
    />
  );
};

export default BBLIssueContainer;
