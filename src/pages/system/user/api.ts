import request from '@/utils/request2'

/** 获取用户列表 GET /api/system/users */
export async function userList(params: API.UserListParams) {
  return request.get<{
    list?: API.UserEntity[]
    pagination?: {
      total?: number
      currentPage?: number
      pageSize?: number
    }
  }>('/system/users', {
    params: {
      page: '1',
      pageSize: '10',
      ...params
    }
  })
}

export async function menuList(params?: API.MenuListParams) {
  return request.get<API.MenuItemInfo[]>('/system/menus/list', {
    method: 'GET',
    params: {
      show: 1,
      status: 1,
      ...params
    }
  })
}

/** 新增用户 POST /api/system/users */
export async function userCreate(body: API.UserDto) {
  return request.post<any>('/system/users', {
    data: body
  })
}

/** 查询用户 GET /api/system/users/${param0} */
export async function userRead(params: API.UserReadParams) {
  const { id: param0, ...queryParams } = params
  return request.get<API.UserEntity>(`/system/users/${param0}`, {
    params: { ...queryParams }
  })
}

/** 更新用户 PUT /api/system/users/${param0} */
export async function userUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserUpdateParams,
  body: API.UserUpdateDto
) {
  const { id: param0, ...queryParams } = params
  return request.put<any>(`/system/users/${param0}`, {
    params: { ...queryParams },
    data: body
  })
}
/** 删除用户 DELETE /api/system/users/${param0} */
export async function userDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserDeleteParams
) {
  const { id: param0, ...queryParams } = params
  return request.delete<any>(`/system/users/${param0}`, {
    params: { ...queryParams }
  })
}
