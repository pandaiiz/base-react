import { request, type RequestOptions } from '@/utils/request'

/** 获取员工列表 GET /api/relationship/employee */
export async function relationshipEmployeeList(
  params: API.DictTypeListParams,
  options?: RequestOptions
) {
  return request<API.DictTypeEntity[]>('/relationship/employee', {
    method: 'GET',
    params,
    ...(options || {})
  })
}

/** 新增员工 POST /api/relationship/employee */
export async function relationshipEmployeeCreate(body: API.DictTypeDto, options?: RequestOptions) {
  return request<any>('/relationship/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || { successMsg: '创建成功' })
  })
}

/** 查询员工信息 GET /api/relationship/employee/${param0} */
export async function relationshipEmployeeInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeInfoParams,
  options?: RequestOptions
) {
  const { id, ...queryParams } = params
  return request<API.DictTypeEntity>(`/relationship/employee/${id}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {})
  })
}

/** 更新员工 POST /api/relationship/employee/${param0} */
export async function relationshipEmployeeUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeUpdateParams,
  body: API.DictTypeDto,
  options?: RequestOptions
) {
  const { id, ...queryParams } = params
  return request<any>(`/relationship/employee/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    params: { ...queryParams },
    data: body,
    ...(options || { successMsg: '更新成功' })
  })
}

/** 删除指定的员工 DELETE /api/relationship/employee/${param0} */
export async function relationshipEmployeeDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeDeleteParams,
  options?: RequestOptions
) {
  const { id, ...queryParams } = params
  return request<any>(`/relationship/employee/${id}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || { successMsg: '删除成功' })
  })
}

/** 一次性获取所有的员工(不分页) GET /api/relationship/employee/select-options */
export async function relationshipEmployeeGetAll(options?: RequestOptions) {
  return request<API.DictTypeEntity[]>('/relationship/employee/select-options', {
    method: 'GET',
    ...(options || {})
  })
}
