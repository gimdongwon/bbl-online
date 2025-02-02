import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBBLList } from '../api/bbl';
import BBLList from '../components/BBLList';
import { BBLListType } from '../types';
import { useAuthStore } from '../store';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BBLListContainer: React.FC = () => {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const { token } = useAuthStore();
  const {
    data: bblList,
    isLoading,
    error,
  } = useQuery<BBLListType | undefined, Error>({
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
  if (!bblList) return <p>No BBL data available.</p>;

  return (
    <>
      <LinkWrap>
        <Link to='/'>BBL 발행하기</Link>
      </LinkWrap>
      <BBLList bblList={bblList} />
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
