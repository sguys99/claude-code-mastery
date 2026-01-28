import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/layout/container'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FileQuestion, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center py-12">
        <Container>
          <Card className="mx-auto max-w-2xl">
            <CardHeader className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-muted flex h-24 w-24 items-center justify-center rounded-full">
                  <FileQuestion className="text-muted-foreground h-12 w-12" />
                </div>
              </div>
              {/* 404 코드 강조 표시 */}
              <div className="text-primary mb-4 text-6xl font-bold tracking-tight md:text-7xl">
                404
              </div>
              <CardTitle className="text-2xl md:text-3xl">
                페이지를 찾을 수 없습니다
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 안내 메시지 */}
              <div className="text-muted-foreground space-y-3 text-center">
                <p className="text-base">
                  요청하신 페이지가 존재하지 않거나 삭제되었습니다.
                </p>
              </div>

              {/* 해결 방법 안내 */}
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="mb-3 text-sm font-semibold">
                  다음 사항을 확인해주세요
                </h3>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>
                      견적서 링크 주소를 정확하게 입력했는지 확인해주세요
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>견적서가 만료되었거나 삭제되었을 수 있습니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>
                      견적서를 발급한 담당자에게 새로운 링크를 요청해주세요
                    </span>
                  </li>
                </ul>
              </div>

              {/* 홈으로 돌아가기 버튼 */}
              <Link href="/" className="block">
                <Button className="w-full" size="lg">
                  <Home className="mr-2 h-4 w-4" />
                  홈으로 돌아가기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
