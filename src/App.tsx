import './App.css';
import { ConfigProvider } from 'antd';
import {  RouterProvider } from 'react-router-dom';
import { routers } from '@/routers';

function App() {
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
