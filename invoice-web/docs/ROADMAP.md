# 견적서 뷰어 (Invoice Web) 개발 로드맵

노션 데이터베이스에 작성한 견적서를 클라이언트가 웹에서 바로 확인하고 PDF로 다운로드할 수 있는 시스템

## 개요

**견적서 뷰어**는 견적서 링크를 받은 클라이언트를 위한 서비스로 다음 핵심 가치를 제공합니다:

- **노션 연동**: 노션 데이터베이스에서 견적서 데이터를 실시간 조회
- **웹 기반 뷰어**: 회원가입 없이 링크만으로 견적서 확인 가능
- **PDF 다운로드**: 견적서를 PDF로 변환하여 보관 및 인쇄 지원

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - **API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)**
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조. 예를 들어, 현재 작업이 `012`라면 `011`과 `010`을 예시로 참조.
   - 이러한 예시들은 완료된 작업이므로 내용이 완료된 작업의 최종 상태를 반영함 (체크된 박스와 변경 사항 요약). 새 작업의 경우, 문서에는 빈 박스와 변경 사항 요약이 없어야 함. 초기 상태의 샘플로 `000-sample.md` 참조.

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

   **🔴 필수: Playwright MCP 테스트 수행**
   - 구현 완료 후 **반드시** Playwright MCP로 테스트 수행
   - `browser_navigate` → `browser_snapshot` → 기능 테스트 → 결과 검증
   - API 연동 시: `browser_network_requests`로 호출 확인
   - 에러 확인: `browser_console_messages`로 콘솔 에러 없음 검증
   - **테스트 통과 전까지 작업 완료로 간주하지 않음**
   - 테스트 실패 시: 원인 분석 → 수정 → 재테스트 → 통과 확인

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 완료로 표시

---

## 개발 단계

### Phase 1: 애플리케이션 골격 구축

- **Task 001: 프로젝트 구조 및 라우팅 설정** - 완료
  - Next.js App Router 기반 전체 라우트 구조 생성
  - 모든 주요 페이지의 기본 파일 생성 (`/`, `/quote/[id]`, 에러 페이지)
  - 공통 레이아웃 컴포넌트 (Header, Footer, Container) 구현

- **Task 002: 타입 정의 및 인터페이스 설계** - 완료
  - See: `/tasks/002-type-definitions.md`
  - TypeScript 인터페이스 및 타입 정의 파일 생성 (`src/lib/types/`)
  - Quote, QuoteItem 데이터 모델 타입 정의
  - 노션 API 응답 타입 정의
  - Zod 스키마 검증 파일 생성 (`src/lib/schemas/`)

---

### Phase 2: UI/UX 완성 (더미 데이터 활용)

- **Task 003: 공통 컴포넌트 라이브러리 완성** - 완료
  - shadcn/ui 기반 필수 컴포넌트 설치 완료 (Button, Card, Skeleton 등)
  - Header, Footer, Container 레이아웃 컴포넌트 구현 완료
  - 견적서 뷰어에 필요한 추가 컴포넌트 확인 및 설치

- **Task 004: 홈 페이지 UI 완성** - 완료
  - 서비스 소개 히어로 섹션 구현 완료
  - 사용 방법 3단계 카드 섹션 구현 완료
  - 샘플 견적서 보기 CTA 섹션 구현 완료

- **Task 005: 견적서 뷰어 페이지 UI 완성** - 완료
  - 견적서 헤더 (제목, 발행일, 견적서 번호) 구현 완료
  - 발신자/수신자 정보 섹션 구현 완료
  - 견적 항목 테이블 구현 완료
  - 합계 금액 (소계, 부가세, 총액) 섹션 구현 완료
  - 결제조건 및 특이사항 섹션 구현 완료
  - 로딩 상태 스켈레톤 UI 구현 완료
  - PDF 다운로드 버튼 UI 구현 완료 (기능 미구현)

- **Task 006: 에러 페이지 UI 완성** - 완료
  - See: `/tasks/006-error-pages.md`
  - 404 에러 페이지 스타일링 개선 완료
  - 500 에러 페이지 스타일링 개선 완료
  - 사용자 친화적 에러 메시지 및 홈으로 돌아가기 버튼 구현 완료
  - 에러 아이콘 및 해결 방법 안내 추가 완료

- **Task 007: 반응형 디자인 적용** - 완료
  - See: `/tasks/007-responsive-design.md`
  - 모바일 뷰 최적화 완료 (견적서 항목을 카드 형태로 변환)
  - 견적서 헤더 모바일 레이아웃 개선 완료
  - 전체 페이지 반응형 테스트 완료 (Playwright MCP)

---

### Phase 3: 핵심 기능 구현

- **Task 008: 노션 API 연동 설정** - 완료
  - See: `/tasks/008-notion-api-setup.md`
  - @notionhq/client 패키지 설치 및 설정 완료
  - 환경변수 설정 완료 (NOTION_API_KEY, NOTION_DATABASE_ID)
  - 노션 API 클라이언트 유틸리티 생성 완료 (`src/lib/notion/client.ts`)
  - API 연결 테스트 통과 (데이터베이스: "Invoices")

- **Task 009: 견적서 데이터 조회 구현** - 완료
  - See: `/tasks/009-quote-data-fetch.md`
  - 노션 데이터베이스 쿼리 함수 구현 완료 (`src/lib/notion/queries.ts`)
  - 노션 응답 데이터 변환 로직 구현 완료 (`src/lib/notion/transformers.ts`)
  - API 라우트 생성 완료 (`/api/quotes`, `/api/quotes/[id]`)
  - Playwright MCP를 활용한 API 테스트 통과

- **Task 010: 견적서 뷰어 페이지 데이터 연동** - 완료
  - See: `/tasks/010-quote-page-integration.md`
  - 더미 데이터를 실제 노션 API 호출로 교체 완료
  - Server Component에서 데이터 fetching 구현 완료
  - 에러 핸들링 및 notFound() 처리 완료
  - Playwright MCP로 전체 조회 플로우 E2E 테스트 통과

- **Task 011: PDF 다운로드 기능 구현** - 완료
  - See: `/tasks/011-pdf-download.md`
  - jsPDF, html2canvas, html-to-image 설치 완료
  - PdfDownloadButton 클라이언트 컴포넌트 구현 완료
  - 브라우저 인쇄 기능(window.print) 활용으로 LAB 색상 호환성 해결
  - 프린트 전용 @media print 스타일 적용 완료
  - Playwright MCP 테스트 통과 (버튼 동작, 에러 없음)

---

### Phase 4: 안정화 및 배포

- **Task 012: 에러 처리 및 로딩 상태 개선**
  - See: `/tasks/012-error-handling.md`
  - 노션 API 에러 케이스별 사용자 친화적 메시지 처리
  - 로딩 상태 UX 개선 (스켈레톤 애니메이션)
  - 네트워크 에러 재시도 로직 (선택)

- **Task 013: 성능 최적화**
  - See: `/tasks/013-performance.md`
  - 노션 API 응답 캐싱 전략 구현 (Next.js 캐시 활용)
  - 이미지 최적화 (next/image)
  - 번들 사이즈 분석 및 최적화

- **Task 014: 배포 및 테스트**
  - See: `/tasks/014-deployment.md`
  - Vercel 배포 설정
  - 환경변수 설정 (프로덕션)
  - 최종 E2E 테스트 (Playwright MCP)
  - 성능 테스트 및 모니터링 설정

---

## 기능 매핑

| 기능 ID | 기능명           | 관련 Task          |
| ------- | ---------------- | ------------------ |
| F001    | 노션 견적서 조회 | Task 008, 009, 010 |
| F002    | 견적서 렌더링    | Task 005, 010      |
| F003    | PDF 다운로드     | Task 011           |
| F010    | 에러 처리        | Task 006, 012      |
| F011    | 로딩 상태 표시   | Task 005, 012      |
| F012    | 랜딩 페이지      | Task 004           |

---

## 예상 일정

| Phase    | 작업 내용                | 예상 기간 |
| -------- | ------------------------ | --------- |
| Phase 1  | 애플리케이션 골격 구축   | 완료      |
| Phase 2  | UI/UX 완성 (더미 데이터) | 1-2일     |
| Phase 3  | 핵심 기능 구현           | 3-4일     |
| Phase 4  | 안정화 및 배포           | 1-2일     |
| **총합** | **MVP 완성**             | **5-8일** |

---

## 기술 스택 참조

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york style)
- **API**: @notionhq/client (Notion API v1)
- **PDF**: react-to-pdf 또는 jsPDF + html2canvas
- **Validation**: Zod 4.x
- **Deployment**: Vercel

---

## 🧪 Playwright MCP 테스트 가이드

구현 완료 후 **반드시** Playwright MCP를 사용하여 테스트를 수행해야 합니다.

### 📌 필수 테스트 원칙

1. **모든 구현은 테스트로 검증**: 코드 작성 후 반드시 Playwright MCP로 동작 확인
2. **Happy Path + Edge Case**: 정상 케이스와 예외 상황 모두 테스트
3. **테스트 실패 시 수정 필수**: 테스트 통과 전까지 구현 완료로 간주하지 않음

### 🔧 Playwright MCP 주요 도구

| 도구                       | 용도                  | 예시                   |
| -------------------------- | --------------------- | ---------------------- |
| `browser_navigate`         | URL로 이동            | 페이지 로드 테스트     |
| `browser_snapshot`         | 현재 페이지 상태 캡처 | UI 렌더링 확인         |
| `browser_click`            | 요소 클릭             | 버튼, 링크 동작 테스트 |
| `browser_type`             | 텍스트 입력           | 폼 입력 테스트         |
| `browser_fill_form`        | 폼 필드 채우기        | 폼 제출 테스트         |
| `browser_wait_for`         | 특정 텍스트/시간 대기 | 비동기 동작 대기       |
| `browser_console_messages` | 콘솔 메시지 확인      | 에러 로그 검증         |
| `browser_network_requests` | 네트워크 요청 확인    | API 호출 검증          |

### 📋 API 연동 테스트 체크리스트

- [ ] API 엔드포인트 호출 성공 확인
- [ ] 응답 데이터가 UI에 올바르게 렌더링되는지 확인
- [ ] 로딩 상태 표시 확인
- [ ] 에러 응답 시 적절한 에러 메시지 표시 확인
- [ ] 네트워크 요청 확인 (`browser_network_requests`)
- [ ] 콘솔 에러 없음 확인 (`browser_console_messages`)

### 📋 비즈니스 로직 테스트 체크리스트

- [ ] 사용자 입력값 검증 (유효/무효 입력)
- [ ] 계산 로직 결과값 검증
- [ ] 상태 변경 후 UI 업데이트 확인
- [ ] 권한에 따른 접근 제어 확인
- [ ] 데이터 CRUD 동작 확인

### 🔄 테스트 수행 프로세스

1. **페이지 로드 테스트**
   - `browser_navigate`로 대상 페이지 이동
   - `browser_snapshot`으로 초기 상태 확인

2. **기능 동작 테스트**
   - `browser_click`, `browser_type` 등으로 사용자 동작 시뮬레이션
   - `browser_wait_for`로 비동기 결과 대기
   - `browser_snapshot`으로 결과 상태 확인

3. **데이터 검증**
   - `browser_network_requests`로 API 호출 확인
   - `browser_console_messages`로 에러 없음 확인
   - 화면에 표시된 데이터 정확성 확인

4. **엣지 케이스 테스트**
   - 빈 입력값 처리
   - 잘못된 형식의 입력
   - 네트워크 에러 상황

### 📄 테스트 시나리오 예시 (견적서 뷰어)

```markdown
## 테스트 체크리스트

### 1. 견적서 조회 기능

**Happy Path:**

- [ ] 견적서 ID로 페이지 접근 시 올바른 견적서 표시
- [ ] 견적서 상세 정보 (고객명, 금액, 항목) 정확히 렌더링
- [ ] PDF 다운로드 버튼 클릭 시 파일 다운로드

**Edge Cases:**

- [ ] 존재하지 않는 견적서 ID 접근 시 404 에러 페이지 표시
- [ ] 만료된 견적서 접근 시 적절한 안내 메시지 표시

### 2. API 연동 검증

**API 호출:**

- [ ] Notion API 호출 성공 확인 (network_requests)
- [ ] 응답 시간 합리적 범위 내 (3초 이내)
- [ ] 콘솔 에러 없음 확인
```

### ⚠️ 테스트 실패 시 대응

1. 실패한 테스트 케이스 기록
2. 원인 분석 및 코드 수정
3. 수정 후 재테스트 수행
4. 모든 테스트 통과 확인 후 다음 단계 진행

---

## 참고 문서

- [PRD (Product Requirements Document)](/docs/PRD.md)
- [프로젝트 구조 가이드](/docs/guides/project-structure.md)
- [스타일링 가이드](/docs/guides/styling-guide.md)
- [컴포넌트 패턴](/docs/guides/component-patterns.md)
- [Next.js 15 가이드](/docs/guides/nextjs-15.md)
