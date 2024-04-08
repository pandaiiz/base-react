import ReactDOM from 'react-dom/client';
import NiceModal from '@ebay/nice-modal-react';
import './index.css';
import App from '@/App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(

  <NiceModal.Provider>
    <App />
  </NiceModal.Provider>
);
