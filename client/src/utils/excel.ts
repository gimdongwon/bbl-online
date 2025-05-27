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
        recipientTeam,
        recipientId,
        recipientName,
        amount,
        bblNo,
        purpose,
        issuerName,
        issueDate,
        category,
      }) => ({
        수령인팀명: recipientTeam,
        수령인사번: recipientId,
        수령인이름: recipientName,
        금액: amount,
        BBLNo: bblNo,
        목적상세: purpose,
        발행인이름: issuerName,
        발행날짜: new Date(issueDate).toLocaleDateString(),
        목적: category,
      })
    )
  );
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'BBL 리스트');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  saveAs(blob, `BBL_List_${new Date().toISOString().slice(0, 10)}.xlsx`);
};
