import { request, type RequestOptions } from '@/utils/request'

/** 获取供应商类型列表 GET /api/relationship/material */
export async function relationshipMaterialList(
  params: API.DictTypeListParams,
  options?: RequestOptions
) {
  return request<API.DictTypeEntity[]>('/relationship/material', {
    method: 'GET',
    params,
    ...(options || {})
  })
}

/** 新增供应商类型 POST /api/relationship/material */
export async function relationshipMaterialCreate(body: API.DictTypeDto, options?: RequestOptions) {
  return request<any>('/relationship/material', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || { successMsg: '创建成功' })
  })
}

/** 查询供应商类型信息 GET /api/relationship/material/${param0} */
export async function relationshipMaterialInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeInfoParams,
  options?: RequestOptions
) {
  const { id, ...queryParams } = params
  return request<API.DictTypeEntity>(`/relationship/material/${id}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {})
  })
}

/** 更新供应商类型 POST /api/relationship/material/${param0} */
export async function relationshipMaterialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeUpdateParams,
  body: API.DictTypeDto,
  options?: RequestOptions
) {
  const { id, ...queryParams } = params
  return request<any>(`/relationship/material/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    params: { ...queryParams },
    data: body,
    ...(options || { successMsg: '更新成功' })
  })
}

/** 删除指定的供应商类型 DELETE /api/relationship/material/${param0} */
export async function relationshipMaterialDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeDeleteParams,
  options?: RequestOptions
) {
  const { id, ...queryParams } = params
  return request<any>(`/relationship/material/${id}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || { successMsg: '删除成功' })
  })
}

/** 一次性获取所有的供应商类型(不分页) GET /api/relationship/material/select-options */
export async function relationshipMaterialGetAll(options?: RequestOptions) {
  return request<API.DictTypeEntity[]>('/relationship/material/select-options', {
    method: 'GET',
    ...(options || {})
  })
}
