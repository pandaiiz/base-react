import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'
import { ResultEnum } from '@/enums/httpEnum'
import { useSystemStore } from '@/stores/system.store'

// 定义请求选项接口
export interface RequestOptions extends AxiosRequestConfig {
  showSuccessMessage?: boolean
  showErrorMessage?: boolean
}

// 创建axios实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = useSystemStore.getState().token
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    if (data.code !== ResultEnum.SUCCESS) {
      message.error(data.message || '未知错误')
      return Promise.reject(data)
    }
    return data
  },
  (error) => {
    message.error(error.message || '请求失败')
    return Promise.reject(error)
  }
)

// 封装请求函数
const request = {
  async get<T = any>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request(url, { ...options, method: 'GET' })
  },

  async post<T = any>(url: string, data?: any, options: RequestOptions = {}): Promise<T> {
    return this.request(url, { ...options, method: 'POST', data })
  },

  async put<T = any>(url: string, data?: any, options: RequestOptions = {}): Promise<T> {
    return this.request(url, { ...options, method: 'PUT', data })
  },

  async delete<T = any>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request(url, { ...options, method: 'DELETE' })
  },

  async request<T = any>(url: string, options: RequestOptions = {}): Promise<T> {
    try {
      const response = await instance(url, options)
      if (options.showSuccessMessage) {
        message.success('操作成功')
      }
      return response.data
    } catch (error) {
      if (options.showErrorMessage) {
        message.error('操作失败')
      }
      throw error
    }
  }
}

export default request
