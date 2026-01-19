import Link from "next/link";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

interface LogoProps {
  // 링크 비활성화 여부 (푸터에서 사용 시)
  asLink?: boolean;
}

// 사이트 로고 컴포넌트
export function Logo({ asLink = true }: LogoProps) {
  const content = (
    <span className="flex items-center gap-2">
      <Sparkles className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold">{siteConfig.name}</span>
    </span>
  );

  if (!asLink) {
    return content;
  }

  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      {content}
    </Link>
  );
}
