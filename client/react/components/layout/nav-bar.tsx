import { navItems } from '@/lib/config/nav-items';
import { useAuth } from '@/lib/stores/auth';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavLink, useNavigate } from 'react-router';
import { Button, buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { LogOut, MoonIcon, SunDim } from 'lucide-react';
import { logout } from '@/lib/api/auth';
import { useQueryClient } from '@tanstack/react-query';

export default function NavBar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const client = useQueryClient();
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="sticky top-0">
        <div className="shadow-md px-4 py-2 sticky top-0  ">
          <div className="flex gap-5 justify-between items-center">
            <h1 className="text-3xl font-bold">
              <strong className="!text-red-500">MY</strong>task
            </h1>
            <div className="flex gap-6 items-center">
              {navItems.map((item) => {
                if (item?.role && item?.role !== user.role) return <></>;
                return (
                  <NavigationMenu.Item key={item.title}>
                    <NavigationMenu.Link
                      // asChild
                      asChild
                      className="flex items-center gap-2	"
                    >
                      <div>
                        <NavLink
                          to={item.href}
                          className={({ isActive }) => {
                            return cn(
                              isActive ? buttonVariants() : 'tw',
                              'capitalize flex items-center gap-2',
                            );
                          }}
                        >
                          <h1>{item.title}</h1>
                          {item.icon}
                        </NavLink>
                      </div>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                );
              })}
            </div>

            <div className="flex gap-2 items-center">
              <Button
                variant={'ghost'}
                size={'icon'}
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                }}
              >
                {theme === 'dark' ? <SunDim /> : <MoonIcon />}
              </Button>
              {user.name}
              <Button
                variant="ghost"
                size={'icon'}
                onClick={async () =>
                  logout().finally(() => {
                    client.invalidateQueries();
                    navigate('/login', {
                      replace: true,
                    });
                  })
                }
              >
                <LogOut />
              </Button>
            </div>
          </div>
        </div>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
