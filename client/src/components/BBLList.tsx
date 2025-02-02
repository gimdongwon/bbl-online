import styled from 'styled-components';
import { BBLListType, BBLType } from '../types';

const BBLList = ({ bblList }: { bblList: BBLListType }) => {
  console.log(bblList);
  return (
    <Container>
      <Title>BBL List</Title>
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
