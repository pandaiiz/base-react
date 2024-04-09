// 这个主要是路由表组件的写法
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Layout from '@/pages/common/layout';
import Login from '@/pages/common/login';
import ErrorPage from '@/pages/common/error-page';

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
// 直接暴露成一个组件调用
// export default BaseRoutes
export const routers = createBrowserRouter(BaseRoutes);

