import React, { useState } from 'react';
import { uploadUser } from '../api/auth';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };
  const handleUpload = async () => {
    if (!file) return;
    if (!window.confirm('정말 이 파일을 업로드하시겠습니까?')) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadUser(formData);
      alert('업로드 회원가입 완료');
    } catch (error) {
      console.error(error);
      alert('업로드 실패');
    }
  };

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      {file && (
        <div style={{ marginTop: 8 }}>
          <p>선택된 파일: {file.name}</p>
          <button type='button' onClick={handleUpload}>
            업로드
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;
