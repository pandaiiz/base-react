import { ConfigProvider } from 'antd'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import useRouters from '@/routers'
import { App as AntdApp } from 'antd'
import NiceModal from '@ebay/nice-modal-react'

function App() {
  const routers = useRouters()
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
      <AntdApp>
        <NiceModal.Provider>
          <RouterProvider router={createBrowserRouter(routers)} />
        </NiceModal.Provider>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
