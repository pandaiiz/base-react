// 读取所有的页面
import lazyLoad from '@/utils/lazyLoad.tsx';

const modules = import.meta.glob('../pages/**/index.tsx');
const components = Object.keys(modules).reduce<Record<string, any>>((prev, cur) => {
  prev[
    cur
      .replace('./pages', '')
      .replace('/index.tsx', '')
    ] = modules[cur];
  return prev;
}, {}) as any;
export const generateRoutes = (routes: any) => {
  return routes.map((route: any) => {
    const { path, component, children } = route;
    const filePath = component && `./${component.replace('/index', '')}`;
    return {
      path,
      element: components[filePath] && lazyLoad(components[filePath]),
      children: children && generateRoutes(children)
    };
  });
};