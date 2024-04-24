// 读取所有的页面
import lazyLoad from '@/utils/lazyLoad.tsx'
import { Navigate } from 'react-router-dom'

/* 0: 目录
   1: 菜单
   2: 权限 */
const modules = import.meta.glob('../pages/**/index.tsx')
const components = Object.keys(modules).reduce<Record<string, any>>((prev, cur) => {
  prev[cur.replace('./pages', '').replace('/index.tsx', '')] = modules[cur]
  return prev
}, {}) as any
/* export const generateRoutes = (routes: any) => {
  return routes.map((route: any) => {
    const { path, component, children, meta } = route
    console.log('🚀 ~ returnroutes.map ~ meta:', meta.type)
    const filePath = component && `./${component.replace('/index', '')}`
    return {
      path,
      element: components[filePath] && lazyLoad(components[filePath]),
      children: children && generateRoutes(children)
    }
  })
} */

export const generateRoutes = (routes: any) => {
  const list: any[] = []
  routes.forEach((route: any) => {
    const { path, component, children, meta } = route
    const filePath = component && `./${component.replace('/index', '')}`
    // 目录，添加重定向到第一个子菜单
    if (meta.type === 0) {
      list.push(
        { path, element: <Navigate to="/system/user" /> },
        {
          path,
          element: components[filePath] && lazyLoad(components[filePath]),
          children: children && generateRoutes(children)
        }
      )
    } else {
      list.push({
        path,
        element: components[filePath] && lazyLoad(components[filePath]),
        children: children && generateRoutes(children)
      })
    }
  })

  return list
}
