import { request } from '@/utils/request'

/** 获取报表 GET /api/relationship/tool/report */
export async function createDictItemByDictCode(data?: any) {
  return request<any>('/system/dict-item/create-by-dict-code', {
    method: 'POST',
    data
  })
}
