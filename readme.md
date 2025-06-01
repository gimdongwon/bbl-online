# bbl-online 프로젝트

기존에 종이로된 사내 화폐(BBL)를 발행하고 수기로 관리해야 했던 불편함을 개선하기 위해 온라인으로 간편하게 발행, 관리, 조회할 수 있는 환경을 구축

## description

- 기술 스택
  - FE: React, Typescript, React Router, React Query, Zustand, Styled-Components, Vite
  - BE: Node.js, Express, TypesScript, MongoDB, Mongoose, JWT, Nodemailer
  - Infra: Docker, Docker Compose, Port forwarding
  - 주요기능
    - **회원가입 & 로그인 (JWT 인증)**
      - Zustand 상태 관리와 localStorage를 활용하여 인증 유지
      - bcrypt를 활용한 패스워드 해싱 및 JWT 토큰 발급
    - **BBL 발행 및 리스트 조회**
      - 금액에 따라 BBL 고유번호 자동 생성 (예: 5000001, 1000001)
      - MongoDB에서 populate를 사용하여 발행자 정보 자동 연동
      - 발행 즉시 수령자에게 이메일 알림 (Nodemailer 활용)
    - **관리자 기능**
      - React Table을 사용한 엑셀 스타일의 리스트 뷰
      - 필터링 및 검색 기능 지원
    - **Docker 기반 개발 환경 구축**
      - Docker Compose를 활용하여 **MongoDB + Backend + Frontend** 컨테이너 오케스트레이션
      - .env 설정을 활용한 환경별(개발/운영) 분리

cicd 구현중..
