import { request, type RequestOptions } from '@/utils/request'

/** 获取员工列表 GET /api/io/order */
export async function ioOrderList(params: API.DictTypeListParams, options?: RequestOptions) {
  return request<API.DictTypeEntity[]>('/io/order', {
    method: 'GET',
    params,
    ...(options || {})
  })
}

/** 新增员工 POST /api/io/order */
export async function ioOrderCreate(body: API.DictTypeDto, options?: RequestOptions) {
  return request<any>('/io/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || { successMsg: '创建成功' })
  })
}

/** 查询员工信息 GET /api/io/order/${param0} */
export async function ioOrderInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeInfoParams,
  options?: RequestOptions
) {
  const { id, ...queryParams } = params
  return request<API.DictTypeEntity>(`/io/order/${id}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {})
  })
}

/** 更新员工 POST /api/io/order/${param0} */
export async function ioOrderUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeUpdateParams,
  body: API.DictTypeDto,
  options?: RequestOptions
) {
  const { id, ...queryParams } = params
  return request<any>(`/io/order/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    params: { ...queryParams },
    data: body,
    ...(options || { successMsg: '更新成功' })
  })
}

/** 删除指定的员工 DELETE /api/io/order/${param0} */
export async function ioOrderDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeDeleteParams,
  options?: RequestOptions
) {
  const { id, ...queryParams } = params
  return request<any>(`/io/order/${id}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || { successMsg: '删除成功' })
  })
}
