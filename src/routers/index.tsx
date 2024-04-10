// 这个主要是路由表组件的写法
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Layout from '@/pages/common/layout';
import Login from '@/pages/common/login';
import ErrorPage from '@/pages/common/error-page';
import { usePermissionStore } from '@/stores/user.store.ts';
import lazyLoad from '@/utils/lazyLoad.tsx';
import { generateRoutes } from '@/routers/generateRoutes.ts';

const BaseRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: []
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
];

const mergeRouters = () => {
  const menus = usePermissionStore.getState().menus;
  BaseRoutes[0].children = [
    { index: true, element: lazyLoad(() => import('@/pages/home')) },
    ...generateRoutes(menus)];
  return BaseRoutes;
};
export const routers = createBrowserRouter(mergeRouters());

