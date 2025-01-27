import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBBLList } from '../api/bbl';
import BBLItem from '../components/BBLItem';
import { BBL, BBLList } from '../types';

const BBLListContainer: React.FC = () => {
  const {
    data: bblList,
    isLoading,
    error,
  } = useQuery<BBLList, Error>({
    queryKey: ['bblList'],
    queryFn: fetchBBLList,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading BBL list.</p>;

  return (
    <div>
      <h2>BBL List</h2>
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
