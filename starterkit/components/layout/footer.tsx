// 푸터 컴포넌트
export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          Next.js v15 스타터 킷.{" "}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          에서 소스 코드를 확인하세요.
        </p>
      </div>
    </footer>
  );
}
