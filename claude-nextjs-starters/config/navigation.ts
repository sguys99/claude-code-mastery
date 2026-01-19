import type { NavItem } from "@/types";

// 메인 네비게이션 메뉴
export const mainNav: NavItem[] = [
  {
    title: "홈",
    href: "/",
  },
  {
    title: "소개",
    href: "/about",
  },
  {
    title: "컴포넌트",
    href: "/components",
  },
];

// 푸터 네비게이션
export const footerNav = {
  // 제품/서비스 관련 링크
  product: [
    { title: "기능", href: "/features" },
    { title: "가격", href: "/pricing" },
  ] as NavItem[],
  // 회사/정보 관련 링크
  company: [
    { title: "소개", href: "/about" },
    { title: "연락처", href: "/contact" },
  ] as NavItem[],
  // 법률/정책 관련 링크
  legal: [
    { title: "개인정보처리방침", href: "/privacy" },
    { title: "이용약관", href: "/terms" },
  ] as NavItem[],
};
