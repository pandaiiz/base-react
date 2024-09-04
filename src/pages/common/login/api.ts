import request, { RequestOptions } from '@/utils/request2'

export async function accountInfo() {
  return request.get<API.AccountInfo>('/account/profile')
}

export async function login(body: API.LoginDto, options?: RequestOptions) {
  return request.post<API.LoginToken>('/auth/login', body, options)
}
/** 获取菜单列表 GET /api/account/menus */
export async function accountMenus() {
  return request.get<MenuItem[]>('/account/menus')
}
/** 获取权限列表 GET /api/account/permissions */
export async function accountPermissions() {
  return request.get<string[]>('/account/permissions')
}

/** 账户登出 GET /api/account/logout */
export async function accountLogout() {
  return request.get<any>('/account/logout')
}
