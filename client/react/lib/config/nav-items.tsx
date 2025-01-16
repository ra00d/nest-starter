import { HomeIcon, InfoIcon, User } from 'lucide-react';
import { ReactNode } from 'react';

export type TNavItem = {
  href: string;
  title: string;
  icon: ReactNode;
  role?: 'USER' | 'ADMIN';
};
export const navItems: TNavItem[] = [
  {
    href: '/',
    title: 'home',
    icon: <HomeIcon />,
  },
  {
    href: '/about',
    title: 'about',
    icon: <InfoIcon />,
  },
];
