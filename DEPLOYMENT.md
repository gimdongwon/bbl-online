# 🚀 배포 가이드

BBL-Online 프로젝트의 배포 방법을 안내합니다.

## 📋 목차

- [환경별 배포](#-환경별-배포)
- [Docker 배포](#-docker-배포)
- [환경 변수 설정](#-환경-변수-설정)
- [모니터링](#-모니터링)
- [문제 해결](#-문제-해결)

---

## 🌍 환경별 배포

### 개발 환경 (Development)

```bash
# 로컬 개발 환경
docker-compose up -d
```

### 프로덕션 환경 (Production)

```bash
# 프로덕션 환경 배포
docker-compose -f docker-compose.prod.yml up -d
```

---

## 🐳 Docker 배포

### 1. 프로덕션용 Docker Compose 파일 생성

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  client:
    build:
      context: ./client
      dockerfile: Dockerfile.prod
    ports:
      - '5002:5002'
    environment:
      - NODE_ENV=production
    depends_on:
      - server
    restart: unless-stopped

  server:
    build:
      context: ./server
      dockerfile: Dockerfile.prod
    ports:
      - '5001:5001'
    environment:
      - NODE_ENV=production
      - MONGO_URI=mongodb://mongo:27017/bbl-online
      - JWT_SECRET=${JWT_SECRET}
      - EMAIL_USER=${EMAIL_USER}
      - EMAIL_PASS=${EMAIL_PASS}
    depends_on:
      - mongo
    restart: unless-stopped

  mongo:
    image: mongo:6.0
    ports:
      - '27017:27017'
    volumes:
      - mongo_data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_ROOT_USERNAME}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_ROOT_PASSWORD}
    restart: unless-stopped

volumes:
  mongo_data:
```

### 2. 프로덕션용 Dockerfile 생성

#### Frontend Dockerfile

```dockerfile
# client/Dockerfile.prod
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 5002
CMD ["nginx", "-g", "daemon off;"]
```

#### Backend Dockerfile

```dockerfile
# server/Dockerfile.prod
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5001
CMD ["npm", "start"]
```

---

## ⚙️ 환경 변수 설정

### 필수 환경 변수

#### Frontend (.env)

```bash
VITE_API_BASE_URL=http://localhost:5001/api
VITE_APP_NAME=BBL-Online
```

#### Backend (.env)

```bash
# 서버 설정
PORT=5001
NODE_ENV=production

# 데이터베이스
MONGO_URI=mongodb://localhost:27017/bbl-online
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=secure-password

# 인증
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# 이메일
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# CORS
ALLOWED_ORIGINS=http://localhost:5002,http://localhost:3000

# 로깅
LOG_LEVEL=info
```

### 환경별 설정 파일

#### 개발 환경

```bash
# .env.development
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/bbl-online-dev
LOG_LEVEL=debug
```

#### 프로덕션 환경

```bash
# .env.production
NODE_ENV=production
MONGO_URI=mongodb://production-mongo:27017/bbl-online
LOG_LEVEL=warn
```

---

## 📊 모니터링

### 로그 모니터링

```bash
# Docker 로그 확인
docker-compose logs -f

# 특정 서비스 로그
docker-compose logs -f server

# 로그 파일 확인
tail -f /var/log/bbl-online/app.log
```

### 헬스 체크

```bash
# API 헬스 체크
curl -f http://localhost:5001/api/health

# 프론트엔드 헬스 체크
curl -f http://localhost:5002
```

### 성능 모니터링

```bash
# 컨테이너 리소스 사용량
docker stats

# 시스템 리소스 모니터링
htop
```

---

## 💾 백업 및 복구

### MongoDB 백업

```bash
# 백업 생성
docker exec mongo mongodump --out /backup/$(date +%Y%m%d_%H%M%S)

# 백업 복구
docker exec mongo mongorestore /backup/20241201_120000/
```

### 자동 백업 스크립트

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/mongo"

# 백업 생성
docker exec bbl-online_mongo_1 mongodump --out $BACKUP_DIR/$DATE

# 30일 이상 된 백업 삭제
find $BACKUP_DIR -type d -mtime +30 -exec rm -rf {} \;

echo "Backup completed: $DATE"
```

### 스케줄링 (cron)

```bash
# crontab -e
0 2 * * * /path/to/backup.sh >> /var/log/backup.log 2>&1
```

---

## 🔧 문제 해결

### 일반적인 문제들

#### 1. 포트 충돌

```bash
# 사용 중인 포트 확인
netstat -tulpn | grep :5001

# 프로세스 종료
sudo kill -9 <PID>
```

#### 2. 메모리 부족

```bash
# 메모리 사용량 확인
free -h

# 불필요한 컨테이너 정리
docker system prune -a
```

#### 3. 데이터베이스 연결 실패

```bash
# MongoDB 상태 확인
docker exec mongo mongosh --eval "db.adminCommand('ping')"

# 네트워크 연결 확인
docker network ls
docker network inspect bbl-online_default
```

#### 4. 컨테이너 시작 실패

```bash
# 컨테이너 상태 확인
docker-compose ps

# 컨테이너 재시작
docker-compose restart

# 컨테이너 재빌드
docker-compose up --build
```

#### 5. 환경 변수 문제

```bash
# 환경 변수 확인
docker-compose config

# 특정 서비스의 환경 변수 확인
docker-compose exec server env
```

---

## 📞 지원

배포 과정에서 문제가 발생하면:

- **로그 확인**: `docker-compose logs -f`
- **문서 참조**: [README.md](README.md)
- **이슈 리포트**: GitHub Issues
- **문의**: your-email@company.com
