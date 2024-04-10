import './App.css';
import { ConfigProvider } from 'antd';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import useRouters from '@/routers';

function App() {
  const routers = useRouters();
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
      <RouterProvider router={createBrowserRouter(routers)} />
    </ConfigProvider>
  );
}

export default App;
