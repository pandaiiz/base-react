import { lazy, Suspense } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
// 自定义懒加载函数
export default (factory: () => Promise<any>) => {
  const Module = lazy(factory);
  return (
    <Suspense fallback={<LoadingOutlined />}>
      <Module />
    </Suspense>
  );
};