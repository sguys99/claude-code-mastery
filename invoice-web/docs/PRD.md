# Invoice Web Viewer - PRD (Product Requirements Document)

> 노션에서 작성한 견적서를 클라이언트가 웹에서 확인하고 PDF로 다운로드할 수 있는 시스템

---

## 1. 프로젝트 개요

### 1.1 프로젝트 정보

| 항목 | 내용 |
|------|------|
| 프로젝트명 | Invoice Web Viewer (견적서 웹 뷰어) |
| 버전 | MVP 1.0 |
| 기술 스택 | Next.js 15.5.3, React 19, TypeScript 5, TailwindCSS v4, shadcn/ui |

### 1.2 해결하려는 문제

- **현재 문제**: 견적서를 PDF로 만들어 이메일로 전송하는 방식은 수정 시 재발송 필요
- **비효율성**: 견적서 확인 여부를 알 수 없음
- **접근성**: 모바일에서 PDF 확인이 불편함

### 1.3 핵심 가치 제안

1. **실시간 동기화**: 노션에서 수정하면 웹에 즉시 반영
2. **간편한 공유**: 고유 URL 하나로 견적서 공유
3. **다양한 디바이스 지원**: 반응형 웹으로 모바일/PC 모두 최적화
4. **PDF 다운로드**: 필요 시 공식 문서로 보관 가능

---

## 2. 사용자 정의

### 2.1 관리자 (Admin)

| 항목 | 내용 |
|------|------|
| 역할 | 견적서 작성 및 관리 |
| 니즈 | 노션에서 편하게 견적서 작성, 클라이언트에게 쉽게 공유 |
| 목표 | 최소한의 작업으로 전문적인 견적서 전달 |

**사용 흐름**:
1. 노션 데이터베이스에서 견적서 작성
2. 자동 생성된 URL을 클라이언트에게 전달

### 2.2 클라이언트 (Client)

| 항목 | 내용 |
|------|------|
| 역할 | 견적서 수신 및 확인 |
| 니즈 | 언제 어디서든 견적서 확인, 필요 시 PDF 저장 |
| 목표 | 빠르고 명확하게 견적 내용 파악 |

**사용 흐름**:
1. 전달받은 URL로 접속
2. 웹에서 견적서 내용 확인
3. 필요 시 PDF 다운로드

---

## 3. 핵심 기능 (MVP 범위)

### 3.1 기능 우선순위

| 우선순위 | 기능 | 설명 | 의존성 |
|---------|------|------|--------|
| P0 | 노션 연동 | Notion API로 견적서 데이터 조회 | - |
| P0 | 견적서 뷰어 | 웹에서 견적서 렌더링 | 노션 연동 |
| P0 | PDF 다운로드 | 견적서를 PDF로 변환 및 다운로드 | 견적서 뷰어 |
| P1 | 반응형 디자인 | 모바일/태블릿/PC 최적화 | 견적서 뷰어 |
| P1 | 에러 처리 | 404, 만료된 견적서 등 처리 | 노션 연동 |

### 3.2 기능별 상세 요구사항

#### 3.2.1 노션 연동

```typescript
// 필수 구현 사항
interface NotionIntegration {
  // 단일 견적서 조회
  getInvoiceById(id: string): Promise<Invoice>;

  // 견적서 존재 여부 확인
  checkInvoiceExists(id: string): Promise<boolean>;
}
```

**요구사항**:
- Notion API 키를 환경변수로 관리
- 데이터베이스 ID를 환경변수로 관리
- API 호출 실패 시 적절한 에러 처리
- 응답 데이터를 애플리케이션 타입으로 변환

#### 3.2.2 견적서 웹 뷰어

**필수 표시 정보**:
- 견적서 기본 정보 (번호, 발행일, 유효기간)
- 발신자 정보 (회사명, 사업자등록번호, 주소, 연락처)
- 수신자 정보 (회사명/성명, 담당자, 연락처)
- 품목 리스트 (품목명, 규격, 수량, 단가, 금액)
- 금액 정보 (공급가액, 부가세, 총액)
- 비고/특이사항

**UI 요구사항**:
- A4 비율의 문서 형태로 표시
- 회사 로고 표시 영역
- 인감/서명 이미지 표시 영역

#### 3.2.3 PDF 다운로드

**요구사항**:
- 버튼 클릭으로 PDF 다운로드
- 파일명: `견적서_[견적서번호]_[날짜].pdf`
- A4 사이즈 출력
- 웹 뷰어와 동일한 레이아웃 유지

---

## 4. 시스템 아키텍처

### 4.1 데이터 흐름

```text
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Notion    │────▶│  Next.js    │────▶│   Client    │
│  Database   │     │   Server    │     │   Browser   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       │   Notion API      │   RSC/HTML        │
       │   (Server-side)   │                   │
       └───────────────────┴───────────────────┘
```

### 4.2 노션 연동 방식

| 항목 | 설명 |
|------|------|
| 연동 방식 | Notion Integration (Internal) |
| 인증 | Bearer Token (환경변수) |
| 데이터 조회 | Server Component에서 직접 호출 |
| 캐싱 | Next.js fetch 캐시 + revalidate |

### 4.3 페이지 라우팅 구조

```text
app/
├── page.tsx                    # 랜딩/안내 페이지
├── invoice/
│   └── [id]/
│       ├── page.tsx            # 견적서 뷰어 페이지
│       └── loading.tsx         # 로딩 UI
├── api/
│   └── invoice/
│       └── [id]/
│           └── pdf/
│               └── route.ts    # PDF 생성 API
└── not-found.tsx               # 404 페이지
```

---

## 5. 데이터 모델

### 5.1 견적서 데이터 스키마

```typescript
// 견적서 기본 정보
interface Invoice {
  id: string;                    // 노션 페이지 ID
  invoiceNumber: string;         // 견적서 번호 (예: EST-2024-001)
  issueDate: string;             // 발행일 (YYYY-MM-DD)
  validUntil: string;            // 유효기간 (YYYY-MM-DD)
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';

  // 발신자 정보
  sender: {
    companyName: string;         // 회사명
    representative: string;      // 대표자명
    businessNumber: string;      // 사업자등록번호
    address: string;             // 주소
    phone: string;               // 연락처
    email: string;               // 이메일
    logoUrl?: string;            // 회사 로고 URL
    stampUrl?: string;           // 인감 이미지 URL
  };

  // 수신자 정보
  receiver: {
    companyName: string;         // 회사명/성명
    contactPerson?: string;      // 담당자
    phone?: string;              // 연락처
    email?: string;              // 이메일
  };

  // 품목 리스트
  items: InvoiceItem[];

  // 금액 정보
  subtotal: number;              // 공급가액
  tax: number;                   // 부가세
  total: number;                 // 총액

  // 추가 정보
  paymentTerms?: string;         // 결제조건
  notes?: string;                // 비고/특이사항

  // 메타데이터
  createdAt: string;
  updatedAt: string;
}

// 견적서 품목
interface InvoiceItem {
  id: string;
  name: string;                  // 품목명
  description?: string;          // 규격/설명
  quantity: number;              // 수량
  unitPrice: number;             // 단가
  amount: number;                // 금액 (수량 × 단가)
}
```

### 5.2 노션 데이터베이스 필드 매핑

| 애플리케이션 필드 | 노션 속성 | 타입 |
|-----------------|----------|------|
| invoiceNumber | 견적서번호 | Title |
| issueDate | 발행일 | Date |
| validUntil | 유효기간 | Date |
| status | 상태 | Select |
| sender.companyName | 공급자_회사명 | Rich Text |
| sender.representative | 공급자_대표자 | Rich Text |
| sender.businessNumber | 공급자_사업자번호 | Rich Text |
| sender.address | 공급자_주소 | Rich Text |
| sender.phone | 공급자_연락처 | Phone |
| sender.email | 공급자_이메일 | Email |
| sender.logoUrl | 공급자_로고 | Files |
| sender.stampUrl | 공급자_인감 | Files |
| receiver.companyName | 수신자_회사명 | Rich Text |
| receiver.contactPerson | 수신자_담당자 | Rich Text |
| receiver.phone | 수신자_연락처 | Phone |
| receiver.email | 수신자_이메일 | Email |
| items | 품목 | Relation (별도 DB) |
| subtotal | 공급가액 | Number |
| tax | 부가세 | Formula |
| total | 총액 | Formula |
| paymentTerms | 결제조건 | Select |
| notes | 비고 | Rich Text |

---

## 6. UI/UX 요구사항

### 6.1 견적서 뷰어 페이지

```text
┌──────────────────────────────────────────────────────┐
│  [로고]                              견 적 서        │
├──────────────────────────────────────────────────────┤
│  견적서 번호: EST-2024-001                           │
│  발행일: 2024-01-15        유효기간: 2024-02-15      │
├──────────────────────────────────────────────────────┤
│  [공급자 정보]              │  [수신자 정보]          │
│  회사명: OOO               │  회사명: XXX           │
│  대표자: 홍길동             │  담당자: 김담당         │
│  사업자번호: 123-45-67890  │  연락처: 010-1234-5678 │
│  주소: 서울시 강남구...     │  이메일: xxx@email.com │
├──────────────────────────────────────────────────────┤
│  번호 │ 품목명    │ 규격   │ 수량 │ 단가    │ 금액   │
│  ─────┼──────────┼───────┼─────┼────────┼───────│
│  1    │ 웹 개발   │ -     │ 1   │ 5,000,000│5,000,000│
│  2    │ 디자인   │ UI/UX │ 1   │ 2,000,000│2,000,000│
├──────────────────────────────────────────────────────┤
│                              공급가액: 7,000,000원   │
│                              부가세:     700,000원   │
│                              ─────────────────────   │
│                              총  액:  7,700,000원   │
├──────────────────────────────────────────────────────┤
│  결제조건: 계약금 50%, 잔금 50%                       │
│  비고: 상기 금액으로 견적합니다.                      │
├──────────────────────────────────────────────────────┤
│                                         [인감]       │
│                           위 금액을 견적합니다.       │
│                           2024년 01월 15일           │
│                           회사명: OOO               │
│                           대표자: 홍길동 (인)        │
└──────────────────────────────────────────────────────┘
              [ PDF 다운로드 ]
```

### 6.2 반응형 디자인 요구사항

| 브레이크포인트 | 레이아웃 |
|--------------|----------|
| Desktop (1024px+) | A4 비율 카드, 중앙 정렬, 그림자 효과 |
| Tablet (768px-1023px) | 좌우 패딩 축소, 폰트 사이즈 유지 |
| Mobile (~767px) | 전체 너비, 공급자/수신자 정보 세로 배치 |

### 6.3 PDF 출력 레이아웃

- A4 사이즈 (210mm × 297mm)
- 여백: 상하좌우 20mm
- 웹 뷰어와 동일한 디자인 유지
- 헤더/푸터 없음 (본문만)

---

## 7. 기술적 고려사항

### 7.1 보안

| 항목 | 구현 방식 |
|------|----------|
| URL 접근 | 노션 페이지 ID를 URL로 사용 (UUID 형식으로 추측 어려움) |
| API 키 보호 | 서버 사이드에서만 Notion API 호출 |
| 환경변수 | `.env.local`에 민감 정보 저장 |

```typescript
// 환경변수 예시
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx-xxxxx-xxxxx
```

### 7.2 성능

| 항목 | 전략 |
|------|------|
| 데이터 캐싱 | `revalidate: 60` (1분 캐시) |
| 이미지 최적화 | Next.js Image 컴포넌트 사용 |
| PDF 생성 | 클라이언트 사이드 생성 (서버 부하 방지) |

```typescript
// 캐싱 예시
async function getInvoice(id: string) {
  const response = await fetch(`...`, {
    next: { revalidate: 60 }
  });
  return response.json();
}
```

### 7.3 SEO/메타데이터

```typescript
// 동적 메타데이터 생성
export async function generateMetadata({ params }): Promise<Metadata> {
  const invoice = await getInvoice(params.id);

  return {
    title: `견적서 - ${invoice.invoiceNumber}`,
    description: `${invoice.receiver.companyName}님께 보내는 견적서`,
    robots: { index: false, follow: false }, // 검색 엔진 노출 방지
  };
}
```

---

## 8. MVP 제외 사항

### 8.1 향후 버전에서 고려할 기능

| 기능 | 설명 | 고려 버전 |
|------|------|----------|
| 견적서 조회 알림 | 클라이언트가 조회 시 관리자에게 알림 | v1.1 |
| 견적서 승인/거절 | 클라이언트가 웹에서 승인/거절 버튼 클릭 | v1.1 |
| 조회 통계 | 견적서별 조회 횟수, 시간 등 통계 | v1.2 |
| 이메일 발송 | 견적서 URL을 이메일로 직접 발송 | v1.2 |
| 다국어 지원 | 영문 견적서 지원 | v2.0 |
| 견적서 템플릿 | 다양한 디자인 템플릿 선택 | v2.0 |

### 8.2 의도적으로 제외한 기능

| 기능 | 제외 이유 |
|------|----------|
| 관리자 대시보드 | 노션이 관리 도구 역할 수행 |
| 사용자 인증 | MVP에서는 URL 접근만으로 충분 |
| 견적서 편집 기능 | 노션에서 직접 편집 |
| 결제 연동 | MVP 범위 초과 |

---

## 9. 성공 지표

### 9.1 MVP 완료 기준

- [ ] 노션 데이터베이스에서 견적서 데이터 조회 가능
- [ ] 고유 URL로 견적서 웹 페이지 접근 가능
- [ ] 웹에서 견적서 전체 내용 확인 가능
- [ ] PDF 다운로드 기능 정상 동작
- [ ] 모바일/태블릿/PC에서 정상 표시
- [ ] 존재하지 않는 견적서 접근 시 404 페이지 표시
- [ ] 프로덕션 빌드 성공

### 9.2 기술적 완료 기준

- [ ] TypeScript 타입 에러 없음
- [ ] ESLint 경고 없음
- [ ] Lighthouse 성능 점수 90점 이상
- [ ] Core Web Vitals 통과

---

## 부록: 기술 스택 상세

| 카테고리 | 기술 | 버전 |
|---------|------|------|
| Framework | Next.js | 15.5.3 |
| Runtime | React | 19.1.0 |
| Language | TypeScript | 5.x |
| Styling | TailwindCSS | v4 |
| UI Library | shadcn/ui | latest (new-york) |
| UI Primitives | Radix UI | latest |
| Icons | Lucide Icons | latest |
| PDF | html2canvas + jsPDF | latest |
| API | Notion SDK | latest |
