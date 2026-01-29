# Development Guidelines

AI Agent 전용 프로젝트 개발 규칙 문서

---

## 프로젝트 개요

### 목적

노션 데이터베이스의 견적서를 웹에서 조회하고 PDF로 다운로드하는 시스템

### 기술 스택

| 카테고리  | 기술                               | 버전         |
| --------- | ---------------------------------- | ------------ |
| Framework | Next.js (App Router + Turbopack)   | 15.5.3       |
| Runtime   | React + TypeScript                 | 19.1.0 / 5.x |
| Styling   | TailwindCSS + shadcn/ui (new-york) | v4           |
| Forms     | React Hook Form + Zod              | 7.x / 4.x    |
| API       | @notionhq/client                   | 2.x          |
| PDF       | jsPDF + html2canvas                | -            |

### 핵심 흐름

```
노션 견적서 작성 → 링크 공유 → 웹에서 확인 → PDF 다운로드
```

---

## 프로젝트 아키텍처

### 디렉토리 구조

```
src/
├── app/                    # Next.js App Router (라우트 전용)
│   ├── layout.tsx          # 루트 레이아웃 (ThemeProvider, Toaster 포함)
│   ├── globals.css         # TailwindCSS + CSS 변수 정의
│   ├── page.tsx            # 홈페이지 (/)
│   ├── quote/[id]/page.tsx # 견적서 뷰어 (/quote/[id])
│   ├── error.tsx           # 에러 바운더리
│   └── not-found.tsx       # 404 페이지
├── components/
│   ├── ui/                 # shadcn/ui 컴포넌트 (수정 금지)
│   ├── layout/             # 레이아웃 (header, footer, container)
│   ├── navigation/         # 네비게이션 (main-nav, mobile-nav)
│   └── providers/          # Context Provider (theme-provider)
├── lib/
│   ├── utils.ts            # cn() 함수 (clsx + tailwind-merge)
│   ├── env.ts              # 환경변수 Zod 검증
│   ├── types/              # TypeScript 타입 정의
│   ├── schemas/            # Zod 스키마
│   └── notion/             # 노션 API 클라이언트 및 쿼리
└── hooks/                  # 커스텀 React Hooks
```

### 주요 설정 파일

| 파일              | 용도                                          |
| ----------------- | --------------------------------------------- |
| `components.json` | shadcn/ui 설정 (style: new-york, rsc: true)   |
| `tsconfig.json`   | TypeScript 설정 (paths: @/_ → ./src/_)        |
| `package.json`    | 의존성 및 스크립트                            |
| `.env.local`      | 환경변수 (NOTION_API_KEY, NOTION_DATABASE_ID) |

---

## 코드 표준

### 네이밍 규칙

| 대상            | 규칙             | 예시                                   |
| --------------- | ---------------- | -------------------------------------- |
| 파일명          | kebab-case       | `user-profile.tsx`, `quote-item.tsx`   |
| 컴포넌트명      | PascalCase       | `UserProfile`, `QuoteItem`             |
| 함수명          | camelCase        | `getQuoteById`, `formatCurrency`       |
| 상수            | UPPER_SNAKE_CASE | `MAX_ITEMS`, `API_BASE_URL`            |
| 타입/인터페이스 | PascalCase       | `Quote`, `QuoteItem`, `QuotePageProps` |

### 임포트 규칙

```tsx
// 1. 외부 라이브러리
import { Suspense } from 'react'
import { notFound } from 'next/navigation'

// 2. 내부 컴포넌트 (@/ 경로 별칭 사용)
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'

// 3. 유틸리티 및 타입
import { cn } from '@/lib/utils'
import type { Quote } from '@/lib/types'
```

### Export 규칙

- **Named export 사용**: `export function ComponentName()`
- **Default export 금지**: 페이지 컴포넌트 제외
- **Type export 분리**: `export type { TypeName }`

---

## Next.js 15.5.3 필수 규칙

### App Router 전용

- Pages Router (`pages/`) 사용 **금지**
- 모든 라우트는 `src/app/` 디렉토리에 배치

### async params/searchParams

```tsx
// ✅ 올바른 방법 (Promise로 받아서 await)
interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params
  const { tab } = await searchParams
  // ...
}

// ❌ 금지 (동기적 접근)
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params // 에러 발생
}
```

### Server Components 우선

- 기본값: Server Component
- `'use client'`는 상호작용이 필요한 경우에만 사용
- 클라이언트 컴포넌트는 별도 파일로 분리

```tsx
// Server Component (기본)
export default async function Page() {
  const data = await fetchData() // 서버에서 데이터 패칭
  return <ClientComponent data={data} />
}

// Client Component (별도 파일)
;('use client')
export function ClientComponent({ data }: Props) {
  const [state, setState] = useState(data)
  // ...
}
```

---

## 스타일링 표준

### TailwindCSS 필수 규칙

```tsx
// ✅ TailwindCSS 유틸리티 클래스 사용
<div className="flex items-center justify-between rounded-lg bg-background p-4">

// ❌ 인라인 스타일 금지
<div style={{ display: 'flex', padding: '16px' }}>

// ❌ CSS 모듈 금지
<div className={styles.container}>
```

### cn() 함수 사용

```tsx
import { cn } from '@/lib/utils'

// ✅ 조건부 클래스 적용
<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  className
)}>

// ❌ 문자열 조합 금지
<div className={`base ${condition ? 'active' : ''}`}>
```

### 시맨틱 색상 변수 사용

```tsx
// ✅ CSS 변수 기반 색상
<div className="bg-background text-foreground">
<p className="text-muted-foreground">
<Button className="bg-primary text-primary-foreground">

// ❌ 하드코딩 색상 금지
<div className="bg-white text-black">
<div className="bg-gray-100 text-gray-900">
```

### shadcn/ui 컴포넌트 추가

```bash
# 새 컴포넌트 추가 명령어
npx shadcn@latest add [component-name]

# 예시
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

### 반응형 디자인

```tsx
// ✅ 모바일 우선 접근법
<div className="flex flex-col p-4 md:flex-row md:p-6 lg:p-8">

// ❌ 데스크톱 우선 접근법 금지
<div className="hidden lg:block md:hidden">
```

---

## 컴포넌트 구현 표준

### Props 인터페이스 정의

```tsx
interface ButtonProps {
  children: React.ReactNode
  variant?: 'default' | 'destructive' | 'outline'
  size?: 'default' | 'sm' | 'lg'
  disabled?: boolean
  className?: string
  onClick?: () => void
}

export function Button({
  children,
  variant = 'default',
  size = 'default',
  disabled = false,
  className,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
```

### 컴포넌트 크기 제한

- 단일 컴포넌트: **300줄 이하**
- 300줄 초과 시: 서브 컴포넌트로 분리

### Suspense 사용

```tsx
import { Suspense } from 'react'

export default async function Page() {
  return (
    <div>
      <h1>견적서</h1>
      <Suspense fallback={<QuoteSkeleton />}>
        <QuoteContent />
      </Suspense>
    </div>
  )
}
```

---

## 폼 처리 표준

### 검증 흐름

```
Zod 스키마 정의 → 클라이언트 검증 (React Hook Form) → 서버 재검증 (Server Actions)
```

### 구현 패턴

```tsx
// 1. Zod 스키마 정의 (src/lib/schemas/)
import { z } from 'zod'

export const quoteSchema = z.object({
  title: z.string().min(1, '제목을 입력하세요'),
  amount: z.number().min(0, '금액은 0 이상이어야 합니다'),
})

// 2. React Hook Form + Zod
;('use client')
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function QuoteForm() {
  const form = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: { title: '', amount: 0 },
  })
  // ...
}

// 3. Server Action
;('use server')
export async function createQuote(formData: FormData) {
  const parsed = quoteSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { error: parsed.error.flatten() }
  }
  // ...
}
```

---

## 주요 파일 상호작용

### 동시 수정 필요 파일

| 수정 대상                        | 연동 필요 파일                       |
| -------------------------------- | ------------------------------------ |
| `src/app/globals.css` (CSS 변수) | 다크모드 색상 사용하는 모든 컴포넌트 |
| `src/app/layout.tsx` (Provider)  | Provider에 의존하는 컴포넌트         |
| `src/lib/types/*.ts` (타입)      | 해당 타입 사용하는 모든 파일         |
| `src/lib/schemas/*.ts` (스키마)  | 폼, API 검증 사용하는 파일           |
| `components.json`                | shadcn/ui 컴포넌트 재설치 필요       |

### 새 기능 추가 시 체크리스트

- [ ] 타입 정의 (`src/lib/types/`)
- [ ] Zod 스키마 (`src/lib/schemas/`)
- [ ] 컴포넌트 (`src/components/`)
- [ ] 페이지 (`src/app/`)
- [ ] ROADMAP.md 업데이트
- [ ] Task 파일 생성 (`/tasks/`)

---

## AI 의사결정 기준

### 컴포넌트 분류

```
상호작용 없음 (데이터 표시만) → Server Component
상호작용 있음 (useState, onClick) → Client Component
데이터 패칭 + 상호작용 → Server Component에서 데이터 패칭 후 Client Component에 전달
```

### 스타일링 선택

```
shadcn/ui 컴포넌트 존재 → shadcn/ui 사용
커스텀 스타일 필요 → TailwindCSS 유틸리티 클래스
복잡한 변형 필요 → CVA (class-variance-authority) 사용
```

### 에러 처리

```
노션 API 에러 → 사용자 친화적 메시지 + 콘솔 로깅
404 에러 → notFound() 호출
500 에러 → error.tsx 바운더리
```

### 작업 완료 전 필수 체크

```bash
# 반드시 실행
npm run check-all

# 포함 내용
# - npm run typecheck (타입 검사)
# - npm run lint (ESLint)
# - npm run format:check (Prettier)
```

---

## 테스트 표준 (Playwright MCP)

### 필수 테스트 항목

| 테스트 유형 | 도구                                    | 검증 내용      |
| ----------- | --------------------------------------- | -------------- |
| 페이지 로드 | `browser_navigate` + `browser_snapshot` | 초기 렌더링    |
| UI 상호작용 | `browser_click`, `browser_type`         | 버튼, 폼 동작  |
| API 연동    | `browser_network_requests`              | API 호출 성공  |
| 에러 검증   | `browser_console_messages`              | 콘솔 에러 없음 |

### 테스트 미통과 시 작업 완료 금지

---

## 금지 행위

### 절대 금지

| 금지 항목                     | 이유                           |
| ----------------------------- | ------------------------------ |
| Pages Router 사용             | App Router 전용 프로젝트       |
| 동기적 params 접근            | Next.js 15.5.3 Breaking Change |
| 인라인 스타일                 | TailwindCSS 일관성             |
| 하드코딩 색상                 | 다크모드 미지원                |
| Default export (페이지 제외)  | 명시적 임포트                  |
| shadcn/ui 컴포넌트 직접 수정  | 업데이트 시 덮어쓰기           |
| node_modules 의존성 직접 수정 | 패키지 관리 원칙               |

### 지양 사항

| 지양 항목           | 대안                  |
| ------------------- | --------------------- |
| any 타입            | 명시적 타입 정의      |
| 깊은 props drilling | Context 또는 컴포지션 |
| 300줄 초과 컴포넌트 | 서브 컴포넌트 분리    |
| 복잡한 삼항 연산자  | cn() 함수 사용        |
| console.log 잔류    | 배포 전 제거          |

---

## 명령어 참조

```bash
# 개발
npm run dev              # 개발 서버 (Turbopack)
npm run build            # 프로덕션 빌드
npm run start            # 프로덕션 서버

# 품질 검사
npm run check-all        # 타입체크 + 린트 + 포맷 (작업 완료 시 필수)
npm run typecheck        # TypeScript 검사
npm run lint             # ESLint 검사
npm run lint:fix         # ESLint 자동 수정
npm run format           # Prettier 포맷
npm run format:check     # Prettier 검사

# shadcn/ui
npx shadcn@latest add [component]  # 컴포넌트 추가
```

---

## 참조 문서

| 문서              | 경로                                    |
| ----------------- | --------------------------------------- |
| PRD               | `/docs/PRD.md`                          |
| ROADMAP           | `/docs/ROADMAP.md`                      |
| 스타일링 가이드   | `/docs/guides/styling-guide.md`         |
| 컴포넌트 패턴     | `/docs/guides/component-patterns.md`    |
| Next.js 15 가이드 | `/docs/guides/nextjs-15.md`             |
| 폼 처리 가이드    | `/docs/guides/forms-react-hook-form.md` |
| Task 샘플         | `/tasks/000-sample.md`                  |
