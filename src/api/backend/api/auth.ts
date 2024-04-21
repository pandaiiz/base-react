import { request, type RequestOptions } from '@/utils/request'

/** 登录 POST /auth/login */
export async function authLogin(body: API.LoginDto, options?: RequestOptions) {
  return request<API.LoginToken>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 注册 POST /auth/register */
export async function authRegister(body: API.RegisterDto, options?: RequestOptions) {
  return request<any>('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}
