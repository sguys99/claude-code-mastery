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
    // 에러 로깅
    console.error('애플리케이션 에러:', error)
  }, [error])

  // 에러 유형별 메시지 결정
  const getErrorMessage = () => {
    const errorMessage = error.message.toLowerCase()

    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      return {
        title: '네트워크 연결 오류',
        description: '인터넷 연결 상태를 확인하고 다시 시도해주세요.',
      }
    }

    if (errorMessage.includes('notion') || errorMessage.includes('api')) {
      return {
        title: '데이터 로드 오류',
        description: '견적서 데이터를 불러오는 중 문제가 발생했습니다.',
      }
    }

    return {
      title: '일시적인 오류가 발생했습니다',
      description:
        '예상치 못한 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
    }
  }

  const { title, description } = getErrorMessage()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center py-12">
        <Container>
          <Card className="mx-auto max-w-2xl">
            <CardHeader className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-destructive/10 flex h-24 w-24 items-center justify-center rounded-full">
                  <AlertCircle className="text-destructive h-12 w-12" />
                </div>
              </div>
              {/* 에러 코드 강조 (선택적) */}
              <div className="text-destructive mb-4 text-6xl font-bold tracking-tight md:text-7xl">
                500
              </div>
              <CardTitle className="text-2xl md:text-3xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 안내 메시지 */}
              <div className="text-muted-foreground space-y-3 text-center">
                <p className="text-base">{description}</p>
              </div>

              {/* 해결 방법 안내 */}
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="mb-3 text-sm font-semibold">해결 방법</h3>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>
                      페이지를 새로고침하거나 다시 시도 버튼을 눌러주세요
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>문제가 지속되면 잠시 후 다시 접속해주세요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>
                      계속 오류가 발생하면 견적서 발급 담당자에게 문의해주세요
                    </span>
                  </li>
                </ul>
              </div>

              {/* 에러 ID (디버깅용) */}
              {error.digest && (
                <div className="text-muted-foreground text-center text-xs">
                  에러 ID: {error.digest}
                </div>
              )}

              {/* 액션 버튼 */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={reset}
                  variant="default"
                  size="lg"
                  className="flex-1"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  다시 시도
                </Button>
                <Link href="/" className="flex-1">
                  <Button variant="outline" size="lg" className="w-full">
                    <Home className="mr-2 h-4 w-4" />
                    홈으로 돌아가기
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
