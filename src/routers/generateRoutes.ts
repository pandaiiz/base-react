// 读取所有的页面
import lazyLoad from '@/utils/lazyLoad.tsx';

export const generateRoutes = (routes: any, components: any[]) => {
  return routes.map((route: any) => {
    const { path, component, children } = route;
    const filePath = component && `/${component.replace('/index', '')}`;
    return {
      path,
      element: components[filePath] && lazyLoad(components[filePath]),
      children: children && generateRoutes(children, components)
    };
  });
};