import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "소개",
  description: "Next.js 스타터킷에 대해 알아보세요",
};

// 기술 스택 데이터
const techStack = [
  { name: "Next.js", version: "16", description: "App Router 프레임워크" },
  { name: "React", version: "19", description: "UI 라이브러리" },
  { name: "TypeScript", version: "5", description: "타입 안전성" },
  { name: "Tailwind CSS", version: "4", description: "유틸리티 CSS" },
  { name: "ShadcnUI", version: "Latest", description: "UI 컴포넌트" },
  { name: "lucide-react", version: "Latest", description: "아이콘" },
  { name: "next-themes", version: "Latest", description: "다크모드" },
  { name: "usehooks-ts", version: "Latest", description: "유틸리티 훅" },
];

// About 페이지
export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16">
      <PageHeader
        title="소개"
        description="모던 웹 개발을 위한 Next.js 스타터킷입니다"
      />

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {/* 스타터킷 소개 */}
        <Card>
          <CardHeader>
            <CardTitle>스타터킷이란?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              이 스타터킷은 모던 웹 애플리케이션을 빠르게 시작할 수 있도록
              설계되었습니다. 최신 기술 스택과 검증된 패턴을 사용하여
              생산성을 극대화합니다.
            </p>
            <p>
              Atomic Design 원칙에 따라 컴포넌트가 구성되어 있으며,
              확장성과 유지보수성을 고려한 폴더 구조를 제공합니다.
            </p>
          </CardContent>
        </Card>

        {/* 주요 기능 */}
        <Card>
          <CardHeader>
            <CardTitle>주요 기능</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>다크모드 지원 (시스템 설정 감지)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>반응형 레이아웃 (모바일 ~ 데스크톱)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>SEO 최적화 메타데이터</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>토스트 알림 시스템</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>TypeScript 타입 안전성</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>ESLint 코드 품질 검사</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* 기술 스택 */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">기술 스택</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((tech) => (
            <Card key={tech.name}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{tech.name}</span>
                  <Badge variant="secondary">{tech.version}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {tech.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
