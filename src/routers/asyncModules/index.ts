const modulesFiles = import.meta.glob('../../pages/**/*.tsx');
declare type Recordable<T = any> = Record<string, T>;

export const asyncRoutes = Object.entries(modulesFiles).reduce((routes, [url, importFn]) => {
  if (!/\/(pages\/login|components)\//.test(url)) {
    const path = url.replace('../../pages/', '').replace('.tsx', '');
    routes[path] = importFn;
  }
  return routes;
}, {} as Recordable);
