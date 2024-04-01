// 这个主要是路由表组件的写法
import { Suspense, lazy, LazyExoticComponent } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
// 声明类型
export type Routes = {
  path: string,
  component: LazyExoticComponent<any>,
  children?: Routes[]
}
const RouteTable: Routes[] = [
  {
    path: '/',
    component: lazy(() => import('@/pages/common/layout')),
    children: [
      {
        path: 'welcome',
        component: lazy(() => import('@/pages/welcome')),
        children: [
          {
            path: 'test',
            component: lazy(() => import('@/pages/test'))
          }
        ]
      },
      {
        path: 'dashboard',
        component: lazy(() => import('@/pages/dashboard')),
      },
      {
        path: 'test',
        component: lazy(() => import('@/pages/test')),
      }
    ]
  }
];

const syncRouter = (table: Routes[]): RouteObject[] => {
  const mRouteTable: RouteObject[] = [];
  table.forEach(route => {
    mRouteTable.push({
      path: route.path,
      element: (
        <Suspense fallback={<div>路由加载ing...</div>}>
          <route.component />
        </Suspense>
      ),
      children: route.children && syncRouter(route.children)
    });
  });
  return mRouteTable;
};

// 直接暴露成一个组件调用
export default () => useRoutes(syncRouter(RouteTable))

