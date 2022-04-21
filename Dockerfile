##########    Builder    ##########
FROM node:14.17.0-alpine3.13 AS builder

# 정보
LABEL maintainer="88yangkh@gmail.com"
LABEL version="1.0.0"
LABEL description="VIA 백엔드 애플리케이션"

# 환경변수 설정
ARG NODE_ENV=prodction
ENV NODE_ENV=${NODE_ENV}

# 작업 디렉토리 지정
WORKDIR /app

# 프로젝트 의존성 추가
COPY package.json .
RUN yarn

# 소스 파일 복사 : Host의 현재 디렉토리 → /app 으로 복사
COPY . .

# nest 프로젝트 빌드
RUN yarn build


##########    Running    ##########
FROM node:14.17.0-alpine3.13

COPY --from=builder /app ./

# 백엔드에 포트 할당
EXPOSE 5000

# 배포 모드로 실행
CMD ["yarn", "start:prod"]