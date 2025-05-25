import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBBLList } from '../api/bbl';
import BBLList from '../components/BBLList';
import { BBLListType } from '../types';
import { useAuthStore } from '../store';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BBLListContainer: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const { token } = useAuthStore();
  const {
    data: bblList,
    isLoading,
    error,
    refetch: bblListRefetch,
  } = useQuery<BBLListType | undefined, Error>({
    queryKey: ['bblList', startDate, endDate, page],
    queryFn: ({ queryKey }) => {
      const [, startDate, endDate, page] = queryKey as [
        string,
        string,
        string,
        number
      ];
      return fetchBBLList({ startDate, endDate, page });
    },
  });

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
    setPage(1);
  };

  useEffect(() => {
    bblListRefetch();
  }, [startDate, endDate, bblListRefetch]);

  useEffect(() => {
    if (!token || isLoading) {
      return;
    }
    fetchUser();
  }, [fetchUser, token, isLoading]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading BBL list.</p>;
  if (!bblList) return <p>No BBL data available.</p>;

  return (
    <>
      <LinkWrap>
        <Link to='/'>BBL 발행하기</Link>
      </LinkWrap>
      <BBLList
        bblList={bblList}
        startDate={startDate}
        endDate={endDate}
        handleDate={handleDate}
        totalCount={bblList.totalCount || 0}
        onPageChange={setPage}
        currentPage={page}
      />
    </>
  );
};

export default BBLListContainer;

const LinkWrap = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 10px;

  a {
    color: #666;
    text-decoration: underline;
  }
`;
