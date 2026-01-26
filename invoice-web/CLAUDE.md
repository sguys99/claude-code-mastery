# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**견적서 뷰어 (Invoice Web)** - 노션 데이터베이스에 작성한 견적서를 클라이언트가 웹에서 바로 확인하고 PDF로 다운로드할 수 있는 시스템입니다.

- **사용자**: 견적서 링크를 받은 클라이언트 (회원가입/로그인 불필요)
- **핵심 흐름**: 노션에서 견적서 작성 → 링크 공유 → 클라이언트가 웹에서 확인/PDF 다운로드

## 핵심 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york style)
- **Forms**: React Hook Form + Zod + Server Actions
- **API**: @notionhq/client (노션 연동)
- **PDF**: jsPDF + html2canvas

## 자주 사용하는 명령어

```bash
npm run dev          # 개발 서버 (Turbopack)
npm run build        # 프로덕션 빌드
npm run check-all    # 타입체크 + 린트 + 포맷 검사 (작업 완료 시 필수)

# shadcn/ui 컴포넌트 추가
npx shadcn@latest add [component-name]
```

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈페이지 (/)
│   ├── quote/[id]/page.tsx # 견적서 뷰어 (/quote/[id])
│   ├── error.tsx           # 에러 UI
│   └── not-found.tsx       # 404 페이지
├── components/
│   ├── ui/                 # shadcn/ui 컴포넌트
│   ├── layout/             # 레이아웃 (header, footer, container)
│   ├── navigation/         # 네비게이션 (main-nav, mobile-nav)
│   └── providers/          # Context 프로바이더
└── lib/
    ├── utils.ts            # 유틸리티 (cn 함수 등)
    └── env.ts              # 환경변수 검증
```

## 핵심 개발 규칙

### Next.js 15.5.3 필수 규칙

1. **App Router 전용** - Pages Router 사용 금지
2. **Server Components 우선** - `'use client'`는 상호작용이 필요한 경우에만
3. **async params/searchParams** - Promise로 받아서 await 사용:
   ```typescript
   export default async function Page({
     params,
   }: {
     params: Promise<{ id: string }>
   }) {
     const { id } = await params
   }
   ```

### 스타일링 규칙

1. **TailwindCSS 유틸리티 클래스 우선** - 인라인 스타일 금지
2. **시맨틱 색상 변수 사용** - `bg-background`, `text-foreground` 등
3. **cn() 함수로 클래스 조합** - 조건부 스타일링 시
4. **모바일 우선 반응형** - `md:`, `lg:` 등 브레이크포인트 순차 적용

### 컴포넌트 규칙

1. **Named export 사용** - `export function Component()`
2. **경로 별칭 사용** - `@/components/...`, `@/lib/...`
3. **파일명**: kebab-case (`user-profile.tsx`)
4. **컴포넌트명**: PascalCase (`UserProfile`)

### 폼 처리 규칙

1. **Zod 스키마 정의** → **클라이언트 검증 (React Hook Form)** → **서버 재검증 (Server Actions)**
2. **useActionState**로 서버 액션 상태 관리 (React 19)

## 개발 가이드 문서

상세 규칙은 아래 문서 참조:

- `docs/PRD.md` - 프로젝트 요구사항
- `docs/ROADMAP.md` - 개발 로드맵
- `docs/guides/nextjs-15.md` - Next.js 15.5.3 상세 가이드
- `docs/guides/styling-guide.md` - TailwindCSS + shadcn/ui 스타일링
- `docs/guides/component-patterns.md` - 컴포넌트 설계 패턴
- `docs/guides/forms-react-hook-form.md` - 폼 처리 가이드
- `docs/guides/project-structure.md` - 폴더 구조 및 네이밍

## 환경변수

`.env.local` 파일에 설정:

```bash
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
