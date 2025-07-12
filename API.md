# 📚 API 문서

BBL-Online 프로젝트의 REST API 문서입니다.

## 📋 목차

- [기본 정보](#-기본-정보)
- [인증](#-인증)
- [사용자 API](#-사용자-api)
- [BBL API](#-bbl-api)
- [에러 코드](#-에러-코드)
- [예제](#-예제)

---

## ℹ️ 기본 정보

### Base URL

```
개발 환경: http://localhost:5001/api
프로덕션 환경: https://your-domain.com/api
```

### Content-Type

```
application/json
```

### 인증 방식

```
Bearer Token
Authorization: Bearer <JWT_TOKEN>
```

---

## 🔐 인증

### JWT 토큰 구조

```json
{
  "id": "user_id",
  "email": "user@company.com",
  "iat": 1640995200,
  "exp": 1641600000
}
```

### 토큰 만료 시간

- **액세스 토큰**: 7일
- **리프레시 토큰**: 30일

---

## 👥 사용자 API

### 회원가입

**POST** `/auth/register`

새로운 사용자를 등록합니다.

#### 요청 본문

```json
{
  "name": "홍길동",
  "email": "hong@company.com",
  "password": "password123",
  "companyNo": "12345",
  "team": "개발팀"
}
```

#### 응답 (201 Created)

```json
{
  "success": true,
  "message": "회원가입이 완료되었습니다.",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "홍길동",
      "email": "hong@company.com",
      "companyNo": "12345",
      "team": "개발팀",
      "grade": "user",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 에러 응답 (400 Bad Request)

```json
{
  "success": false,
  "error": "이미 존재하는 이메일입니다."
}
```

---

### 로그인

**POST** `/auth/login`

사용자 로그인을 처리합니다.

#### 요청 본문

```json
{
  "email": "hong@company.com",
  "password": "password123"
}
```

#### 응답 (200 OK)

```json
{
  "success": true,
  "message": "로그인 성공",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "홍길동",
      "email": "hong@company.com",
      "companyNo": "12345",
      "team": "개발팀",
      "grade": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 에러 응답 (401 Unauthorized)

```json
{
  "success": false,
  "error": "이메일 또는 비밀번호가 올바르지 않습니다."
}
```

---

### 사용자 정보 조회

**GET** `/auth/user`

현재 로그인한 사용자의 정보를 조회합니다.

#### 헤더

```
Authorization: Bearer <JWT_TOKEN>
```

#### 응답 (200 OK)

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "홍길동",
    "email": "hong@company.com",
    "companyNo": "12345",
    "team": "개발팀",
    "grade": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 에러 응답 (401 Unauthorized)

```json
{
  "success": false,
  "error": "인증이 필요합니다."
}
```

---

### 비밀번호 변경

**PUT** `/auth/change-password`

사용자의 비밀번호를 변경합니다.

#### 헤더

```
Authorization: Bearer <JWT_TOKEN>
```

#### 요청 본문

```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

#### 응답 (200 OK)

```json
{
  "success": true,
  "message": "비밀번호가 성공적으로 변경되었습니다."
}
```

#### 에러 응답 (400 Bad Request)

```json
{
  "success": false,
  "error": "현재 비밀번호가 올바르지 않습니다."
}
```

---

### 사용자 목록 조회

**GET** `/auth/users`

사용자 목록을 조회합니다. (관리자만 접근 가능)

#### 헤더

```
Authorization: Bearer <JWT_TOKEN>
```

#### 쿼리 파라미터

| 파라미터 | 타입   | 필수   | 설명                          |
| -------- | ------ | ------ | ----------------------------- |
| `page`   | number | 아니오 | 페이지 번호 (기본값: 1)       |
| `limit`  | number | 아니오 | 페이지당 항목 수 (기본값: 10) |
| `search` | string | 아니오 | 검색어 (이름, 이메일, 사번)   |

#### 응답 (200 OK)

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "홍길동",
        "email": "hong@company.com",
        "companyNo": "12345",
        "team": "개발팀",
        "grade": "user"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10
    }
  }
}
```

---

## 💰 BBL API

### BBL 발행

**POST** `/bbl/issue`

새로운 BBL을 발행합니다.

#### 헤더

```
Authorization: Bearer <JWT_TOKEN>
```

#### 요청 본문

```json
{
  "recipientName": "김철수",
  "recipientTeam": "마케팅팀",
  "recipientId": "67890",
  "purpose": "프로젝트 협력 감사",
  "amount": 50,
  "category": "협력 강화"
}
```

#### 응답 (201 Created)

```json
{
  "success": true,
  "message": "BBL이 성공적으로 발행되었습니다.",
  "data": {
    "bbl": {
      "_id": "507f1f77bcf86cd799439012",
      "recipientName": "김철수",
      "recipientTeam": "마케팅팀",
      "recipientId": "67890",
      "purpose": "프로젝트 협력 감사",
      "issuerId": "12345",
      "amount": 50,
      "bblNo": "5000001",
      "category": "협력 강화",
      "issueDate": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### 에러 응답 (400 Bad Request)

```json
{
  "success": false,
  "error": "필수 필드가 누락되었습니다."
}
```

---

### BBL 목록 조회

**GET** `/bbl/list`

BBL 목록을 조회합니다.

#### 헤더

```
Authorization: Bearer <JWT_TOKEN>
```

#### 쿼리 파라미터

| 파라미터    | 타입   | 필수   | 설명                          |
| ----------- | ------ | ------ | ----------------------------- |
| `page`      | number | 아니오 | 페이지 번호 (기본값: 1)       |
| `limit`     | number | 아니오 | 페이지당 항목 수 (기본값: 10) |
| `startDate` | string | 아니오 | 시작 날짜 (YYYY-MM-DD)        |
| `endDate`   | string | 아니오 | 종료 날짜 (YYYY-MM-DD)        |
| `category`  | string | 아니오 | 카테고리 필터                 |
| `amount`    | number | 아니오 | 금액 필터                     |

#### 응답 (200 OK)

```json
{
  "success": true,
  "data": {
    "bbls": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "recipientName": "김철수",
        "recipientTeam": "마케팅팀",
        "recipientId": "67890",
        "purpose": "프로젝트 협력 감사",
        "issuerId": "12345",
        "issuerName": "홍길동",
        "amount": 50,
        "bblNo": "5000001",
        "category": "협력 강화",
        "issueDate": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10
    }
  }
}
```

---

### BBL 상세 조회

**GET** `/bbl/:id`

특정 BBL의 상세 정보를 조회합니다.

#### 헤더

```
Authorization: Bearer <JWT_TOKEN>
```

#### 응답 (200 OK)

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "recipientName": "김철수",
    "recipientTeam": "마케팅팀",
    "recipientId": "67890",
    "purpose": "프로젝트 협력 감사",
    "issuerId": "12345",
    "issuerName": "홍길동",
    "amount": 50,
    "bblNo": "5000001",
    "category": "협력 강화",
    "issueDate": "2024-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 에러 응답 (404 Not Found)

```json
{
  "success": false,
  "error": "BBL을 찾을 수 없습니다."
}
```

---

### BBL 통계

**GET** `/bbl/stats`

BBL 발행 통계를 조회합니다.

#### 헤더

```
Authorization: Bearer <JWT_TOKEN>
```

#### 쿼리 파라미터

| 파라미터    | 타입   | 필수   | 설명                   |
| ----------- | ------ | ------ | ---------------------- |
| `startDate` | string | 아니오 | 시작 날짜 (YYYY-MM-DD) |
| `endDate`   | string | 아니오 | 종료 날짜 (YYYY-MM-DD) |

#### 응답 (200 OK)

```json
{
  "success": true,
  "data": {
    "totalIssued": 150,
    "totalAmount": 7500,
    "categoryStats": [
      {
        "category": "업무우수",
        "count": 50,
        "amount": 2500
      },
      {
        "category": "협력 강화",
        "count": 30,
        "amount": 1500
      }
    ],
    "monthlyStats": [
      {
        "month": "2024-01",
        "count": 25,
        "amount": 1250
      }
    ]
  }
}
```

---

## 📊 엑셀 내보내기

### BBL 엑셀 다운로드

**GET** `/bbl/export`

BBL 데이터를 엑셀 파일로 내보냅니다.

#### 헤더

```
Authorization: Bearer <JWT_TOKEN>
```

#### 쿼리 파라미터

| 파라미터    | 타입   | 필수   | 설명                   |
| ----------- | ------ | ------ | ---------------------- |
| `startDate` | string | 아니오 | 시작 날짜 (YYYY-MM-DD) |
| `endDate`   | string | 아니오 | 종료 날짜 (YYYY-MM-DD) |
| `category`  | string | 아니오 | 카테고리 필터          |

#### 응답 (200 OK)

```
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename="BBL_List_2024-01-01.xlsx"
```

---

## ❌ 에러 코드

### HTTP 상태 코드

| 코드 | 설명                  |
| ---- | --------------------- |
| 200  | 성공                  |
| 201  | 생성됨                |
| 400  | 잘못된 요청           |
| 401  | 인증 실패             |
| 403  | 권한 없음             |
| 404  | 리소스를 찾을 수 없음 |
| 409  | 충돌 (중복 데이터)    |
| 500  | 서버 내부 오류        |

### 에러 응답 형식

```json
{
  "success": false,
  "error": "에러 메시지",
  "code": "ERROR_CODE",
  "details": {
    "field": "추가 정보"
  }
}
```

### 일반적인 에러 코드

| 코드                       | 설명                  |
| -------------------------- | --------------------- |
| `VALIDATION_ERROR`         | 입력 데이터 검증 실패 |
| `DUPLICATE_EMAIL`          | 중복된 이메일         |
| `INVALID_CREDENTIALS`      | 잘못된 인증 정보      |
| `INSUFFICIENT_PERMISSIONS` | 권한 부족             |
| `RESOURCE_NOT_FOUND`       | 리소스를 찾을 수 없음 |
| `INTERNAL_SERVER_ERROR`    | 서버 내부 오류        |

---

## 💡 예제

### cURL 예제

#### 로그인

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "hong@company.com",
    "password": "password123"
  }'
```

#### BBL 발행

```bash
curl -X POST http://localhost:5001/api/bbl/issue \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "recipientName": "김철수",
    "recipientTeam": "마케팅팀",
    "recipientId": "67890",
    "purpose": "프로젝트 협력 감사",
    "amount": 50,
    "category": "협력 강화"
  }'
```

#### BBL 목록 조회

```bash
curl -X GET "http://localhost:5001/api/bbl/list?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### JavaScript 예제

#### Axios를 사용한 API 호출

```javascript
import axios from 'axios';

// 로그인
const login = async (email, password) => {
  try {
    const response = await axios.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response.data);
    throw error;
  }
};

// BBL 발행
const issueBBL = async (bblData, token) => {
  try {
    const response = await axios.post('/api/bbl/issue', bblData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('BBL issue failed:', error.response.data);
    throw error;
  }
};
```

### Python 예제

#### requests를 사용한 API 호출

```python
import requests
import json

# 로그인
def login(email, password):
    url = "http://localhost:5001/api/auth/login"
    data = {
        "email": email,
        "password": password
    }

    response = requests.post(url, json=data)
    return response.json()

# BBL 발행
def issue_bbl(bbl_data, token):
    url = "http://localhost:5001/api/bbl/issue"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=bbl_data, headers=headers)
    return response.json()
```

---

## 📞 지원

API 사용에 문제가 있으시면:

- **문서**: [README.md](README.md)
- **이슈 리포트**: GitHub Issues
- **문의**: your-email@company.com
