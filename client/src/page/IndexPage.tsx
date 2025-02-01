import React, { useEffect } from 'react';
import LogoutButton from '../components/LogoutButton';
import BBLIssueContainer from '../container/BBLIssueContainer';
import { useAuthStore } from '../store';
import styled from 'styled-components';

const IndexPage: React.FC = () => {
  const { user, token } = useAuthStore();
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [fetchUser, token]);

  return (
    <Container>
      <Header>BBL ONLINE</Header>
      <UserInfo>
        <WelcomeMessage>현재 사용자 : {user?.name}</WelcomeMessage>
        <LogoutButton />
      </UserInfo>
      <BBLIssueContainer />
    </Container>
  );
};

export default IndexPage;

// --- Styled Components ---
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
`;

const Header = styled.h1`
  color: #d43131;
`;

const WelcomeMessage = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

// const Header = styled.header`
//   display: flex;
//   justify-content: flex-end;
//   padding: 10px 20px;
//   background-color: #fff;
//   border-bottom: 1px solid #ddd;
// `;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    font-size: 14px;
    color: #333;
  }
`;
