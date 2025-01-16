import { cn } from '@/lib/utils';
import { Outlet, ScrollRestoration } from 'react-router';
import NavBar from './nav-bar';
import { SideBar } from './side-bar';
import { Suspense } from 'react';
import { LoadingPage } from '../ui/loading-page';

export default function Layout() {
  return (
    <div className={cn('flex flex-col h-svh  relative overflow-scroll ')}>
      <div className="hidden md:block">
        <NavBar />
      </div>
      <div className=" md:hidden">
        <SideBar />
      </div>
      <main className="grid h-full max-h-full overflow-scroll flex-1 items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8">
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </main>
      <ScrollRestoration />
    </div>
  );
}
