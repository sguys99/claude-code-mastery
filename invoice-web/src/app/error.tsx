'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/layout/container'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <Container>
          <Card className="mx-auto max-w-md">
            <CardHeader className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-destructive/10 flex h-20 w-20 items-center justify-center rounded-full">
                  <AlertCircle className="text-destructive h-10 w-10" />
                </div>
              </div>
              <CardTitle className="text-2xl">
                일시적인 오류가 발생했습니다
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-center text-sm">
                견적서를 불러오는 중 문제가 발생했습니다.
                <br />
                잠시 후 다시 시도해주세요.
              </p>
              <div className="flex gap-2">
                <Button onClick={reset} variant="outline" className="flex-1">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  다시 시도
                </Button>
                <Link href="/" className="flex-1">
                  <Button className="w-full">
                    <Home className="mr-2 h-4 w-4" />
                    홈으로
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
