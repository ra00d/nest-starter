import Layout from '../../components/layout/main-layout';
import About from '../../pages/about/page';
import LoginPage from '../../pages/auth/login';
import NotFoundPage from '../../pages/errors/not-found';
// import Home from "@/pages/home/page";
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
const Home = lazy(() => import('../../pages/home/page'));

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
          Component: About,
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
