<h1 align="center">VIA-Backend Repo 👔</h1>

<br>

<p align="center">
  <a href="http://via-shop.tk" target="_blank"><img src="./markdown/logo-with-background.png" /></a>
</p>

<h3 align="center">📋 Table of Contents 📋</h3>

<br>

<p align="center">
  <a href="#tech-stack">⚒&nbsp;&nbsp;Tech Stack</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#start">▶&nbsp;&nbsp;시작하기</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#description">🗨&nbsp;&nbsp;서비스 설명</a>
</p>

<br><br>


<h2 id="tech-stack">⚒ Tech Stack</h2>

<br>

#### ✔ Language
[![TypeScript](https://img.shields.io/badge/TypeScript-333?style=flat-square&logo=typescript&logoColor=white&labelColor=007ACC)](#) [![JavaScript](https://img.shields.io/badge/JavaScript-333?style=flat-square&logo=JavaScript&logoColor=F7DF1E&labelColor=323330)](#)

#### ✔ Back End
[![Nest JS](https://img.shields.io/badge/Nest_JS-333?style=flat-square&logo=nestjs&logoColor=white&labelColor=E0234E)](#) [![TypeORM](https://img.shields.io/badge/TypeORM-333?style=flat-square&logo=nestjs&logoColor=thie&labelColor=E34F26)](#) [![MariaDB](https://img.shields.io/badge/MariaDB-333?style=flat-square&logo=MariaDB&logoColor=white&labelColor=003545)](#) [![Passport](https://img.shields.io/badge/Passport-333?style=flat-square&logo=Passport&logoColor=white&labelColor=34E27A)](#) [![Swagger](https://img.shields.io/badge/Swagger-333?style=flat-square&logo=Swagger&logoColor=85EA2D&labelColor=000)](#) [![PM2](https://img.shields.io/badge/PM2-333?style=flat-square&logo=PM2&logoColor=white&labelColor=2B037A)](#)

#### ✔ Deploy & OS & Web Server

[![NGINX](https://img.shields.io/badge/Nginx-333?style=flat-square&logo=nginx&logoColor=white&labelColor=009639)](#) [![AWS](https://img.shields.io/badge/AWS_EC2-333?style=flat-square&logo=AmazonAWS&logoColor=white&labelColor=E34F26)](#) [![Docker](https://img.shields.io/badge/Docker-333?style=flat-square&logo=docker&logoColor=white&labelColor=2CA5E0)](#) [![Ubuntu](https://img.shields.io/badge/Ubuntu-333?style=flat-square&logo=ubuntu&logoColor=white&labelColor=E95420)](#) [![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-333?style=flat-square&logo=github-actions&logoColor=white&labelColor=2088FF)](#)

#### ✔ Code Style

[![ESLint](https://img.shields.io/badge/eslint-333?style=flat-square&logo=eslint&logoColor=white&labelColor=3A33D1)](#) [![Prettier](https://img.shields.io/badge/prettier-333?style=flat-square&logo=prettier&logoColor=F7BA3E&labelColor=1A2C34)](#)

#### ✔ Other Libraries

[![GIT](https://img.shields.io/badge/GIT-333?style=flat-square&logo=git&logoColor=white&labelColor=E44C30)](#) [![Yarn](https://img.shields.io/badge/Yarn-333?style=flat-square&logo=yarn&logoColor=white&labelColor=2C8EBB)](#) [![JWT](https://img.shields.io/badge/JWT-333?style=flat-square&logo=JSON%20web%20tokens&logoColor=white&labelColor=000000)](#)

<br><br><br>

<h2 id="start">▶ 시작하기</h2>

<br>

**프로젝트 다운로드**

```bash
git clone https://github.com/VIA-E-commerce/VIA-Backend.git
```

<br>

**환경변수 설정**
> `.env.development` 파일에 환경변수를 넣어<br>
> **root 디렉토리**에 위치시켜야 프로그램이 정상 작동됩니다.

<br>

**템플릿 파일**

👉 [.env.template](.env.template)

<br>

**키 설명**

| 키                         | 설명                                 | 예시                                                                                                                                |
| -------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `HOST`                     | 호스트 주소                          | http://localhost                                                                                                                    |
| `PORT`                     | 서버 포트                            | 5000                                                                                                                                |
| `CLIENT_PORT`              | 클라이언트 포트                      | 3000                                                                                                                                |
| `DB_HOST`                  | TypeORM DB 호스트                    | localhost                                                                                                                           |
| `DB_PORT`                  | TypeORM DB 포트 번호                 | 3306                                                                                                                                |
| `DB_DATABASE`              | TypeORM DB 데이터베이스명            | test                                                                                                                                |
| `DB_USERNAME`              | TypeORM DB 유저명                    | root                                                                                                                                |
| `DB_PASSWORD`              | TypeORM DB 유저 비밀번호             | 1234                                                                                                                                |
| `COOKIE_SECRET`            | 쿠키 비밀 키                         |                                                                                                                                     |
| `JWT_ACCESS_TOKEN_SECRET`  | JWT Access 토큰 비밀 키              |                                                                                                                                     |
| `JWT_REFRESH_TOKEN_SECRET` | JWT Refresh 토큰 비밀 키             |                                                                                                                                     |
| `KAKAO_REST_API_KEY`       | 카카오 회원가입/로그인을 위한 API 키 | [카카오 문서 참조](https://developers.kakao.com/docs/latest/ko/getting-started/app#app-key)                                         |
| `KAKAO_CLIENT_SECRET`      | 카카오 API 키 인증용 비밀 키         | [카카오 문서 참조](https://developers.kakao.com/docs/latest/ko/kakaologin/prerequisite#security)                                    |
| `NAVER_CLIENT_ID`          | 네이버 회원가입/로그인을 위한 API 키 | [네이버 문서 참조](https://developers.naver.com/docs/common/openapiguide/appregister.md#클라이언트-아이디와-클라이언트-시크릿-확인) |
| `NAVER_CLIENT_SECRET`      | 네이버 API 키 인증용 비밀 키         | [네이버 문서 참조](https://developers.naver.com/docs/common/openapiguide/appregister.md#클라이언트-아이디와-클라이언트-시크릿-확인) |
| `IMP_REST_API_KEY`         | 아임포트 API 키                      | [아임포트 문서 참조](https://docs.iamport.kr/prepare)                                                                               |
| `IMP_REST_API_SECRET`      | 아임포트 API 비밀 키                 | [아임포트 문서 참조](https://docs.iamport.kr/prepare)                                                                               |
| `CORS_ORIGIN_LIST`         | CORS 허용 사이트 목록                | naver.com, google.com                                                                                                               |

<br>

**패키지 설치 및 실행**
```bash
  yarn             # package.json dependencies 설치
  yarn start:dev   # 개발 모드로 실행
```

<br><br>

<h2 id="description">🗨 서비스 설명</h2>