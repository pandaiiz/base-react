import './App.css';
import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { routers } from '@/routers';
import { useEffect } from 'react';
import { usePermissionStore } from '@/stores/user.store.ts';
import { generateRoutes } from '@/routers/generateRoutes.ts';
import lazyLoad from '@/utils/lazyLoad.tsx';

const modules = import.meta.glob('./pages/**/index.tsx');
const components = Object.keys(modules).reduce<Record<string, any>>((prev, cur) => {
  prev[
    cur
      .replace('./pages', '')
      .replace('/index.tsx', '')
    ] = modules[cur];
  return prev;
}, {}) as any;

function App() {
  const { menus } = usePermissionStore((state) => ({
    menus: state.menus
  }));

  useEffect(() => {
    routers.routes[0].children = [
      { index: true, element: lazyLoad(() => import('@/pages/home')) },
      ...generateRoutes(menus, components)];
  }, [menus]);


  return (
    <ConfigProvider
      theme={
        {
          // 1. 单独使用暗色算法
          // algorithm: theme.darkAlgorithm,
          // 2. 组合使用暗色算法与紧凑算法
          // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        }
      }
    >
      <RouterProvider router={routers} />
    </ConfigProvider>
  );
}

export default App;
