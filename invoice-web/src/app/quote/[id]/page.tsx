import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/container'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { getQuoteById, transformNotionToQuote } from '@/lib/notion'
import { PdfDownloadButton } from '@/components/quote/pdf-download-button'
import type { Quote } from '@/lib/types/quote'

interface QuotePageProps {
  params: Promise<{
    id: string
  }>
}

// 샘플 데이터 (sample ID용)
const sampleQuote: Quote = {
  id: 'sample',
  quote_number: 'Q-2025-001',
  title: '웹사이트 개발 견적서',
  issue_date: '2025-01-26',
  valid_until: '2025-02-26',
  sender_company: '(주)테크솔루션',
  sender_name: '김개발',
  sender_contact: '010-1234-5678',
  client_name: '홍길동',
  client_contact: '010-9876-5432',
  items: [
    {
      name: '웹사이트 기획 및 디자인',
      description: 'UI/UX 디자인 및 프로토타입 제작',
      quantity: 1,
      unit_price: 3000000,
      amount: 3000000,
    },
    {
      name: '프론트엔드 개발',
      description: 'React 기반 웹 애플리케이션 개발',
      quantity: 1,
      unit_price: 5000000,
      amount: 5000000,
    },
    {
      name: '백엔드 개발',
      description: 'Node.js API 서버 구축',
      quantity: 1,
      unit_price: 4000000,
      amount: 4000000,
    },
  ],
  subtotal: 12000000,
  tax: 1200000,
  total: 13200000,
  payment_terms: '계약금 50%, 잔금 50% (완료 후)',
  notes: '유지보수 계약은 별도 협의 가능합니다.',
  status: 'active',
}

// 견적서 데이터 조회
async function getQuote(id: string): Promise<Quote | null> {
  // 샘플 ID인 경우 샘플 데이터 반환
  if (id === 'sample') {
    return sampleQuote
  }

  // 노션 API로 데이터 조회
  try {
    const page = await getQuoteById(id)
    if (!page) {
      return null
    }
    return await transformNotionToQuote(page)
  } catch (error) {
    console.error('견적서 조회 에러:', error)
    return null
  }
}

export default async function QuotePage({ params }: QuotePageProps) {
  const { id } = await params

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <Container>
          <Suspense fallback={<QuoteLoading />}>
            <QuoteContent id={id} />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

function QuoteLoading() {
  return (
    <>
      {/* 상단 버튼 스켈레톤 */}
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-32" />
      </div>

      {/* 견적서 카드 스켈레톤 */}
      <Card>
        <CardHeader className="space-y-4 border-b">
          {/* 헤더 */}
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          {/* 발신자/수신자 정보 */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {/* 견적 항목 제목 */}
          <Skeleton className="mb-4 h-6 w-24" />

          {/* 테이블 헤더 스켈레톤 */}
          <div className="hidden space-y-3 md:block">
            <div className="flex gap-4 border-b pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
            {/* 테이블 행 스켈레톤 */}
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 border-b py-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>

          {/* 모바일 카드 스켈레톤 */}
          <div className="space-y-4 md:hidden">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-muted/30 space-y-3 rounded-lg p-4">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>

          {/* 합계 영역 스켈레톤 */}
          <div className="mt-6 space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex justify-between border-t pt-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-28" />
            </div>
          </div>

          {/* 결제조건/특이사항 스켈레톤 */}
          <div className="mt-6 space-y-4 border-t pt-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

async function QuoteContent({ id }: { id: string }) {
  const quote = await getQuote(id)

  // 견적서를 찾을 수 없는 경우
  if (!quote) {
    notFound()
  }

  return (
    <>
      {/* 상단 버튼 영역 */}
      <div className="mb-6 flex items-center justify-between">
        <Link href="/">
          <Button variant="outline" size="sm">
            <Home className="mr-2 h-4 w-4" />
            홈으로
          </Button>
        </Link>
        <PdfDownloadButton contentId="quote-content" />
      </div>

      {/* 견적서 카드 */}
      <Card id="quote-content">
        <CardHeader className="space-y-4 border-b">
          {/* 견적서 헤더: 모바일에서 세로 배치, 데스크톱에서 가로 배치 */}
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">{quote.title}</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                견적서 번호: {quote.quote_number}
              </p>
            </div>
            <div className="text-muted-foreground flex gap-4 text-sm md:flex-col md:gap-0 md:text-right">
              <p>발행일: {quote.issue_date}</p>
              <p>유효기간: {quote.valid_until}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">발신자</h3>
              <p className="text-sm">{quote.sender_company}</p>
              {quote.sender_name && (
                <p className="text-sm">{quote.sender_name}</p>
              )}
              {quote.sender_contact && (
                <p className="text-sm">{quote.sender_contact}</p>
              )}
            </div>
            <div>
              <h3 className="mb-2 font-semibold">수신자</h3>
              <p className="text-sm">{quote.client_name}</p>
              {quote.client_contact && (
                <p className="text-sm">{quote.client_contact}</p>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-semibold">견적 항목</h3>

          {/* 모바일: 카드 형태 */}
          <div className="space-y-4 md:hidden">
            {quote.items.map((item, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-4">
                <div className="mb-2 font-medium">{item.name}</div>
                {item.description && (
                  <p className="text-muted-foreground mb-3 text-sm">
                    {item.description}
                  </p>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.quantity}개 × {item.unit_price.toLocaleString()}원
                  </span>
                  <span className="font-medium">
                    {item.amount.toLocaleString()}원
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 데스크톱: 테이블 형태 */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-sm">
                  <th className="pb-2 text-left">항목명</th>
                  <th className="pb-2 text-left">설명</th>
                  <th className="w-16 pb-2 text-right">수량</th>
                  <th className="w-28 pb-2 text-right">단가</th>
                  <th className="w-28 pb-2 text-right">금액</th>
                </tr>
              </thead>
              <tbody>
                {quote.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 font-medium">{item.name}</td>
                    <td className="text-muted-foreground py-3 text-sm">
                      {item.description || '-'}
                    </td>
                    <td className="py-3 text-right">{item.quantity}</td>
                    <td className="py-3 text-right whitespace-nowrap">
                      {item.unit_price.toLocaleString()}원
                    </td>
                    <td className="py-3 text-right whitespace-nowrap">
                      {item.amount.toLocaleString()}원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span>소계</span>
              <span className="font-medium">
                {quote.subtotal.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between">
              <span>부가세 (10%)</span>
              <span className="font-medium">
                {quote.tax.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between border-t pt-2 text-lg font-bold">
              <span>총 금액</span>
              <span>{quote.total.toLocaleString()}원</span>
            </div>
          </div>

          {(quote.payment_terms || quote.notes) && (
            <div className="mt-6 space-y-4 border-t pt-6">
              {quote.payment_terms && (
                <div>
                  <h4 className="mb-2 font-semibold">결제 조건</h4>
                  <p className="text-muted-foreground text-sm">
                    {quote.payment_terms}
                  </p>
                </div>
              )}
              {quote.notes && (
                <div>
                  <h4 className="mb-2 font-semibold">특이사항</h4>
                  <p className="text-muted-foreground text-sm">{quote.notes}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
