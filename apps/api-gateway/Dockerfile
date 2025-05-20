# apps/api-gateway/Dockerfile
FROM node:18-alpine

WORKDIR /app

# 1. 루트 package.json 복사
COPY ../../package.json ./

# 2. 서비스 package.json 복사
COPY ./package.json ./apps/api-gateway/

# 3. 전체 apps 디렉터리 복사
COPY ../../apps ./apps

# 4. 의존성 설치 (루트에서)
RUN npm install

# 5. 빌드
RUN npm run build -w apps/api-gateway

CMD ["node", "dist/apps/api-gateway/main.js"]