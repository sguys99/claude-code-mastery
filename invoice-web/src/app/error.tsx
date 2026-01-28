'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/layout/container'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import {
  AlertCircle,
  Home,
  RefreshCw,
  Wifi,
  Lock,
  FileX,
  Clock,
  ServerCrash,
  Loader2,
} from 'lucide-react'
import {
  NotionApiError,
  type NotionErrorCode,
  getErrorInfo,
  parseNotionError,
} from '@/lib/errors/notion-errors'

// 에러 코드별 아이콘 매핑
const ERROR_ICONS: Record<NotionErrorCode, React.ReactNode> = {
  unauthorized: <Lock className="h-12 w-12" />,
  forbidden: <Lock className="h-12 w-12" />,
  not_found: <FileX className="h-12 w-12" />,
  rate_limited: <Clock className="h-12 w-12" />,
  server_error: <ServerCrash className="h-12 w-12" />,
  network_error: <Wifi className="h-12 w-12" />,
  unknown: <AlertCircle className="h-12 w-12" />,
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [isRetrying, setIsRetrying] = useState(false)

  useEffect(() => {
    // 에러 로깅
    console.error('애플리케이션 에러:', error)
  }, [error])

  // 노션 API 에러 파싱
  const notionError =
    error instanceof NotionApiError ? error : parseNotionError(error)
  const errorInfo = getErrorInfo(notionError.code)

  // 재시도 핸들러
  const handleRetry = async () => {
    setIsRetrying(true)
    // 잠시 대기 후 재시도 (Rate limit 대응)
    await new Promise((resolve) => setTimeout(resolve, 500))
    reset()
    setIsRetrying(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center py-12">
        <Container>
          <Card className="mx-auto max-w-2xl">
            <CardHeader className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-destructive/10 text-destructive flex h-24 w-24 items-center justify-center rounded-full">
                  {ERROR_ICONS[notionError.code]}
                </div>
              </div>
              {/* 에러 코드 강조 */}
              <div className="text-destructive mb-4 text-6xl font-bold tracking-tight md:text-7xl">
                {notionError.code === 'not_found' ? '404' : '500'}
              </div>
              <CardTitle className="text-2xl md:text-3xl">
                {errorInfo.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 안내 메시지 */}
              <div className="text-muted-foreground space-y-3 text-center">
                <p className="text-base">{errorInfo.description}</p>
              </div>

              {/* 해결 방법 안내 */}
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="mb-3 text-sm font-semibold">해결 방법</h3>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  {errorInfo.retryable && (
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>
                        페이지를 새로고침하거나 다시 시도 버튼을 눌러주세요
                      </span>
                    </li>
                  )}
                  {notionError.code === 'network_error' && (
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>인터넷 연결 상태를 확인해주세요</span>
                    </li>
                  )}
                  {notionError.code === 'rate_limited' && (
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>1-2분 후에 다시 시도해주세요</span>
                    </li>
                  )}
                  {notionError.code === 'not_found' && (
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>견적서 링크 주소를 다시 확인해주세요</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>문제가 지속되면 견적서 발급 담당자에게 문의해주세요</span>
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
                {errorInfo.retryable && (
                  <Button
                    onClick={handleRetry}
                    variant="default"
                    size="lg"
                    className="flex-1"
                    disabled={isRetrying}
                  >
                    {isRetrying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        재시도 중...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        다시 시도
                      </>
                    )}
                  </Button>
                )}
                <Link
                  href="/"
                  className={errorInfo.retryable ? 'flex-1' : 'w-full'}
                >
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
