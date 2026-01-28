# Task 013: 성능 최적화

## 목표

노션 API 응답 캐싱 및 번들 사이즈 최적화를 통한 성능 개선

## 작업 내용

### 1. 노션 API 캐싱 전략 구현

- [x] `unstable_cache` 적용 (Next.js 캐싱)
- [x] 견적서 목록: 5분 캐시 (`revalidate: 300`)
- [x] 단일 견적서: 1분 캐시 (`revalidate: 60`)
- [x] 캐시 태그 시스템 구현 (`quotes`, `quote`)

### 2. 번들 분석 도구 설정

- [x] `@next/bundle-analyzer` 설치
- [x] `next.config.ts`에 번들 분석기 설정
- [x] `npm run analyze` 스크립트 추가

### 3. 패키지 최적화

- [x] `optimizePackageImports` 설정
  - `lucide-react`: 아이콘 트리쉐이킹
  - `@notionhq/client`: API 클라이언트 최적화

### 4. 이미지 최적화 설정

- [x] `next/image` 포맷 설정 (WebP, AVIF)
- [x] 압축 활성화 (`compress: true`)

## 수정된 파일

- `src/lib/notion/queries.ts` - 캐싱 적용
- `next.config.ts` - 번들 분석기 및 최적화 설정
- `package.json` - analyze 스크립트 추가

## 캐시 전략

| 데이터 | 캐시 시간 | 태그 |
|--------|----------|------|
| 견적서 목록 | 5분 | `quotes` |
| 단일 견적서 | 1분 | `quote`, `quote-{id}` |
| 관계형 항목 | 1분 | `quote` |

## 사용 방법

### 번들 분석

```bash
npm run analyze
```

- 빌드 완료 후 브라우저에서 번들 분석 리포트 자동 열림
- 클라이언트/서버 번들 크기 확인 가능

### 캐시 재검증

```typescript
import { revalidateTag } from 'next/cache'
import { CACHE_TAGS } from '@/lib/notion/queries'

// 모든 견적서 캐시 무효화
revalidateTag(CACHE_TAGS.quotes)

// 특정 견적서 캐시 무효화
revalidateTag(`quote-${quoteId}`)
```

## 테스트 결과

- [x] 타입 체크 통과
- [x] 견적서 페이지 정상 렌더링
- [x] 콘솔 에러 없음
- [x] 캐싱 적용 후 API 응답 속도 개선

## 검증 기준

- [x] unstable_cache 정상 동작
- [x] 번들 분석기 실행 가능
- [x] 패키지 최적화 설정 적용

## 완료일

2025-01-28
