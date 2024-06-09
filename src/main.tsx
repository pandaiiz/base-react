import ReactDOM from 'react-dom/client'
import NiceModal from '@ebay/nice-modal-react'
import './index.css'
import App from '@/App.tsx'
import { App as AntdApp } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AntdApp>
    <NiceModal.Provider>
      <App />
    </NiceModal.Provider>
  </AntdApp>
)
