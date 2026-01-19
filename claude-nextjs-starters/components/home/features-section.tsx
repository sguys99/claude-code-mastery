import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Palette, Zap, Shield, Smartphone, Layers, Package } from "lucide-react";

// 기능 데이터
const features = [
  {
    icon: Zap,
    title: "빠른 개발",
    description:
      "사전 구성된 컴포넌트와 유틸리티로 개발 시간을 단축하세요.",
  },
  {
    icon: Palette,
    title: "다크모드 지원",
    description:
      "시스템 설정을 감지하고 사용자가 직접 테마를 변경할 수 있습니다.",
  },
  {
    icon: Smartphone,
    title: "반응형 디자인",
    description:
      "모바일부터 데스크톱까지 모든 화면 크기에 최적화되어 있습니다.",
  },
  {
    icon: Shield,
    title: "타입 안전성",
    description:
      "TypeScript를 기반으로 안전하고 예측 가능한 코드를 작성하세요.",
  },
  {
    icon: Layers,
    title: "컴포넌트 기반",
    description:
      "Atomic Design 원칙에 따라 재사용 가능한 컴포넌트로 구성되어 있습니다.",
  },
  {
    icon: Package,
    title: "확장 가능",
    description:
      "필요에 따라 ShadcnUI 컴포넌트를 쉽게 추가하고 커스터마이징하세요.",
  },
];

// 기능 소개 섹션 컴포넌트
export function FeaturesSection() {
  return (
    <section className="container py-24 bg-muted/50">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          스타터킷 특징
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          생산성을 높이기 위한 모든 것이 준비되어 있습니다
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="relative overflow-hidden">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
