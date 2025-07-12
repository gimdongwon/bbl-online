# 🤝 기여 가이드

BBL-Online 프로젝트에 기여해주셔서 감사합니다! 이 문서는 프로젝트에 기여하는 방법을 안내합니다.

## 📋 목차

- [기여 방법](#-기여-방법)
- [개발 환경 설정](#-개발-환경-설정)
- [코드 컨벤션](#-코드-컨벤션)
- [테스트 가이드](#-테스트-가이드)
- [이슈 리포트](#-이슈-리포트)
- [Pull Request](#-pull-request)

---

## 🚀 기여 방법

### 1. 저장소 포크

GitHub에서 프로젝트를 포크합니다.

### 2. 로컬에 클론

```bash
git clone https://github.com/YOUR_USERNAME/bbl-online.git
cd bbl-online
```

### 3. 원격 저장소 추가

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/bbl-online.git
```

### 4. 브랜치 생성

```bash
git checkout -b feature/your-feature-name
```

---

## ⚙️ 개발 환경 설정

### 사전 요구사항

- Node.js 18.0.0 이상
- Docker & Docker Compose
- Git

### 환경 설정

```bash
# 의존성 설치
npm install
cd client && npm install
cd ../server && npm install

# 환경 변수 설정
cp client/.env.example client/.env
cp server/.env.example server/.env
```

### 개발 서버 실행

```bash
# Docker로 실행 (권장)
docker-compose up -d

# 또는 로컬에서 실행
npm run start
```

---

## 📝 코드 컨벤션

### TypeScript

- 엄격한 타입 체크 사용
- `any` 타입 사용 금지
- 인터페이스와 타입 정의 명확히

### React 컴포넌트

```typescript
// 함수형 컴포넌트 사용
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  // 컴포넌트 로직
  return <div>Content</div>;
};

// Props 인터페이스 정의
interface Props {
  prop1: string;
  prop2: number;
}
```

### 파일 명명 규칙

- 컴포넌트: `PascalCase` (예: `UserProfile.tsx`)
- 유틸리티: `camelCase` (예: `formatDate.ts`)
- 상수: `UPPER_SNAKE_CASE` (예: `API_ENDPOINTS.ts`)

### 커밋 메시지

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

## 🧪 테스트 가이드

### 테스트 작성 원칙

- 각 기능별로 단위 테스트 작성
- API 엔드포인트별 통합 테스트
- 사용자 시나리오별 E2E 테스트

### 테스트 실행

```bash
# 전체 테스트 실행
npm test

# 특정 테스트 실행
npm test -- --grep "BBL 발행"

# 테스트 커버리지 확인
npm run test:coverage
```

---

## 🐛 이슈 리포트

### 버그 리포트

버그를 발견하셨다면 다음 정보를 포함해주세요:

1. **버그 설명**: 무엇이 잘못되었는지
2. **재현 단계**: 버그를 재현하는 방법
3. **예상 동작**: 올바른 동작이 무엇인지
4. **실제 동작**: 실제로 발생하는 동작
5. **환경 정보**: 브라우저, OS, 버전 등

### 기능 요청

새로운 기능을 제안하시려면:

1. **기능 설명**: 어떤 기능인지
2. **사용 사례**: 언제 사용할 것인지
3. **구현 방법**: 어떻게 구현할 수 있는지 (선택사항)

---

## 🔄 Pull Request

### PR 생성 전 체크리스트

- [ ] 코드가 프로젝트 스타일 가이드를 따름
- [ ] 자체 테스트를 통과함
- [ ] 새로운 기능에 대한 테스트 추가
- [ ] 문서 업데이트 (필요시)
- [ ] 커밋 메시지가 명확함

### PR 제목 규칙

```
feat: BBL 발행 시 이메일 알림 기능 추가
fix: 로그인 시 토큰 만료 처리 버그 수정
docs: API 문서 업데이트
```

### PR 설명 템플릿

```markdown
## 변경 사항

- 어떤 기능이 추가/수정되었는지 설명

## 테스트

- [ ] 단위 테스트 통과
- [ ] 통합 테스트 통과
- [ ] 수동 테스트 완료

## 관련 이슈

Closes #123

## 스크린샷 (UI 변경시)
```

---

## 📞 문의

기여 과정에서 궁금한 점이 있으시면:

- **이슈 생성**: GitHub Issues에서 질문
- **이메일**: your-email@company.com
- **토론**: GitHub Discussions 활용

---

## 🙏 감사의 말

BBL-Online 프로젝트에 기여해주셔서 정말 감사합니다!
여러분의 기여가 프로젝트를 더욱 좋게 만들어줍니다. 🎉
