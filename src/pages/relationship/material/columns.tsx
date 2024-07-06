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
    title: '供应商名称',
    dataIndex: 'name'
  },
  {
    title: '供应商编码',
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
