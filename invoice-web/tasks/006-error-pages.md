# Task 006: 에러 페이지 UI 완성

## 목표

404 에러 페이지와 500 에러 페이지의 스타일링을 개선하여 사용자 친화적인 경험 제공

## 작업 내용

### 1. not-found.tsx 개선

- [x] 404 코드 강조 표시 추가
- [x] 해결 방법 안내 텍스트 추가
- [x] 홈으로 돌아가기 버튼 구현
- [x] shadcn/ui Card, Button 컴포넌트 활용

### 2. error.tsx 개선

- [x] 에러 유형별 메시지 개선
- [x] 재시도 로직 UX 개선
- [x] 사용자 친화적 안내 메시지
- [x] shadcn/ui 스타일 유지

## 구현 상세

### not-found.tsx

- 404 상태 코드를 크게 표시하여 시각적으로 명확히 인식
- 발생 가능한 원인 및 해결 방법 가이드 제공
- 홈으로 돌아가기 버튼으로 UX 개선

### error.tsx

- 에러 아이콘과 메시지로 시각적 피드백 제공
- 재시도 버튼과 홈으로 버튼을 나란히 배치
- 에러 로깅으로 디버깅 지원

## 검증 기준

- [x] 존재하지 않는 URL 접근 시 스타일링된 404 페이지 표시
- [x] 에러 발생 시 사용자 친화적 500 에러 페이지 표시
- [x] 반응형 디자인 적용
- [x] shadcn/ui 디자인 시스템 일관성 유지

## 기술 스택

- Next.js 15.5.3 App Router
- TailwindCSS v4
- shadcn/ui (new-york style)
- lucide-react icons

## 참고 사항

- Next.js 15의 error.tsx는 반드시 'use client' 지시문 필요
- not-found.tsx는 서버 컴포넌트로 작동
- 전체 페이지 레이아웃 (Header, Footer) 포함하여 일관성 유지
