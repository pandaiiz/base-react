// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type ImportReactFileType = typeof import('*.tsx');
type ImportReactFileFnType = () => Promise<ImportReactFileType>;

// auto load
const modulesFiles = import.meta.glob<ImportReactFileType>('../../pages/**/*.tsx');
// console.log('modulesFiles', modulesFiles);

declare type Recordable<T = any> = Record<string, T>;


// generate components map
export const asyncRoutes = Object.entries(modulesFiles).reduce((routes, [url, importFn]) => {
  if (!/\/(pages\/login|components)\//.test(url)) {
    const path = url.replace('../../pages/', '').replace('.tsx', '');
    routes[path] = importFn;
  }

  return routes;
}, {} as Recordable<ImportReactFileFnType>);
// }, {} as Recordable<ImportReactFileFnType>);

// console.log('asyncRoutes', asyncRoutes);
