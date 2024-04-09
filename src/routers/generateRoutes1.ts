import lazyLoad from '@/utils/lazyLoad.tsx';

const routes = [
  { index: true, element: lazyLoad(() => import('@/pages/home')) },
  {
    path: 'system',
    children: [
      { path: 'user', element: lazyLoad(() => import('@/pages/system/user')) },
      { path: 'role', element: lazyLoad(() => import('@/pages/system/role')) },
      { path: 'menu', element: lazyLoad(() => import('@/pages/system/menu')) }
    ]
  },
  {
    path: 'netdisk',
    children: [{ path: 'manage', element: lazyLoad(() => import('@/pages/netdisk/manage')) }]
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
// 直接暴露成一个组件调用
export default routes

