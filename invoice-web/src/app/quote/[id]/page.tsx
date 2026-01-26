import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/container'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Download, Home } from 'lucide-react'
import Link from 'next/link'

interface QuotePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function QuotePage({ params }: QuotePageProps) {
  const { id } = await params

  // TODO: 노션 API로 견적서 데이터 조회
  // 임시로 샘플 데이터만 표시
  if (id !== 'sample') {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="mr-2 h-4 w-4" />
                홈으로
              </Button>
            </Link>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              PDF 다운로드
            </Button>
          </div>

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
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-2 h-4 w-32" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  )
}

async function QuoteContent({ id }: { id: string }) {
  // TODO: 노션 API 연동 시 id 파라미터를 사용하여 데이터 조회 예정
  // 임시 샘플 데이터
  const sampleQuote = {
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
  }

  return (
    <Card>
      <CardHeader className="space-y-4 border-b">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{sampleQuote.title}</h1>
            <p className="text-muted-foreground mt-1">
              견적서 번호: {sampleQuote.quote_number}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm">발행일: {sampleQuote.issue_date}</p>
            <p className="text-sm">유효기간: {sampleQuote.valid_until}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-semibold">발신자</h3>
            <p className="text-sm">{sampleQuote.sender_company}</p>
            <p className="text-sm">{sampleQuote.sender_name}</p>
            <p className="text-sm">{sampleQuote.sender_contact}</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">수신자</h3>
            <p className="text-sm">{sampleQuote.client_name}</p>
            <p className="text-sm">{sampleQuote.client_contact}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <h3 className="mb-4 text-lg font-semibold">견적 항목</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-sm">
                <th className="pb-2 text-left">항목명</th>
                <th className="pb-2 text-left">설명</th>
                <th className="pb-2 text-right">수량</th>
                <th className="pb-2 text-right">단가</th>
                <th className="pb-2 text-right">금액</th>
              </tr>
            </thead>
            <tbody>
              {sampleQuote.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3">{item.name}</td>
                  <td className="text-muted-foreground py-3 text-sm">
                    {item.description}
                  </td>
                  <td className="py-3 text-right">{item.quantity}</td>
                  <td className="py-3 text-right">
                    {item.unit_price.toLocaleString()}원
                  </td>
                  <td className="py-3 text-right">
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
              {sampleQuote.subtotal.toLocaleString()}원
            </span>
          </div>
          <div className="flex justify-between">
            <span>부가세 (10%)</span>
            <span className="font-medium">
              {sampleQuote.tax.toLocaleString()}원
            </span>
          </div>
          <div className="flex justify-between border-t pt-2 text-lg font-bold">
            <span>총 금액</span>
            <span>{sampleQuote.total.toLocaleString()}원</span>
          </div>
        </div>

        <div className="mt-6 space-y-4 border-t pt-6">
          <div>
            <h4 className="mb-2 font-semibold">결제 조건</h4>
            <p className="text-muted-foreground text-sm">
              {sampleQuote.payment_terms}
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">특이사항</h4>
            <p className="text-muted-foreground text-sm">{sampleQuote.notes}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
