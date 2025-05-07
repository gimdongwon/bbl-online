import styled from 'styled-components';
import { BBLListType, BBLType } from '../types';

interface Props {
  bblList: BBLListType;
  startDate: string;
  endDate: string;
  handleDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  totalCount: number;
  onPageChange: (value: number) => void;
}

const BBLList = ({
  bblList,
  startDate,
  endDate,
  handleDate,
  totalCount,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(totalCount / 10);

  return (
    <Container>
      <Title>BBL List</Title>
      <DateFilterWrapper>
        <label htmlFor='startDate' />
        <Input
          type='date'
          name='startDate'
          value={startDate}
          onChange={handleDate}
          placeholder='시작 날짜'
        />
        <label htmlFor='endDate' />
        <Input
          type='date'
          name='endDate'
          value={endDate}
          onChange={handleDate}
          placeholder='종료 날짜'
        />
      </DateFilterWrapper>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>No</TableHeader>
            <TableHeader>발행자사번</TableHeader>
            <TableHeader>발행자 이름</TableHeader>
            <TableHeader>대상자 이름</TableHeader>
            <TableHeader>대상자 팀</TableHeader>
            <TableHeader>목적</TableHeader>
            <TableHeader>BBL 수량</TableHeader>
            <TableHeader>발행날짜</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {bblList.bbls.map((bbl: BBLType, index: number) => (
            <TableRow key={bbl._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{bbl.issuerId}</TableCell>
              <TableCell>{bbl.issuerName}</TableCell>
              <TableCell>{bbl.recipientName}</TableCell>
              <TableCell>{bbl.recipientTeam}</TableCell>
              <TableCell>{bbl.purpose}</TableCell>
              <TableCell>{bbl.amount}</TableCell>
              <TableCell>{new Date(bbl.issueDate).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <PaginationWrapper>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PageButton key={page} onClick={() => onPageChange(page)}>
            {page}
          </PageButton>
        ))}
      </PaginationWrapper>
    </Container>
  );
};

export default BBLList;

const Container = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f9f9f9; /* 배경색 설정 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 중앙 정렬 */
  text-align: center;
`;

const DateFilterWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;

  input[type='date'] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    background-color: #fafafa;
    &:focus {
      border-color: #d43131;
      outline: none;
    }
  }
`;

const Input = styled.input`
  width: 200px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th`
  padding: 12px 16px;
  background-color: #d43131;
  color: white;
  font-size: 14px;
  text-align: center;
`;

const TableCell = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #ccc;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 30px;
  flex-wrap: wrap;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${({ active }) => (active ? '#d43131' : '#ccc')};
  background-color: ${({ active }) => (active ? '#d43131' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  min-width: 32px;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? '#d43131' : '#f8f8f8')};
    border-color: #d43131;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;
