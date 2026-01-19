"use client";

import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bell,
  Check,
  AlertCircle,
  Info,
  Loader2,
  Mail,
  Plus,
  User,
} from "lucide-react";

// 컴포넌트 쇼케이스 페이지
export default function ComponentsPage() {
  return (
    <div className="container py-12 md:py-16">
      <PageHeader
        title="컴포넌트"
        description="스타터킷에 포함된 ShadcnUI 컴포넌트를 확인하세요"
      />

      <div className="mt-12 space-y-12">
        {/* Button 섹션 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Button</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <Button>기본</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  로딩 중
                </Button>
                <Button size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Badge 섹션 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Badge</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <Badge>기본</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Avatar 섹션 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Avatar</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Card 섹션 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Card</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>카드 제목</CardTitle>
                <CardDescription>카드 설명입니다</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  카드 본문 내용이 여기에 들어갑니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <CardTitle>알림</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  새로운 메시지가 3개 있습니다.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary">
              <CardHeader>
                <CardTitle>강조 카드</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  테두리로 강조된 카드입니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Skeleton 섹션 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Skeleton</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Toast 섹션 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Toast (Sonner)</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  onClick={() => toast("기본 알림 메시지입니다")}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  기본 토스트
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.success("작업이 성공적으로 완료되었습니다", {
                      description: "변경사항이 저장되었습니다",
                    })
                  }
                >
                  <Check className="mr-2 h-4 w-4" />
                  성공 토스트
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.error("오류가 발생했습니다", {
                      description: "다시 시도해 주세요",
                    })
                  }
                >
                  <AlertCircle className="mr-2 h-4 w-4" />
                  에러 토스트
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.info("참고 정보입니다", {
                      description: "이 기능은 베타 버전입니다",
                    })
                  }
                >
                  <Info className="mr-2 h-4 w-4" />
                  정보 토스트
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.promise(
                      new Promise((resolve) => setTimeout(resolve, 2000)),
                      {
                        loading: "처리 중...",
                        success: "완료되었습니다!",
                        error: "실패했습니다",
                      }
                    )
                  }
                >
                  <Loader2 className="mr-2 h-4 w-4" />
                  Promise 토스트
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
