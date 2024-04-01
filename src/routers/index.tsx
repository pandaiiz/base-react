import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/common/layout';
import Login from '../pages/common/login';
import ErrorPage from '../pages/common/error-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
