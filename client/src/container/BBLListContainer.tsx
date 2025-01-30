import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBBLList } from '../api/bbl';
import BBLItem from '../components/BBLItem';
import { BBL, BBLList } from '../types';
import LogoutButton from '../components/LogoutButton';
import BBLIssueContainer from './BBLIssueContainer';
import { useAuthStore } from '../store';

const BBLListContainer: React.FC = () => {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const { user, token } = useAuthStore();
  const {
    data: bblList,
    isLoading,
    error,
  } = useQuery<BBLList, Error>({
    queryKey: ['bblList'],
    queryFn: fetchBBLList,
  });

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [fetchUser, token]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading BBL list.</p>;

  return (
    <div>
      <h2>BBL List</h2>
      {user?.name}
      <LogoutButton />
      <BBLIssueContainer />
      {bblList?.bbls?.map((bbl: BBL) => (
        <BBLItem
          key={bbl._id}
          name={bbl.recipientName}
          amount={bbl.amount}
          date={bbl.issueDate}
        />
      ))}
    </div>
  );
};

export default BBLListContainer;
