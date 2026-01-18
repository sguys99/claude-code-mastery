import Link from "next/link";
import { ArrowRight, Zap, Shield, Palette } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// 기능 목록 데이터
const features = [
  {
    icon: Zap,
    title: "빠른 성능",
    description: "Next.js 15와 Turbopack으로 빠른 개발 경험을 제공합니다.",
  },
  {
    icon: Shield,
    title: "타입 안전성",
    description: "TypeScript로 안전하고 예측 가능한 코드를 작성하세요.",
  },
  {
    icon: Palette,
    title: "현대적인 스타일링",
    description:
      "TailwindCSS v4와 shadcn/ui로 아름다운 UI를 빠르게 구축하세요.",
  },
];

// 홈 페이지 컴포넌트
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* 히어로 섹션 */}
        <section className="container flex flex-col items-center justify-center gap-4 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Next.js v15 스타터 킷
          </h1>
          <p className="max-w-[600px] text-lg text-muted-foreground">
            TypeScript, TailwindCSS v4, shadcn/ui가 포함된 모던 웹 개발을 위한
            완벽한 시작점입니다.
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/dashboard">
                시작하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">자세히 알아보기</Link>
            </Button>
          </div>
        </section>

        {/* 기능 섹션 */}
        <section className="container py-12">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary" />
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
