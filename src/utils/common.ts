import dayjs from 'dayjs'
import { RequestOptions, request } from './request'

/**
 * @description 处理首字母大写 abc => Abc
 * @param str
 */
export const changeStr = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * @description 随机生成颜色
 * @param {string} type
 * @return {string}
 */
export const randomColor = (type: 'rgb' | 'hex' | 'hsl'): string => {
  switch (type) {
    case 'rgb':
      return window.crypto.getRandomValues(new Uint8Array(3)).toString()
    case 'hex':
      return `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, `${Math.random() * 10}`)}`
    case 'hsl':
      // 在25-95%范围内具有饱和度，在85-95%范围内具有亮度
      return [360 * Math.random(), `${100 * Math.random()}%`, `${100 * Math.random()}%`].toString()
  }
}

/**
 * 复制文本
 * @param text
 */
export const copyText = (text: string) => {
  const copyInput = document.createElement('input') //创建一个input框获取需要复制的文本内容
  copyInput.value = text
  document.body.appendChild(copyInput)
  copyInput.select()
  document.execCommand('copy')
  copyInput.remove()
}

/**
 * @description 判断字符串是否是base64
 * @param {string} str
 */
export const isBase64 = (str: string): boolean => {
  if (str === '' || str.trim() === '') {
    return false
  }
  try {
    return btoa(atob(str)) == str
  } catch (err) {
    return false
  }
}
// 对象转JSON
export const toJSON = (obj: any) => {
  return JSON.stringify(obj, (_, value) => {
    switch (true) {
      case typeof value === 'undefined':
        return 'undefined'
      case typeof value === 'symbol':
        return value.toString()
      case typeof value === 'function':
        return value.toString()
      default:
        break
    }
    return value
  })
}

/***
 * @description 是否是生产环境
 */
export const IS_PROD = import.meta.env.PROD
export const IS_DEV = import.meta.env.DEV

/***
 * @description 格式化日期
 * @param time
 */
export const formatDate = (time: string | number | Date | dayjs.Dayjs | null | undefined) =>
  dayjs(time).format('YYYY-MM-DD HH:mm:ss')

/**
 *  @description 将一维数组转成树形结构数据
 * @param items
 * @param id
 * @param link
 */
/* export const generateTree = (items: any[], id = 0, link = 'parent') => {
  return items
    .filter((item) => item[link] == id)
    .map((item) => ({
      ...item,
      slots: { title: 'name' },
      children: generateTree(items, item.departmentid),
    }));
}; */

/**
 * / _ - 转换成驼峰并将view替换成空字符串
 * @param {*} name name
 */
export const toHump = (name: string) => {
  return name
    .replace(/[-/_](\w)/g, (_, letter) => {
      return letter.toUpperCase()
    })
    .replace('views', '')
}

export function findPath<T>(
  tree: Record<string, any>[],
  targetId: T,
  field = 'id',
  currentPath: T[] = []
): T[] | null {
  // 遍历树中的每个节点
  for (const node of tree) {
    // 将当前节点的 ID 添加到路径中
    const path = [...currentPath, node[field]]

    // 如果找到目标节点，返回路径
    if (node.id === targetId) {
      return path
    }

    // 如果当前节点有子节点，则递归查找子节点
    if (node.children && node.children.length > 0) {
      const childPath = findPath(node.children, targetId, field, path)
      if (childPath) {
        return childPath
      }
    }
  }

  // 没有找到目标节点，返回 null
  return null
}

export const str2tree = (str: string, treeData: any[] = [], separator = ':') => {
  return str.split(separator).reduce((prev, curr, currentIndex, arr) => {
    const path = arr.slice(0, currentIndex + 1).join(':')
    const index = prev.findIndex((item) => item?.path === path)
    if (index !== -1) {
      return prev[index].children
    } else {
      const item: any = {
        // key: curr,
        path,
        value: curr,
        label: curr,
        children: []
      }
      prev.push(item)
      return item.children!
    }
  }, treeData)
}

/** 通用查询列表函数 GET /api/${path} */
export async function getDataList<T>(
  path: string,
  params?: T & {
    /** 页码 */
    page?: number
    /** 每页数量 */
    pageSize?: number
  },
  options?: RequestOptions
) {
  return request<any>(`/${path}`, {
    method: 'GET',
    params,
    ...(options || {})
  })
}

/** 通用新增函数 POST /api/${path} */
export async function addData<T>(path: string, data: T, options?: RequestOptions) {
  return request<T>(`/${path}`, {
    method: 'POST',
    data,
    ...(options || { successMsg: '新增成功！' })
  })
}

/** 通用修改函数 PUT /api/${path} */
export async function updateData<T>(path: string, data: T, options?: RequestOptions) {
  return request<T>(`/${path}`, {
    method: 'PUT',
    data,
    ...(options || { successMsg: '更新成功！' })
  })
}

/** 通用删除函数 DELETE /api/${path} */
export async function deleteData<T>(path: string, id: string | number, options?: RequestOptions) {
  return request<T>(`/${path}/${id}`, {
    method: 'DELETE',
    ...(options || { successMsg: '删除成功！' })
  })
}
