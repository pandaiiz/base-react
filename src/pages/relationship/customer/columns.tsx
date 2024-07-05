import { formatToDate } from '@/utils/dateUtil'
import { ProColumns } from '@ant-design/pro-components'

export const baseColumns: ProColumns[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 60,
    hideInSearch: true
  },
  {
    title: '客户名称',
    dataIndex: 'name'
  },
  {
    title: '客户编码',
    dataIndex: 'code'
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true,
    width: 160,
    render: (_, record) => formatToDate(record.createdAt),
    hideInSearch: true
  }
]
