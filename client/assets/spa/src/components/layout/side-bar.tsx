import { LogOut, Menu, MoonIcon, SunDim } from 'lucide-react';
import { Button, buttonVariants } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { navItems } from '../../lib/config/nav-items';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavLink, useNavigate } from 'react-router';
import { cn } from '../../lib/utils';
import { useAuth } from '../../lib/stores/auth';
import { useTheme } from 'next-themes';
import { logout } from '../../lib/api/auth';
import { useQueryClient } from '@tanstack/react-query';

export const SideBar = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const client = useQueryClient();
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center px-4 justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              title="open menu"
              variant="outline"
              className="sm:hidden"
            >
              <Menu className="z-5" />
              <span className="sr-only">open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent title="side menu" side="left" className="sm:max-w-xs">
            <NavigationMenu.Root>
              <NavigationMenu.List className="flex flex-col items-start w-full  gap-6 text-lg font-medium">
                {navItems.map((item) => {
                  if (item?.role && item?.role !== user.role) return <></>;
                  return (
                    <NavigationMenu.Item key={item.title} className="w-full">
                      <NavigationMenu.Link
                        // asChild
                        asChild
                        className="flex items-center justify-start gap-2	"
                      >
                        <div className="">
                          <NavLink
                            to={item.href}
                            className={({ isActive }) => {
                              return cn(
                                isActive
                                  ? buttonVariants({
                                      className:
                                        'text-background font-bold text-xl',
                                    })
                                  : '',
                                'capitalize flex justify-start  w-full items-center gap-2',
                              );
                            }}
                          >
                            {item.icon}
                            <div>{item.title}</div>
                          </NavLink>
                        </div>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  );
                })}
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </SheetContent>
        </Sheet>
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
      </header>
    </div>
  );
};
