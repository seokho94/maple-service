# apps/service-user/Dockerfile
FROM node:18-alpine

WORKDIR /app

# 1. 루트 패키지 복사
COPY package*.json ./
COPY ../../package*.json ../../

# 2. 서비스 패키지 복사
COPY ./apps/service-user/package*.json ./apps/service-user/

# 3. 의존성 설치
RUN npm install -w apps/service-user --omit=dev

# 4. 소스 코드 복사
COPY ./apps/service-user ./apps/service-user

# 5. 빌드
RUN npm run build -w apps/service-user

CMD ["node", "apps/service-user/dist/main.js"]