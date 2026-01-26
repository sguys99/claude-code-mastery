# Task 002: 타입 정의 및 인터페이스 설계

## 개요

TypeScript 인터페이스와 Zod 스키마를 정의하여 프로젝트 전반에 걸친 타입 안전성을 확보합니다. 노션 API 응답 데이터와 견적서 데이터 모델을 명확히 정의합니다.

## 관련 기능

- F001: 노션 견적서 조회
- F002: 견적서 렌더링

## 관련 파일

- `src/lib/types/quote.ts` - 견적서 관련 타입 정의
- `src/lib/types/notion.ts` - 노션 API 응답 타입 정의
- `src/lib/types/index.ts` - 타입 re-export
- `src/lib/schemas/quote.ts` - 견적서 Zod 스키마
- `src/lib/schemas/index.ts` - 스키마 re-export

## 수락 기준

- [ ] Quote, QuoteItem 인터페이스가 PRD의 데이터 모델과 일치
- [ ] 노션 API 응답 타입이 정의됨
- [ ] Zod 스키마를 통한 런타임 검증이 가능
- [ ] 모든 타입이 적절히 export 되어 사용 가능

## 구현 단계

### 1단계: 타입 디렉토리 구조 생성

- [ ] `src/lib/types/` 디렉토리 생성
- [ ] `src/lib/schemas/` 디렉토리 생성

### 2단계: 견적서 타입 정의

- [ ] `src/lib/types/quote.ts` 생성
  - QuoteItem 인터페이스 정의
  - Quote 인터페이스 정의
  - QuoteStatus 타입 정의 (draft | active | expired)

### 3단계: 노션 API 타입 정의

- [ ] `src/lib/types/notion.ts` 생성
  - NotionPageProperties 타입 정의
  - NotionQuoteResponse 타입 정의

### 4단계: Zod 스키마 정의

- [ ] `src/lib/schemas/quote.ts` 생성
  - quoteItemSchema 정의
  - quoteSchema 정의
  - parseQuote, parseQuoteItem 함수 생성

### 5단계: 타입 통합 및 re-export

- [ ] `src/lib/types/index.ts` 생성
- [ ] `src/lib/schemas/index.ts` 생성

## 참고 사항

- PRD의 데이터 모델 섹션 참조
- Zod 4.x 버전 문법 사용
- 옵셔널 필드와 필수 필드 구분 명확히

## 변경 사항 요약

(작업 완료 전에는 비워둡니다)
