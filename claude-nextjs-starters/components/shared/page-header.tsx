import type { PageHeaderProps } from "@/types";

// 페이지 헤더 컴포넌트
// 페이지 상단에 제목과 설명을 표시
export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
