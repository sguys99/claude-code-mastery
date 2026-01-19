"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// next-themes Provider 래퍼 컴포넌트
// 다크모드 지원을 위한 클라이언트 컴포넌트
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
