# apps/service-event/Dockerfile
FROM node:18-alpine

WORKDIR /app

# 1. 루트 패키지 복사
COPY package*.json ./
COPY ../../package*.json ../../

# 2. 서비스 패키지 복사
COPY ./apps/service-event/package*.json ./apps/service-event/

# 3. 의존성 설치
RUN npm install -w apps/service-event --omit=dev

# 4. 소스 코드 복사
COPY ./apps/service-event ./apps/service-event

# 5. 빌드
RUN npm run build -w apps/service-event

CMD ["node", "apps/service-event/dist/main.js"]