import { request, type RequestOptions } from '@/utils/request'

/** 获取客户类型列表 GET /api/relationship/customer */
export async function relationshipCustomerList(
  params: API.DictTypeListParams,
  options?: RequestOptions
) {
  return request<API.DictTypeEntity[]>('/relationship/customer', {
    method: 'GET',
    params,
    ...(options || {})
  })
}

/** 新增客户类型 POST /api/relationship/customer */
export async function relationshipCustomerCreate(body: API.DictTypeDto, options?: RequestOptions) {
  return request<any>('/relationship/customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || { successMsg: '创建成功' })
  })
}

/** 查询客户类型信息 GET /api/relationship/customer/${param0} */
export async function relationshipCustomerInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeInfoParams,
  options?: RequestOptions
) {
  const { id, ...queryParams } = params
  return request<API.DictTypeEntity>(`/relationship/customer/${id}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {})
  })
}

/** 更新客户类型 POST /api/relationship/customer/${param0} */
export async function relationshipCustomerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeUpdateParams,
  body: API.DictTypeDto,
  options?: RequestOptions
) {
  const { id, ...queryParams } = params
  return request<any>(`/relationship/customer/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    params: { ...queryParams },
    data: body,
    ...(options || { successMsg: '更新成功' })
  })
}

/** 删除指定的客户类型 DELETE /api/relationship/customer/${param0} */
export async function relationshipCustomerDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeDeleteParams,
  options?: RequestOptions
) {
  const { id, ...queryParams } = params
  return request<any>(`/relationship/customer/${id}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || { successMsg: '删除成功' })
  })
}

/** 一次性获取所有的客户类型(不分页) GET /api/relationship/customer/select-options */
export async function relationshipCustomerGetAll(options?: RequestOptions) {
  return request<API.DictTypeEntity[]>('/relationship/customer/select-options', {
    method: 'GET',
    ...(options || {})
  })
}
