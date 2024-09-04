import { RouteObject } from 'react-router-dom'
import Layout from '@/pages/common/layout'
import { Login } from '@/pages/common/login'
import ErrorPage from '@/pages/common/error-page'
import { useSystemStore } from '@/stores/system.store'
import lazyLoad from '@/utils/lazyLoad'
import { generateRoutes } from './generateRoutes'
import { ProtectedRoute } from './ProteectedRoute'

const BaseRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: []
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: (
      <ProtectedRoute>
        <ErrorPage />
      </ProtectedRoute>
    )
  }
]

export default () => {
  const menuList = useSystemStore((state) => state.menuList)
  BaseRoutes[0].children = [
    { index: true, element: lazyLoad(() => import('@/pages/home')) },
    ...generateRoutes(menuList)
  ]
  return BaseRoutes
}
