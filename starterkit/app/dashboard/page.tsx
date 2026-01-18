"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// 대시보드 샘플 페이지 컴포넌트
export default function DashboardPage() {
  // 토스트 알림 핸들러
  const handleShowToast = () => {
    toast.success("알림 테스트", {
      description: "shadcn/ui sonner 컴포넌트가 정상 작동합니다!",
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 py-12">
        <h1 className="text-3xl font-bold">대시보드</h1>
        <p className="mt-2 text-muted-foreground">
          shadcn/ui 컴포넌트 데모 페이지입니다.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* 입력 폼 카드 */}
          <Card>
            <CardHeader>
              <CardTitle>입력 폼</CardTitle>
              <CardDescription>
                Input과 Label 컴포넌트 데모입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input id="name" placeholder="이름을 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* 버튼 데모 카드 */}
          <Card>
            <CardHeader>
              <CardTitle>버튼 스타일</CardTitle>
              <CardDescription>
                다양한 버튼 variant 데모입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button>기본</Button>
              <Button variant="secondary">세컨더리</Button>
              <Button variant="outline">아웃라인</Button>
              <Button variant="ghost">고스트</Button>
              <Button variant="destructive">삭제</Button>
            </CardContent>
          </Card>

          {/* 토스트 데모 카드 */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>토스트 알림</CardTitle>
              <CardDescription>
                Sonner 토스트 컴포넌트 데모입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleShowToast}>토스트 표시</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
