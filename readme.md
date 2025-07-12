# 🏢 BBL-Online 프로젝트

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.9.5-47A248?logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)

**사내 화폐(BBL) 디지털 관리 시스템**

기존 종이 기반 BBL 발행/관리의 불편함을 해결하는 온라인 플랫폼

[🚀 데모 보기](#) | [📖 API 문서](#api-문서) | [🐛 이슈 리포트](https://github.com/your-username/bbl-online/issues)

</div>

---

## 📋 목차

- [프로젝트 개요](#-프로젝트-개요)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [프로젝트 구조](#-프로젝트-구조)
- [API 문서](#-api-문서)
- [배포 가이드](#-배포-가이드)
- [개발 가이드](#-개발-가이드)
- [기여하기](#-기여하기)
- [라이선스](#-라이선스)

---

## 🎯 프로젝트 개요

### 문제 상황

- 기존 종이 기반 BBL 발행으로 인한 관리의 어려움
- 수기 기록으로 인한 데이터 정확성 문제
- 발행자와 수령자 간 소통 부족
- 통계 및 분석 기능 부재

### 해결 방안

- **온라인 플랫폼 구축**: 웹 기반 BBL 발행/관리 시스템
- **자동화 시스템**: BBL 번호 자동 생성, 이메일 알림
- **실시간 데이터 관리**: MongoDB 기반 데이터베이스 구축
- **권한 기반 접근 제어**: 사용자 등급별 기능 제한

---

## ✨ 주요 기능

### 🔐 인증 시스템

- **JWT 기반 인증**: 안전한 토큰 기반 인증
- **비밀번호 암호화**: bcrypt를 활용한 보안 강화
- **자동 로그인**: localStorage를 활용한 세션 유지
- **권한 관리**: 사용자 등급별 접근 제어

### 💰 BBL 발행 관리

- **자동 번호 생성**: 금액별 고유 BBL 번호 생성 (예: 5000001, 1000001)
- **실시간 발행**: 즉시 데이터베이스 반영
- **이메일 알림**: 발행 즉시 수령자에게 자동 알림
- **카테고리 분류**: 업무우수, 협력강화, 교육 등 목적별 분류

### 📊 데이터 관리

- **리스트 조회**: 페이지네이션 기반 데이터 조회
- **날짜 필터링**: 기간별 데이터 필터링
- **엑셀 내보내기**: 데이터 분석을 위한 엑셀 다운로드
- **실시간 검색**: 사용자 검색 및 필터링

### 👥 사용자 관리

- **회원가입/로그인**: 이메일 기반 계정 관리
- **비밀번호 변경**: 보안을 위한 비밀번호 변경 기능
- **프로필 관리**: 사용자 정보 조회 및 수정

---

## 🛠 기술 스택

### Frontend

| 기술                  | 버전   | 용도               |
| --------------------- | ------ | ------------------ |
| **React**             | 18.3.1 | UI 라이브러리      |
| **TypeScript**        | 5.6.2  | 타입 안정성        |
| **React Router**      | 7.1.3  | 클라이언트 라우팅  |
| **Zustand**           | 5.0.3  | 상태 관리          |
| **Styled Components** | 6.1.14 | CSS-in-JS 스타일링 |
| **Vite**              | 6.0.5  | 빌드 도구          |
| **Axios**             | 1.7.9  | HTTP 클라이언트    |

### Backend

| 기술           | 버전   | 용도               |
| -------------- | ------ | ------------------ |
| **Node.js**    | 18+    | 런타임 환경        |
| **Express**    | 4.21.2 | 웹 프레임워크      |
| **TypeScript** | 5.7.3  | 타입 안정성        |
| **MongoDB**    | 8.9.5  | NoSQL 데이터베이스 |
| **Mongoose**   | 8.9.5  | ODM                |
| **JWT**        | 9.0.2  | 인증 토큰          |
| **bcryptjs**   | 2.4.3  | 비밀번호 암호화    |
| **Nodemailer** | 6.10.0 | 이메일 발송        |

### Infrastructure

| 기술               | 버전 | 용도                         |
| ------------------ | ---- | ---------------------------- |
| **Docker**         | 20+  | 컨테이너화                   |
| **Docker Compose** | 3.8  | 멀티 컨테이너 오케스트레이션 |
| **MongoDB**        | 6.0+ | 데이터베이스                 |

---

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.0.0 이상
- Docker & Docker Compose
- MongoDB (로컬 또는 클라우드)

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/bbl-online.git
cd bbl-online
```

### 2. 환경 변수 설정

#### Frontend (.env)

```bash
# client/.env
VITE_API_BASE_URL=http://localhost:5001/api
```

#### Backend (.env)

```bash
# server/.env
PORT=5001
MONGO_URI=mongodb://localhost:27017/bbl-online
JWT_SECRET=your-super-secret-jwt-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 3. Docker로 실행 (권장)

```bash
# 전체 서비스 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f
```

### 4. 로컬 개발 환경

```bash
# 의존성 설치
npm install
cd client && npm install
cd ../server && npm install

# 개발 서버 실행
npm run start
```

### 5. 접속

- **Frontend**: http://localhost:5002
- **Backend API**: http://localhost:5001
- **MongoDB**: mongodb://localhost:27017

---

## 📁 프로젝트 구조

```
bbl-online/
├── client/                 # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── api/           # API 통신 모듈
│   │   ├── components/    # 재사용 컴포넌트
│   │   ├── container/     # 컨테이너 컴포넌트
│   │   ├── page/          # 페이지 컴포넌트
│   │   ├── store/         # Zustand 상태 관리
│   │   ├── types/         # TypeScript 타입 정의
│   │   └── utils/         # 유틸리티 함수
│   ├── public/            # 정적 파일
│   └── package.json
├── server/                # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/        # 설정 파일
│   │   ├── controllers/   # 컨트롤러
│   │   ├── middlewares/   # 미들웨어
│   │   ├── models/        # Mongoose 모델
│   │   ├── routes/        # 라우터
│   │   ├── types/         # TypeScript 타입
│   │   └── utils/         # 유틸리티 함수
│   └── package.json
├── docker-compose.yml     # Docker Compose 설정
└── README.md
```

---

## 📚 API 문서

### 인증 API

#### POST /api/auth/register

회원가입

```json
{
  "name": "홍길동",
  "email": "hong@company.com",
  "password": "password123",
  "companyNo": "12345",
  "team": "개발팀"
}
```

#### POST /api/auth/login

로그인

```json
{
  "email": "hong@company.com",
  "password": "password123"
}
```

### BBL API

#### POST /api/bbl/issue

BBL 발행

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

#### GET /api/bbl/list

BBL 리스트 조회

```
GET /api/bbl/list?page=1&startDate=2024-01-01&endDate=2024-12-31
```

### 사용자 API

#### GET /api/auth/user

사용자 정보 조회

#### PUT /api/auth/change-password

비밀번호 변경

```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

---

## 🚀 배포 가이드

### Docker 배포

```bash
# 프로덕션 빌드
docker-compose -f docker-compose.prod.yml up -d
```

### 환경별 설정

- **개발**: `docker-compose.yml`
- **스테이징**: `docker-compose.staging.yml`
- **프로덕션**: `docker-compose.prod.yml`

---

## 👨‍💻 개발 가이드

### 코드 컨벤션

- **TypeScript**: 엄격한 타입 체크 사용
- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅

### 브랜치 전략

```
main          # 프로덕션 브랜치
├── develop   # 개발 브랜치
├── feature/* # 기능 개발 브랜치
└── hotfix/*  # 긴급 수정 브랜치
```

### 커밋 메시지 규칙

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 코드 추가
chore: 빌드 프로세스 수정
```

---

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 개발 환경 설정

```bash
# 개발 의존성 설치
npm install

# 린트 검사
npm run lint

# 타입 체크
npm run type-check
```

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 📞 문의

- **이메일**: your-email@company.com
- **프로젝트 링크**: https://github.com/your-username/bbl-online
- **이슈 리포트**: https://github.com/your-username/bbl-online/issues

---

<div align="center">

**BBL-Online** - 사내 화폐 디지털 관리 시스템

Made with ❤️ by [winter1]

</div>
