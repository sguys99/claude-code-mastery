# Task 008: 노션 API 연동 설정

## 목표

노션 데이터베이스에서 견적서 데이터를 조회하기 위한 API 클라이언트 설정

## 작업 내용

### 1. 패키지 및 환경변수 설정

- [x] @notionhq/client 패키지 설치
- [x] 환경변수 설정 (NOTION_API_KEY, NOTION_DATABASE_ID)

### 2. 노션 API 클라이언트 구현

- [x] 노션 클라이언트 인스턴스 생성 (`src/lib/notion/client.ts`)
- [x] 환경변수 검증 로직 추가
- [x] 타입 정의 추가

### 3. API 연결 테스트

- [x] 데이터베이스 접근 테스트 (databaseTitle: "Invoices")
- [x] 에러 핸들링 확인

## 검증 기준

- [x] 노션 API 클라이언트가 정상적으로 초기화됨
- [x] 데이터베이스 쿼리가 성공함
- [x] 환경변수 누락 시 명확한 에러 메시지 출력

## 기술 스택

- @notionhq/client v2.2.15
- TypeScript
- Next.js 서버 환경
