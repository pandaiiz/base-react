import { formatToDateTime } from '@/utils/dateUtil'
import { ProColumns } from '@ant-design/pro-components'

export const baseColumns: ProColumns<API.DeptEntity>[] = [
  {
    title: '部门名称',
    dataIndex: 'name',
    align: 'left'
  },
  {
    title: '排序',
    dataIndex: 'sort',
    hideInSearch: true
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    hideInSearch: true,
    render: (_, record) => formatToDateTime(record.createdAt)
  },
  {
    title: '修改时间',
    dataIndex: 'updatedAt',
    hideInSearch: true,
    render: (_, record) => formatToDateTime(record.updatedAt)
  }
]
