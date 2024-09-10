export type ToolEntity = {
  dept: any
  operationType: number
  /** 刀具ID */
  id: number
  /** 刀具名称 */
  name: string
  /** 供应商 */
  supplier: any
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
  /** 创建人 */
  creator: any
  tableType: any
}

export type ToolListParams = ToolEntity & {
  /** 页码 */
  page?: number
  /** 每页数量 */
  pageSize?: number
}

export type ToolDto = Partial<ToolEntity>
