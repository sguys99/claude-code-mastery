# Task 009: 견적서 데이터 조회 구현

## 목표

노션 데이터베이스에서 견적서 데이터를 조회하고 애플리케이션 타입으로 변환

## 작업 내용

### 1. 노션 데이터베이스 쿼리 함수 구현

- [x] 견적서 목록 조회 (`getQuotes`)
- [x] 단일 견적서 조회 (`getQuoteById`)
- [x] 견적서 번호로 조회 (`getQuoteByNumber`)
- [x] 관계형 항목 조회 (`getRelatedItems`)

### 2. 데이터 변환 로직 구현

- [x] 노션 속성 추출 헬퍼 함수
- [x] 견적 항목 변환 (`transformQuoteItem`)
- [x] 견적서 변환 (`transformNotionToQuote`)
- [x] 배열 변환 (`transformNotionToQuotes`)

### 3. API 라우트 생성

- [x] 견적서 목록 API (`/api/quotes`)
- [x] 단일 견적서 API (`/api/quotes/[id]`)
- [x] 데이터베이스 스키마 확인 API (`/api/notion/schema`)

## 생성된 파일

- `src/lib/notion/queries.ts` - 노션 쿼리 함수
- `src/lib/notion/transformers.ts` - 데이터 변환 로직
- `src/lib/notion/index.ts` - 모듈 인덱스
- `src/app/api/quotes/route.ts` - 목록 API
- `src/app/api/quotes/[id]/route.ts` - 단일 조회 API
- `src/app/api/notion/schema/route.ts` - 스키마 확인 API

## 노션 데이터베이스 스키마

| 속성명       | 타입      |
| ------------ | --------- |
| 견적서번호   | title     |
| 발행일       | date      |
| 유효기간     | date      |
| 클라이언트명 | rich_text |
| 상태         | status    |
| 총금액       | number    |
| 항목         | relation  |

## 검증 기준

- [x] 타입 체크 통과
- [x] API 호출 성공 (`/api/quotes` → 200 OK)
- [x] 데이터 변환 로직 정상 동작

## 기술 스택

- @notionhq/client
- TypeScript
- Next.js API Routes
- Zod (데이터 검증)
