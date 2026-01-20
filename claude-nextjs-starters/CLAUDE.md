# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

## 프로젝트 개요

모던 웹 개발을 위한 Next.js 스타터킷입니다. React 19, Next.js 16, TypeScript 5, Tailwind CSS 4 기반으로 ShadcnUI 컴포넌트, Dark/Light 모드, 토스트 알림이 사전 구성되어 있습니다.

## 개발 명령어

```bash
# 패키지 관리자: pnpm
pnpm install          # 의존성 설치
pnpm dev              # 개발 서버 실행 (http://localhost:3000)
pnpm build            # 프로덕션 빌드
pnpm start            # 프로덕션 서버 실행
pnpm lint             # ESLint 검사
```

## 아키텍처

### App Router 구조

- `app/layout.tsx` - 루트 레이아웃 (폰트, ThemeProvider, Toaster 설정)
- `app/(main)/` - Route Group으로 Header/Footer가 포함된 메인 레이아웃 적용

### 컴포넌트 구조

- `components/ui/` - ShadcnUI 기반 컴포넌트 (new-york 스타일)
- `components/layout/` - Header, Footer, MobileNav
- `components/shared/` - Logo, PageHeader, ThemeToggle
- `components/home/` - 홈 페이지 전용 섹션 컴포넌트
- `components/providers/` - ThemeProvider

### 설정 파일

- `config/site.ts` - 사이트 전역 설정 (이름, 설명, 링크)
- `config/navigation.ts` - 네비게이션 메뉴 구성
- `lib/constants.ts` - 브레이크포인트, 애니메이션 시간, 레이아웃 상수
- `lib/utils.ts` - cn() 함수 (clsx + tailwind-merge)

### 타입 정의

- `types/index.ts` - NavItem, SiteConfig, LayoutProps, PageHeaderProps

## ShadcnUI 컴포넌트 추가

```bash
pnpm dlx shadcn@latest add [컴포넌트명]
```

설정: `components.json` (스타일: new-york, RSC 지원, Lucide 아이콘)

## 경로 별칭

`@/*` → 프로젝트 루트 (예: `@/components/ui/button`)

## MCP 서버

Playwright MCP 서버가 설정되어 있어 브라우저 자동화 테스트 가능 (`.mcp.json`)
