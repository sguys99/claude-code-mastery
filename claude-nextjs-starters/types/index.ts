// 네비게이션 아이템 타입
export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

// 사이트 설정 타입
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage?: string;
  links: {
    github: string;
    linkedin?: string;
  };
}

// 레이아웃 Props 타입
export interface LayoutProps {
  children: React.ReactNode;
}

// 페이지 헤더 Props 타입
export interface PageHeaderProps {
  title: string;
  description?: string;
}

// 푸터 네비게이션 설정 타입
export interface FooterNavConfig {
  product: NavItem[];
  company: NavItem[];
  legal: NavItem[];
}
