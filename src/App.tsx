import './App.css';
import { ConfigProvider } from 'antd';
import Routes from '@/routers';
import { BrowserRouter } from 'react-router-dom';

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
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
