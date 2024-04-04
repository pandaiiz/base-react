// 这个主要是路由表组件的写法
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import lazyLoad from '@/utils/lazyLoad.tsx';
import Layout from '@/pages/common/layout';
import Login from '@/pages/common/login';

const RouteTable: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: lazyLoad(() => import('@/pages/home'))
      },
      {
        path: 'system',
        children: [{
          path: 'user',
          element: lazyLoad(() => import('@/pages/system/user'))
        }, {
          path: 'role',
          element: lazyLoad(() => import('@/pages/system/role'))
        }]
      },
      {
        path: 'netdisk',
        children: [{
          path: 'manage',
          element: lazyLoad(() => import('@/pages/netdisk/manage'))
        }]
      },
      {
        path: 'dashboard',
        element: lazyLoad(() => import('@/pages/dashboard'))
      },
      {
        path: 'test',
        element: lazyLoad(() => import('@/pages/test'))
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
];
// 直接暴露成一个组件调用
export const routers = createBrowserRouter(RouteTable);

