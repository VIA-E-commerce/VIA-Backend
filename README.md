<h1 align="center">VIA-Backend Repo π</h1>

<br>

<p align="center">
  <a href="http://via-shop.tk" target="_blank"><img src="./markdown/logo-with-background.png" /></a>
</p>

<h3 align="center">π Table of Contents π</h3>

<br>

<p align="center">
  <a href="#tech-stack">β&nbsp;&nbsp;Tech Stack</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#start">βΆ&nbsp;&nbsp;μμνκΈ°</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#description">π¨&nbsp;&nbsp;μλΉμ€ μ€λͺ</a>
</p>

<br><br>


<h2 id="tech-stack">β Tech Stack</h2>

<br>

#### β Language
[![TypeScript](https://img.shields.io/badge/TypeScript-333?style=flat-square&logo=typescript&logoColor=white&labelColor=007ACC)](#) [![JavaScript](https://img.shields.io/badge/JavaScript-333?style=flat-square&logo=JavaScript&logoColor=F7DF1E&labelColor=323330)](#)

#### β Back End
[![Nest JS](https://img.shields.io/badge/Nest_JS-333?style=flat-square&logo=nestjs&logoColor=white&labelColor=E0234E)](#) [![TypeORM](https://img.shields.io/badge/TypeORM-333?style=flat-square&logo=nestjs&logoColor=thie&labelColor=E34F26)](#) [![MariaDB](https://img.shields.io/badge/MariaDB-333?style=flat-square&logo=MariaDB&logoColor=white&labelColor=003545)](#) [![Passport](https://img.shields.io/badge/Passport-333?style=flat-square&logo=Passport&logoColor=white&labelColor=34E27A)](#) [![Swagger](https://img.shields.io/badge/Swagger-333?style=flat-square&logo=Swagger&logoColor=85EA2D&labelColor=000)](#) [![PM2](https://img.shields.io/badge/PM2-333?style=flat-square&logo=PM2&logoColor=white&labelColor=2B037A)](#)

#### β Deploy & OS & Web Server

[![NGINX](https://img.shields.io/badge/Nginx-333?style=flat-square&logo=nginx&logoColor=white&labelColor=009639)](#) [![AWS](https://img.shields.io/badge/AWS_EC2-333?style=flat-square&logo=AmazonAWS&logoColor=white&labelColor=E34F26)](#) [![Docker](https://img.shields.io/badge/Docker-333?style=flat-square&logo=docker&logoColor=white&labelColor=2CA5E0)](#) [![Ubuntu](https://img.shields.io/badge/Ubuntu-333?style=flat-square&logo=ubuntu&logoColor=white&labelColor=E95420)](#) [![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-333?style=flat-square&logo=github-actions&logoColor=white&labelColor=2088FF)](#)

#### β Code Style

[![ESLint](https://img.shields.io/badge/eslint-333?style=flat-square&logo=eslint&logoColor=white&labelColor=3A33D1)](#) [![Prettier](https://img.shields.io/badge/prettier-333?style=flat-square&logo=prettier&logoColor=F7BA3E&labelColor=1A2C34)](#)

#### β Other Libraries

[![GIT](https://img.shields.io/badge/GIT-333?style=flat-square&logo=git&logoColor=white&labelColor=E44C30)](#) [![Yarn](https://img.shields.io/badge/Yarn-333?style=flat-square&logo=yarn&logoColor=white&labelColor=2C8EBB)](#) [![JWT](https://img.shields.io/badge/JWT-333?style=flat-square&logo=JSON%20web%20tokens&logoColor=white&labelColor=000000)](#)

<br><br><br>

<h2 id="start">βΆ μμνκΈ°</h2>

<br>

**νλ‘μ νΈ λ€μ΄λ‘λ**

```bash
git clone https://github.com/VIA-E-commerce/VIA-Backend.git
```

<br>

**νκ²½λ³μ μ€μ **
> `.env.development` νμΌμ νκ²½λ³μλ₯Ό λ£μ΄<br>
> **root λλ ν λ¦¬**μ μμΉμμΌμΌ νλ‘κ·Έλ¨μ΄ μ μ μλλ©λλ€.

<br>

**ννλ¦Ώ νμΌ**

π [.env.template](.env.template)

<br>

**ν€ μ€λͺ**

| ν€                         | μ€λͺ                                 | μμ                                                                                                                                |
| -------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `HOST`                     | νΈμ€νΈ μ£Όμ                          | http://localhost                                                                                                                    |
| `PORT`                     | μλ² ν¬νΈ                            | 5000                                                                                                                                |
| `CLIENT_PORT`              | ν΄λΌμ΄μΈνΈ ν¬νΈ                      | 3000                                                                                                                                |
| `DB_HOST`                  | TypeORM DB νΈμ€νΈ                    | localhost                                                                                                                           |
| `DB_PORT`                  | TypeORM DB ν¬νΈ λ²νΈ                 | 3306                                                                                                                                |
| `DB_DATABASE`              | TypeORM DB λ°μ΄ν°λ² μ΄μ€λͺ            | test                                                                                                                                |
| `DB_USERNAME`              | TypeORM DB μ μ λͺ                    | root                                                                                                                                |
| `DB_PASSWORD`              | TypeORM DB μ μ  λΉλ°λ²νΈ             | 1234                                                                                                                                |
| `COOKIE_SECRET`            | μΏ ν€ λΉλ° ν€                         |                                                                                                                                     |
| `JWT_ACCESS_TOKEN_SECRET`  | JWT Access ν ν° λΉλ° ν€              |                                                                                                                                     |
| `JWT_REFRESH_TOKEN_SECRET` | JWT Refresh ν ν° λΉλ° ν€             |                                                                                                                                     |
| `KAKAO_REST_API_KEY`       | μΉ΄μΉ΄μ€ νμκ°μ/λ‘κ·ΈμΈμ μν API ν€ | [μΉ΄μΉ΄μ€ λ¬Έμ μ°Έμ‘°](https://developers.kakao.com/docs/latest/ko/getting-started/app#app-key)                                         |
| `KAKAO_CLIENT_SECRET`      | μΉ΄μΉ΄μ€ API ν€ μΈμ¦μ© λΉλ° ν€         | [μΉ΄μΉ΄μ€ λ¬Έμ μ°Έμ‘°](https://developers.kakao.com/docs/latest/ko/kakaologin/prerequisite#security)                                    |
| `NAVER_CLIENT_ID`          | λ€μ΄λ² νμκ°μ/λ‘κ·ΈμΈμ μν API ν€ | [λ€μ΄λ² λ¬Έμ μ°Έμ‘°](https://developers.naver.com/docs/common/openapiguide/appregister.md#ν΄λΌμ΄μΈνΈ-μμ΄λμ-ν΄λΌμ΄μΈνΈ-μν¬λ¦Ώ-νμΈ) |
| `NAVER_CLIENT_SECRET`      | λ€μ΄λ² API ν€ μΈμ¦μ© λΉλ° ν€         | [λ€μ΄λ² λ¬Έμ μ°Έμ‘°](https://developers.naver.com/docs/common/openapiguide/appregister.md#ν΄λΌμ΄μΈνΈ-μμ΄λμ-ν΄λΌμ΄μΈνΈ-μν¬λ¦Ώ-νμΈ) |
| `IMP_REST_API_KEY`         | μμν¬νΈ API ν€                      | [μμν¬νΈ λ¬Έμ μ°Έμ‘°](https://docs.iamport.kr/prepare)                                                                               |
| `IMP_REST_API_SECRET`      | μμν¬νΈ API λΉλ° ν€                 | [μμν¬νΈ λ¬Έμ μ°Έμ‘°](https://docs.iamport.kr/prepare)                                                                               |
| `CORS_ORIGIN_LIST`         | CORS νμ© μ¬μ΄νΈ λͺ©λ‘                | naver.com, google.com                                                                                                               |

<br>

**ν¨ν€μ§ μ€μΉ λ° μ€ν**
```bash
  yarn             # package.json dependencies μ€μΉ
  yarn start:dev   # κ°λ° λͺ¨λλ‘ μ€ν
```

<br><br>

<h2 id="description">π¨ μλΉμ€ μ€λͺ</h2>