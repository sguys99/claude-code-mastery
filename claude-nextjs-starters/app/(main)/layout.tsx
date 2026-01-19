import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Header/Footer를 포함한 메인 레이아웃
// Route Groups를 활용하여 URL에 영향 없이 레이아웃 분리
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
