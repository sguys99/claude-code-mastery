# Task 011: PDF 다운로드 기능 구현

## 목표

견적서를 PDF 형식으로 다운로드할 수 있는 기능 구현

## 작업 내용

### 1. PDF 생성 라이브러리 설치

- [x] jspdf 설치
- [x] html2canvas 설치
- [x] html-to-image 설치 (대안)

### 2. PDF 다운로드 컴포넌트 구현

- [x] `PdfDownloadButton` 클라이언트 컴포넌트 생성
- [x] 브라우저 인쇄 기능 활용 (window.print)
- [x] 프린트 전용 스타일 시트 동적 적용

### 3. 페이지 통합

- [x] 견적서 뷰어 페이지에 버튼 연동
- [x] Card 컴포넌트에 id 속성 추가 (`quote-content`)

## 생성/수정된 파일

- `src/components/quote/pdf-download-button.tsx` - 새로 생성
- `src/app/quote/[id]/page.tsx` - PdfDownloadButton 연동

## 기술적 결정

### 브라우저 인쇄 기능 사용 이유

TailwindCSS v4는 OKLCH/LAB 색상 공간을 사용하는데, html2canvas와 html-to-image 모두 이 색상 형식을 파싱하지 못하는 문제가 있었습니다.

**시도한 방법들:**
1. html2canvas 직접 사용 → LAB 색상 파싱 에러
2. html-to-image 사용 → 동일한 에러
3. 요소 복제 후 CSS 변수 변환 → 복제 시점에 이미 LAB 값으로 계산됨

**해결책:**
- 브라우저의 기본 인쇄 기능(window.print) 활용
- @media print 스타일로 레이아웃 최적화
- 사용자가 인쇄 다이얼로그에서 "PDF로 저장" 선택

### 장점

1. 브라우저가 LAB 색상을 정상 처리
2. 추가 라이브러리 의존성 최소화
3. 인쇄 시 자동으로 A4 크기 최적화
4. 모든 브라우저에서 호환

## 테스트 결과

- [x] PDF 다운로드 버튼 클릭 시 인쇄 다이얼로그 정상 표시
- [x] 견적서 콘텐츠만 인쇄 영역에 표시
- [x] 헤더/푸터/버튼 영역 인쇄에서 제외
- [x] 콘솔 에러 없음

## 검증 기준

- [x] 타입 체크 통과
- [x] 버튼 클릭 시 에러 없이 동작
- [x] 프린트 스타일 정상 적용

## 사용 방법

1. 견적서 페이지에서 "PDF 다운로드" 버튼 클릭
2. 브라우저 인쇄 다이얼로그에서 "PDF로 저장" 선택
3. 저장 위치 선택 후 저장

## 완료일

2025-01-28
