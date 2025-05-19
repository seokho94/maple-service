# apps/service-user/Dockerfile
FROM node:18-alpine

WORKDIR /app

# 1. 루트 패키지 복사
COPY package*.json ./
COPY ../../package*.json ../../

# 2. 공유 패키지 복사
COPY ../../packages ./packages

# 3. 서비스 패키지 복사
COPY ./apps/service-user/package*.json ./apps/service-user/

# 4. 의존성 설치
RUN npm install -w apps/service-user --omit=dev

# 5. 소스 코드 복사
COPY ./apps/service-user ./apps/service-user

# 6. 빌드
RUN npm run build -w apps/service-user

CMD ["node", "apps/service-user/dist/main.js"]