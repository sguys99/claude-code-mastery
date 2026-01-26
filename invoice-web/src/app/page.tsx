import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Download, Mail } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container>
          <section className="py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                견적서 뷰어
              </h1>
              <p className="text-muted-foreground mt-6 text-lg leading-8">
                노션에서 작성한 견적서를 웹에서 바로 확인하고 PDF로
                다운로드하세요.
                <br />
                회원가입 없이 링크만 있으면 바로 사용 가능합니다.
              </p>
            </div>
          </section>

          <section className="pb-20">
            <h2 className="mb-8 text-center text-2xl font-bold">사용 방법</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="bg-primary/10 mb-2 flex h-12 w-12 items-center justify-center rounded-lg">
                    <Mail className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle>1. 링크 받기</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    이메일이나 메신저로 받은 견적서 링크를 클릭합니다.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-primary/10 mb-2 flex h-12 w-12 items-center justify-center rounded-lg">
                    <FileText className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle>2. 견적서 확인</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    웹 브라우저에서 견적서 내용을 바로 확인할 수 있습니다.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-primary/10 mb-2 flex h-12 w-12 items-center justify-center rounded-lg">
                    <Download className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle>3. PDF 다운로드</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    필요하면 PDF 파일로 다운로드하여 보관하거나 인쇄하세요.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="pb-20 text-center">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle>샘플 견적서 보기</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  견적서가 어떻게 표시되는지 샘플로 확인해보세요.
                </p>
                <Link href="/quote/sample">
                  <Button size="lg" className="w-full">
                    샘플 견적서 열기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
