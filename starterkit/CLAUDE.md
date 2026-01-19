# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

## 프로젝트 개요

Next.js v15 + TypeScript + TailwindCSS v4 + shadcn/ui 기반의 웹 애플리케이션 스타터 킷입니다.

## 주요 명령어

```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# ESLint 실행
pnpm lint
```

## 기술 스택

- **패키지 매니저**: pnpm
- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript (strict mode)
- **스타일링**: TailwindCSS v4 + tw-animate-css
- **UI 컴포넌트**: shadcn/ui (new-york 스타일)
- **아이콘**: lucide-react
- **테마**: next-themes (다크모드 지원)
- **토스트**: sonner

## 코드 아키텍처

### 디렉토리 구조
```
app/                    # Next.js App Router 페이지
├── layout.tsx          # 루트 레이아웃 (폰트, 테마 프로바이더 설정)
├── page.tsx            # 홈 페이지
├── globals.css         # 전역 CSS + Tailwind 테마 변수
├── about/              # /about 라우트
└── dashboard/          # /dashboard 라우트

components/
├── ui/                 # shadcn/ui 컴포넌트
├── layout/             # 레이아웃 컴포넌트 (header, footer)
├── common/             # 공통 컴포넌트 (theme-toggle 등)
└── providers/          # Context Provider (theme-provider)

lib/
└── utils.ts            # 유틸리티 함수 (cn 함수 - clsx + tailwind-merge)
```

### 경로 별칭

`tsconfig.json`에 설정된 경로 별칭:
- `@/*` → 프로젝트 루트 (예: `@/components/ui/button`)

### shadcn/ui 설정

`components.json` 설정:
- 스타일: new-york
- CSS 변수: 활성화 (oklch 색상 사용)
- 아이콘: lucide-react
- 기본 색상: neutral

새 컴포넌트 추가 시:
```bash
npx shadcn@latest add [component-name]
```

### 테마 시스템

- `ThemeProvider`로 다크/라이트 모드 지원
- CSS 변수는 `app/globals.css`의 `:root`와 `.dark` 클래스에 정의
- oklch 색상 공간 사용

### 폰트 설정

- 기본 폰트: Noto Sans KR (한글 지원)
- 모노스페이스: Geist Mono
