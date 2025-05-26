import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

interface UserOption {
  label: string;
  value: string;
  team: string;
  companyNo: string;
}
interface BBLIssueFormProps {
  selectedUser: UserOption;
  purpose: string;
  amount: number | '';
  onSelectUser: (user: UserOption | null) => void;
  onPurposeChange: (value: string) => void;
  onAmountChange: (value: number | '') => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  userOptions: UserOption[];
  onInputChange: (inputValue: string) => void;
  category: string;
  setCategory: (category: string) => void;
}

const BBLIssueForm: React.FC<BBLIssueFormProps> = ({
  selectedUser,
  purpose,
  amount,
  onSelectUser,
  // handleInputChange,
  onPurposeChange,
  onAmountChange,
  onSubmit,
  isLoading,
  userOptions,
  onInputChange,
  category,
  setCategory,
}) => {
  return (
    <FormContainer>
      <Form onSubmit={onSubmit}>
        <Title>BBL 발행</Title>
        <StyledSelect
          placeholder='수령인 이름 검색'
          value={selectedUser}
          onChange={(newValue) => onSelectUser(newValue as UserOption | null)}
          onInputChange={onInputChange}
          options={userOptions}
          isClearable
        />
        <Input
          type='text'
          value={selectedUser?.companyNo || ''}
          placeholder='수령인 사번'
          disabled
        />
        <Input
          type='text'
          value={selectedUser?.team || ''}
          placeholder='수령인 팀'
          disabled
        />
        <SelectBox
          value={amount}
          onChange={(e) => onAmountChange(Number(e.target.value))}
          required
        >
          <option value=''>금액 선택</option>
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </SelectBox>
        <SelectBox
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value='업무우수'>업무우수</option>
          <option value='협력 강화'>협력 강화</option>
          <option value='교육'>교육</option>
          <option value='사내행사'>사내행사</option>
          <option value='기타'>기타</option>
        </SelectBox>
        <TextArea
          value={purpose}
          onChange={(e) => onPurposeChange(e.target.value)}
          placeholder='발행 목적'
          required
          maxLength={200}
        />
        <SubmitButton type='submit' disabled={isLoading}>
          {isLoading ? '발행 중...' : '발행하기'}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default BBLIssueForm;

const FormContainer = styled.div`
  width: 100%;
  max-width: 475px;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

export const StyledSelect = styled(Select).attrs({
  classNamePrefix: 'custom-select',
})`
  .custom-select__control {
    width: 100%;
    padding: 2px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    background-color: #fafafa;
    text-align: left;
    box-shadow: none;
    &:hover {
      border-color: #d43131;
    }
  }

  .custom-select__control--is-focused {
    border-color: #d43131;
  }

  .custom-select__menu {
    z-index: 10;
    margin-top: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden; /* 중요! */
  }

  .custom-select__menu-list {
    max-height: 200px;
    overflow-y: auto;
    padding: 0; /* 기본 여백 제거 */
  }

  .custom-select__option {
    margin: 0; /* 여백 제거 */
    border-radius: 0; /* 둥근 테두리 제거로 간격 문제 방지 */
    font-size: 14px;
    background-color: #fff;
    color: #333;
    cursor: pointer;
    text-align: left;
    padding: 10px;

    &:hover {
      background-color: #f2f2f2;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-top: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: #fafafa;
  box-sizing: border-box;
  &:focus {
    border-color: #d43131;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  margin-top: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: #fafafa;
  box-sizing: border-box;
  resize: vertical;
  &:focus {
    border-color: #d43131;
    outline: none;
  }
  max-height: 200px; /* 최대 높이 설정 */
  overflow-y: auto; /* 내용이 많을 경우 스크롤 가능 */
  min-height: 100px; /* 최소 높이 설정 */
  max-height: 300px; /* 최대 높이 설정 */
  line-height: 1.5; /* 줄 간격 설정 */
  font-family: 'Arial', sans-serif; /* 폰트 설정 */
  color: #333; /* 글자 색상 설정 */
  background-color: #fafafa; /* 배경색 설정 */
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1); /* 내부 그림자 효과 */
  transition: border-color 0.2s ease; /* 포커스 시 테두리 색상 변화 효과 */
  &:hover {
    border-color: #d43131; /* 호버 시 테두리 색상 변화 */
  }
  &::placeholder {
    color: #999; /* 플레이스홀더 색상 설정 */
    opacity: 1; /* 플레이스홀더 불투명도 설정 */
    font-style: italic; /* 플레이스홀더 이탤릭체 설정 */
    font-size: 14px; /* 플레이스홀더 폰트 크기 설정 */
    line-height: 1.5; /* 플레이스홀더 줄 간격 설정 */
    font-family: 'Arial', sans-serif; /* 플레이스홀더 폰트 설정 */
  }
}`;

const SelectBox = styled.select`
  width: 100%;
  padding: 12px 16px;
  margin-top: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: #fafafa;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 18px 18px;
  box-sizing: border-box;
  appearance: none;
  &:focus {
    border-color: #d43131;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 30px;
  padding: 12px 16px;
  background-color: #d43131;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;
