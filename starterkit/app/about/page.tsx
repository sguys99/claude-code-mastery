import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// 소개 페이지 컴포넌트
export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 py-12">
        <h1 className="text-3xl font-bold">소개</h1>
        <p className="mt-4 text-muted-foreground">
          이 프로젝트는 Next.js v15 App Router를 기반으로 한 웹 개발 스타터
          킷입니다.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">기술 스택</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-muted-foreground">
          <li>Next.js v15 (App Router)</li>
          <li>TypeScript</li>
          <li>TailwindCSS v4 (CSS-first 설정)</li>
          <li>shadcn/ui</li>
          <li>lucide-react</li>
          <li>next-themes (다크 모드)</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">주요 기능</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-muted-foreground">
          <li>다크/라이트 모드 지원</li>
          <li>반응형 디자인</li>
          <li>타입 안전한 개발 환경</li>
          <li>모던한 UI 컴포넌트</li>
        </ul>
      </main>
      <Footer />
    </div>
  );
}
