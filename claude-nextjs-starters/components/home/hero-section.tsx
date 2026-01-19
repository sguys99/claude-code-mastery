import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

// 히어로 섹션 컴포넌트
// 페이지 상단 메인 배너 영역
export function HeroSection() {
  return (
    <section className="container py-24 md:py-32">
      <div className="flex flex-col items-center text-center gap-8">
        {/* 배지 */}
        <Badge variant="secondary" className="px-4 py-1.5">
          Next.js 16 + Tailwind CSS v4 + ShadcnUI
        </Badge>

        {/* 메인 타이틀 */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          모던 웹 개발을
          <br />
          <span className="text-primary">빠르게 시작</span>하세요
        </h1>

        {/* 설명 */}
        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Next.js App Router, TypeScript, Tailwind CSS v4, ShadcnUI를 활용한
          프로덕션 준비된 스타터킷입니다. 다크모드, 반응형 레이아웃, 토스트 알림이
          기본 제공됩니다.
        </p>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/components">
              시작하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
