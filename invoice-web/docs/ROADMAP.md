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
   - **API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수**
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
   - 테스트 통과 확인 후 다음 단계로 진행
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**

   - 로드맵에서 완료된 작업을 완료로 표시

---

## 개발 단계

### Phase 1: 애플리케이션 골격 구축

- **Task 001: 프로젝트 구조 및 라우팅 설정** - 완료
  - Next.js App Router 기반 전체 라우트 구조 생성
  - 모든 주요 페이지의 기본 파일 생성 (`/`, `/quote/[id]`, 에러 페이지)
  - 공통 레이아웃 컴포넌트 (Header, Footer, Container) 구현

- **Task 002: 타입 정의 및 인터페이스 설계** - 우선순위
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

- **Task 006: 에러 페이지 UI 완성**
  - See: `/tasks/006-error-pages.md`
  - 404 에러 페이지 스타일링 개선
  - 500 에러 페이지 스타일링 개선
  - 사용자 친화적 에러 메시지 및 홈으로 돌아가기 버튼 구현
  - 에러 아이콘 및 해결 방법 안내 추가

- **Task 007: 반응형 디자인 적용**
  - See: `/tasks/007-responsive-design.md`
  - 모바일 뷰 최적화 (견적서 테이블 가로 스크롤)
  - 태블릿 뷰 최적화
  - 전체 페이지 반응형 테스트

---

### Phase 3: 핵심 기능 구현

- **Task 008: 노션 API 연동 설정** - 우선순위
  - See: `/tasks/008-notion-api-setup.md`
  - @notionhq/client 패키지 설치 및 설정
  - 환경변수 설정 (NOTION_API_KEY, NOTION_DATABASE_ID)
  - 노션 API 클라이언트 유틸리티 생성 (`src/lib/notion/client.ts`)
  - API 연결 테스트

- **Task 009: 견적서 데이터 조회 구현**
  - See: `/tasks/009-quote-data-fetch.md`
  - 노션 데이터베이스 쿼리 함수 구현 (`src/lib/notion/queries.ts`)
  - 노션 응답 데이터 변환 로직 구현 (`src/lib/notion/transformers.ts`)
  - Zod 스키마를 활용한 데이터 검증
  - Playwright MCP를 활용한 API 통합 테스트

- **Task 010: 견적서 뷰어 페이지 데이터 연동**
  - See: `/tasks/010-quote-page-integration.md`
  - 더미 데이터를 실제 노션 API 호출로 교체
  - Server Component에서 데이터 fetching 구현
  - 에러 핸들링 및 notFound() 처리
  - Playwright MCP로 전체 조회 플로우 E2E 테스트

- **Task 011: PDF 다운로드 기능 구현**
  - See: `/tasks/011-pdf-download.md`
  - PDF 생성 라이브러리 선정 및 설치 (react-to-pdf 또는 jsPDF + html2canvas)
  - 견적서 컴포넌트 PDF 변환 로직 구현
  - 다운로드 버튼 클릭 시 PDF 생성 및 저장 기능
  - PDF 스타일링 최적화 (프린트 친화적 레이아웃)
  - Playwright MCP로 PDF 다운로드 플로우 테스트

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

| 기능 ID | 기능명           | 관련 Task                    |
| ------- | ---------------- | ---------------------------- |
| F001    | 노션 견적서 조회 | Task 008, 009, 010           |
| F002    | 견적서 렌더링    | Task 005, 010                |
| F003    | PDF 다운로드     | Task 011                     |
| F010    | 에러 처리        | Task 006, 012                |
| F011    | 로딩 상태 표시   | Task 005, 012                |
| F012    | 랜딩 페이지      | Task 004                     |

---

## 예상 일정

| Phase   | 작업 내용                    | 예상 기간 |
| ------- | ---------------------------- | --------- |
| Phase 1 | 애플리케이션 골격 구축       | 완료      |
| Phase 2 | UI/UX 완성 (더미 데이터)     | 1-2일     |
| Phase 3 | 핵심 기능 구현               | 3-4일     |
| Phase 4 | 안정화 및 배포               | 1-2일     |
| **총합**| **MVP 완성**                 | **5-8일** |

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

## 참고 문서

- [PRD (Product Requirements Document)](/docs/PRD.md)
- [프로젝트 구조 가이드](/docs/guides/project-structure.md)
- [스타일링 가이드](/docs/guides/styling-guide.md)
- [컴포넌트 패턴](/docs/guides/component-patterns.md)
- [Next.js 15 가이드](/docs/guides/nextjs-15.md)
