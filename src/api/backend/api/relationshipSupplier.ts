import { request, type RequestOptions } from '@/utils/request'

/** 获取供应商类型列表 GET /api/relationship/supplier */
export async function relationshipSupplierList(
  params: API.DictTypeListParams,
  options?: RequestOptions
) {
  return request<API.DictTypeEntity[]>('/relationship/supplier', {
    method: 'GET',
    params,
    ...(options || {})
  })
}

/** 新增供应商类型 POST /api/relationship/supplier */
export async function relationshipSupplierCreate(body: API.DictTypeDto, options?: RequestOptions) {
  return request<any>('/relationship/supplier', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || { successMsg: '创建成功' })
  })
}

/** 查询供应商类型信息 GET /api/relationship/supplier/${param0} */
export async function relationshipSupplierInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeInfoParams,
  options?: RequestOptions
) {
  const { id, ...queryParams } = params
  return request<API.DictTypeEntity>(`/relationship/supplier/${id}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {})
  })
}

/** 更新供应商类型 POST /api/relationship/supplier/${param0} */
export async function relationshipSupplierUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeUpdateParams,
  body: API.DictTypeDto,
  options?: RequestOptions
) {
  const { id, ...queryParams } = params
  return request<any>(`/relationship/supplier/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    params: { ...queryParams },
    data: body,
    ...(options || { successMsg: '更新成功' })
  })
}

/** 删除指定的供应商类型 DELETE /api/relationship/supplier/${param0} */
export async function relationshipSupplierDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeDeleteParams,
  options?: RequestOptions
) {
  const { id, ...queryParams } = params
  return request<any>(`/relationship/supplier/${id}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || { successMsg: '删除成功' })
  })
}

/** 一次性获取所有的供应商类型(不分页) GET /api/relationship/supplier/select-options */
export async function relationshipSupplierGetAll(options?: RequestOptions) {
  return request<API.DictTypeEntity[]>('/relationship/supplier/select-options', {
    method: 'GET',
    ...(options || {})
  })
}
