// import Layout from '@/components/layout/main-layout';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
const Layout = lazy(() => import('../../components/layout/main-layout'));
const Home = lazy(() => import('../../pages/home/page'));
const About = lazy(() => import('../../pages/about/page'));
const LoginPage = lazy(() => import('../../pages/auth/login'));
const NotFoundPage = lazy(() => import('../../pages/errors/not-found'));

const routes = createBrowserRouter(
  [
    {
      element: <Layout />,
      path: '/',
      children: [
        {
          index: true,
          Component: Home,
        },
        {
          path: 'about',
          children: [
            {
              index: true,
              Component: About,
            },
            {
              path: 'profile',
              element: <div>profile</div>,
            },
          ],
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    // {
    // 	path: "sign-up",
    // 	element: <SignUpPage />,
    // },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ],
  {
    basename: '/admin',
  },
);
export default routes;
