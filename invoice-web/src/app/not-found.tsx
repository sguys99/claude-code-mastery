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
      <main className="flex flex-1 items-center justify-center">
        <Container>
          <Card className="mx-auto max-w-md">
            <CardHeader className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full">
                  <FileQuestion className="text-muted-foreground h-10 w-10" />
                </div>
              </div>
              <CardTitle className="text-2xl">
                견적서를 찾을 수 없습니다
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-center text-sm">
                요청하신 견적서가 존재하지 않거나 삭제되었습니다.
                <br />
                견적서 링크를 다시 확인해주세요.
              </p>
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
