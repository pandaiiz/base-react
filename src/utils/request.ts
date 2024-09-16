import axios, { CanceledError } from 'axios'
import { message as $message } from 'antd'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResultEnum } from '@/enums/httpEnum'
import { isString } from 'lodash'
import { useSystemStore } from '@/stores/system.store'

export interface RequestOptions extends AxiosRequestConfig {
  isReturnResult?: boolean
  successMsg?: string
  errorMsg?: string
  showSuccessMsg?: boolean
  showErrorMsg?: boolean
  requestType?: 'json' | 'form'
}

const UNKNOWN_ERROR = '未知错误，请重试'
const baseApiUrl = import.meta.env.VITE_BASE_API_URL

const service = axios.create({
  baseURL: baseApiUrl,
  timeout: 10000
})

service.interceptors.request.use(
  (config) => {
    const token = useSystemStore.getState().token
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

service.interceptors.response.use(
  (response: AxiosResponse<BaseResponse>) => {
    const { data: res } = response
    if (res.code !== ResultEnum.SUCCESS) {
      $message.open({
        content: res.message || UNKNOWN_ERROR,
        type: 'error'
      })
      if ([1101, 1105].includes(res.code)) {
        useSystemStore.getState().logout()
        window.location.href = '/login'
        /* Modal.confirm({
          title: '警告',
          content: res.message || '账号异常，您可以取消停留在该页上，或重新登录',
          okText: '重新登录',
          cancelText: '取消',
          onOk: () => {
            useSystemStore.getState().logout()
            window.location.href = '/login'
          }
        }) */
      }
      const error = new Error(res.message || UNKNOWN_ERROR) as Error & { code: any }
      error.code = res.code
      return Promise.reject(error)
    }

    return response
  },
  (error) => {
    if (!(error instanceof CanceledError)) {
      const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR

      $message.open({
        content: errMsg,
        key: errMsg,
        type: 'error'
      })
      error.message = errMsg
      if (error.response?.status === 401) {
        localStorage.clear()
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

type BaseResponse<T = any> = Omit<API.ResOp, 'data'> & { data: T }

export function request<T = any>(
  url: string,
  config: { isReturnResult: false } & RequestOptions
): Promise<BaseResponse<T>>
export function request<T = any>(
  url: string,
  config: RequestOptions
): Promise<BaseResponse<T>['data']>
export function request<T = any>(
  config: { isReturnResult: false } & RequestOptions
): Promise<BaseResponse<T>>
export function request<T = any>(config: RequestOptions): Promise<BaseResponse<T>['data']>

export async function request(_url: string | RequestOptions, _config: RequestOptions = {}) {
  const url = isString(_url) ? _url : _url.url
  const config = isString(_url) ? _config : _url
  try {
    const { requestType, isReturnResult = true, ...rest } = config

    const response = (await service.request({
      url,
      ...rest,
      headers: {
        ...rest.headers,
        ...(requestType === 'form' ? { 'Content-Type': 'multipart/form-data' } : {})
      }
    })) as AxiosResponse<BaseResponse>

    const { data } = response
    const { code, message } = data || {}

    if (code === ResultEnum.SUCCESS) {
      const { successMsg, showSuccessMsg } = config
      if (successMsg) {
        $message.open({
          content: successMsg,
          type: 'success'
        })
      } else if (showSuccessMsg && message) {
        $message.open({
          content: message,
          type: 'success'
        })
      }
    }

    return isReturnResult ? data.data : data
  } catch (error: any) {
    return Promise.reject(error)
  }
}
