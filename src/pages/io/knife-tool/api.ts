import { request } from '@/utils/request'

/** 获取报表 GET /api/relationship/tool/report */
export async function getToolReport(params?: any) {
  return request<any>('/relationship/tool/report', {
    method: 'GET',
    params
  })
}
