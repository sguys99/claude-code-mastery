import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/config/navigation";

// 공통 Footer 컴포넌트
export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* 브랜드 섹션 */}
          <div className="col-span-2 md:col-span-1">
            <Logo asLink={false} />
            <p className="mt-4 text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            {/* 소셜 링크 */}
            <div className="mt-4 flex gap-4">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              {siteConfig.links.twitter && (
                <a
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              )}
            </div>
          </div>

          {/* 제품 링크 */}
          <div>
            <h3 className="text-sm font-semibold">제품</h3>
            <ul className="mt-4 space-y-3">
              {footerNav.product.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 회사 링크 */}
          <div>
            <h3 className="text-sm font-semibold">회사</h3>
            <ul className="mt-4 space-y-3">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 법률 링크 */}
          <div>
            <h3 className="text-sm font-semibold">법률</h3>
            <ul className="mt-4 space-y-3">
              {footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* 저작권 */}
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
