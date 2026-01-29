# Task 012: 에러 처리 및 로딩 상태 개선

## 목표

노션 API 에러 케이스별 사용자 친화적 메시지 처리 및 로딩 상태 UX 개선

## 작업 내용

### 1. 커스텀 에러 클래스 및 에러 파싱

- [x] `NotionApiError` 커스텀 에러 클래스 생성
- [x] 에러 코드 타입 정의 (unauthorized, forbidden, not_found, rate_limited, server_error, network_error, unknown)
- [x] 에러 파싱 함수 `parseNotionError` 구현
- [x] 에러 코드별 정보 매핑 (title, description, retryable)

### 2. 에러 페이지 개선

- [x] 에러 코드별 아이콘 표시 (Lock, FileX, Clock, ServerCrash, Wifi)
- [x] 에러 유형별 맞춤 안내 메시지
- [x] 재시도 가능한 에러에만 "다시 시도" 버튼 표시
- [x] 재시도 중 로딩 상태 표시

### 3. 로딩 스켈레톤 개선

- [x] 견적서 페이지 스켈레톤 상세화
- [x] 상단 버튼 영역 스켈레톤
- [x] 헤더 (제목, 날짜, 발신자/수신자) 스켈레톤
- [x] 테이블/카드 형태 항목 스켈레톤
- [x] 합계 영역 스켈레톤
- [x] 결제조건/특이사항 스켈레톤

## 생성/수정된 파일

- `src/lib/errors/notion-errors.ts` - 새로 생성 (커스텀 에러 클래스)
- `src/app/error.tsx` - 수정 (세분화된 에러 처리)
- `src/app/quote/[id]/page.tsx` - 수정 (QuoteLoading 컴포넌트 개선)

## 에러 코드별 처리

| 에러 코드     | 제목                  | 재시도 가능 | 아이콘      |
| ------------- | --------------------- | ----------- | ----------- |
| unauthorized  | 인증 오류             | ❌          | Lock        |
| forbidden     | 접근 권한 없음        | ❌          | Lock        |
| not_found     | 견적서를 찾을 수 없음 | ❌          | FileX       |
| rate_limited  | 요청 한도 초과        | ✅          | Clock       |
| server_error  | 서버 오류             | ✅          | ServerCrash |
| network_error | 네트워크 연결 오류    | ✅          | Wifi        |
| unknown       | 알 수 없는 오류       | ✅          | AlertCircle |

## 테스트 결과

- [x] 타입 체크 통과
- [x] 견적서 페이지 정상 렌더링
- [x] 콘솔 에러 없음

## 검증 기준

- [x] 에러 유형별 다른 메시지 표시
- [x] 재시도 가능 에러에만 재시도 버튼 활성화
- [x] 로딩 스켈레톤이 실제 레이아웃과 유사

## 완료일

2025-01-28
