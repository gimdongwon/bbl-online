import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const downloadBBLExcel = (bbls: any[]) => {
  if (!bbls || bbls.length === 0) {
    alert('다운로드할 데이터가 없습니다.');
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(
    bbls.map(
      ({
        recipientName,
        recipientTeam,
        recipientId,
        amount,
        purpose,
        issuerName,
        issueDate,
      }) => ({
        수령인: recipientName,
        팀: recipientTeam,
        사번: recipientId,
        금액: amount,
        발행목적: purpose,
        발행자: issuerName,
        발행일: new Date(issueDate).toLocaleDateString(),
      })
    )
  );
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'BBL 리스트');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  saveAs(blob, `BBL_List_${new Date().toISOString().slice(0, 10)}.xlsx`);
};
