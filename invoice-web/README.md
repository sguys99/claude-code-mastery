# 견적서 뷰어 (Invoice Web)

노션 데이터베이스에 작성한 견적서를 클라이언트가 웹에서 바로 확인하고 PDF로 다운로드할 수 있는 시스템입니다.

## 🎯 프로젝트 개요

**목적**: 노션 데이터베이스에 작성한 견적서를 클라이언트가 웹에서 바로 확인하고 PDF로 다운로드할 수 있는 시스템

**사용자**: 견적서 링크를 받은 클라이언트 (회원가입/로그인 불필요)

**핵심 가치**:

- 노션에서 견적서 작성 → 링크 공유 → 클라이언트가 웹에서 바로 확인
- 회원가입 없이 링크만으로 접근 가능
- PDF 다운로드로 보관 및 인쇄 지원

## 📱 주요 페이지

1. **홈 페이지 (/)** - 서비스 소개 및 사용 방법 안내
   - 서비스 소개 섹션
   - 사용 방법 안내 (링크 받기 → 확인 → 다운로드)
   - 샘플 견적서 보기 버튼

2. **견적서 뷰어 페이지 (/quote/[id])** - 견적서 조회/표시/다운로드
   - 견적서 헤더 (제목, 발행일, 견적서 번호)
   - 발신자/수신자 정보
   - 견적 항목 테이블
   - 합계 금액 (소계, 부가세, 총액)
   - 특이사항 (유효기간, 결제조건, 기타 안내)
   - PDF 다운로드 버튼

3. **에러 페이지** - 404/500 에러 메시지 표시
   - 404: 견적서를 찾을 수 없음
   - 500: 일시적인 오류 발생

## ⚡ 핵심 기능

### MVP 핵심 기능

- **F001: 노션 견적서 조회** - 고유 ID로 노션 데이터베이스에서 견적서 정보 가져오기
- **F002: 견적서 렌더링** - 조회한 데이터를 보기 좋은 견적서 형태로 화면에 표시
- **F003: PDF 다운로드** - 현재 표시된 견적서를 PDF 파일로 변환하여 다운로드

### MVP 필수 지원 기능

- **F010: 에러 처리** - 잘못된 ID, 노션 API 오류 시 사용자 친화적 에러 메시지
- **F011: 로딩 상태** - 노션 API 호출 중 로딩 인디케이터 표시
- **F012: 랜딩 페이지** - 서비스 소개 및 사용 방법 안내

## 🛠️ 기술 스택

### 프론트엔드 프레임워크

- **Next.js 15.5.3** (App Router + Turbopack)
- **React 19.1.0** - UI 라이브러리
- **TypeScript 5** - 타입 안전성 보장

### 스타일링 & UI

- **TailwindCSS v4** - 유틸리티 CSS 프레임워크
- **shadcn/ui** (new-york style) - 고품질 React 컴포넌트 라이브러리
- **Lucide React** - 아이콘 라이브러리

### API 연동 & PDF 생성

- **@notionhq/client** - 노션 공식 JavaScript SDK
- **jsPDF + html2canvas** - 클라이언트 사이드 PDF 생성

### 폼 & 검증

- **React Hook Form** - 폼 상태 관리
- **Zod** - 스키마 검증 라이브러리 (노션 응답 검증)

### 배포

- **Vercel** - Next.js 최적화 배포 플랫폼

## 🚀 시작하기

### 필수 환경변수 설정

`.env.local` 파일을 생성하고 다음 환경변수를 설정하세요.

```bash
# Notion API 설정
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxx

# Next.js 설정
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (Turbopack)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 코드 품질 검사

```bash
# TypeScript 타입 체크
npm run typecheck

# ESLint 검사
npm run lint

# Prettier 포맷 체크
npm run format:check

# 모든 검사 통합 실행 (권장)
npm run check-all
```

## 📋 개발 상태

- ✅ 기본 프로젝트 구조 설정
- ✅ 홈 페이지 구현 (서비스 소개)
- ✅ 견적서 뷰어 페이지 구조 생성 (샘플 데이터)
- ✅ 에러 페이지 구현 (404/500)
- 🔄 노션 API 연동 (예정)
- 🔄 PDF 다운로드 기능 (예정)
- ⏳ 배포 설정 (예정)

## 📖 문서

- **[PRD 문서](./docs/PRD.md)** - 상세 요구사항 및 기능 명세
- **[개발 로드맵](./docs/ROADMAP.md)** - 개발 계획 및 진행 상황
- **[개발 가이드](./CLAUDE.md)** - Claude Code 개발 지침

## 🗄️ 노션 데이터베이스 구조

### Quote (견적서)

| 필드           | 타입             | 설명                               |
| -------------- | ---------------- | ---------------------------------- |
| id             | String (UUID)    | 고유 식별자 (노션 페이지 ID)       |
| quote_number   | String           | 견적서 번호                        |
| title          | String           | 견적서 제목                        |
| issue_date     | Date             | 발행일                             |
| valid_until    | Date             | 유효기간                           |
| sender_company | String           | 발신자 회사명                      |
| sender_name    | String           | 발신자 담당자명                    |
| sender_contact | String           | 발신자 연락처                      |
| client_name    | String           | 고객명                             |
| client_contact | String           | 고객 연락처                        |
| items          | Array<QuoteItem> | 견적 항목 목록                     |
| subtotal       | Number           | 소계                               |
| tax            | Number           | 부가세                             |
| total          | Number           | 총액                               |
| payment_terms  | String           | 결제조건                           |
| notes          | String           | 특이사항                           |
| status         | Select           | 견적서 상태 (draft/active/expired) |

### QuoteItem (견적 항목)

| 필드        | 타입   | 설명               |
| ----------- | ------ | ------------------ |
| name        | String | 항목명             |
| description | String | 항목 설명          |
| quantity    | Number | 수량               |
| unit_price  | Number | 단가               |
| amount      | Number | 금액 (수량 × 단가) |

## 🎯 개발 우선순위

### Phase 1: 기본 구조 (완료)

- ✅ Next.js 프로젝트 초기 설정
- ✅ 홈 페이지 및 기본 레이아웃 구현
- ✅ 견적서 뷰어 페이지 구조 생성

### Phase 2: 핵심 기능 (진행 예정)

- 🔄 노션 API 연동 설정
- 🔄 견적서 데이터 조회 및 렌더링
- 🔄 로딩 상태 및 에러 처리

### Phase 3: PDF 다운로드 (예정)

- ⏳ PDF 생성 라이브러리 통합
- ⏳ 견적서 → PDF 변환 로직 구현
- ⏳ 다운로드 기능 완성

### Phase 4: 마무리 (예정)

- ⏳ 전체 UX/UI 개선
- ⏳ 반응형 디자인 최적화
- ⏳ 배포 및 테스트

**총 예상 개발 기간: 7-11일 (1인 개발 기준)**

## 📄 라이선스

이 프로젝트는 개인 프로젝트로 제작되었습니다.

---

**Built with** Next.js 15.5.3 + React 19 + TypeScript + TailwindCSS v4 + shadcn/ui
