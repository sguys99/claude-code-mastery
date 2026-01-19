"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// 공통 Header 컴포넌트
// 반응형 네비게이션 및 다크모드 토글 포함
export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* 로고 */}
        <Logo />

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center gap-6">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* 우측 액션 버튼들 */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex h-9 w-9"
            asChild
          >
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <ThemeToggle />
          {/* 모바일 네비게이션 */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
