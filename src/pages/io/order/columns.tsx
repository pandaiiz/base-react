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
    title: '收发单号',
    dataIndex: 'orderNumber'
  },
  {
    title: '件数',
    dataIndex: 'quantity'
  },
  {
    title: '单重',
    dataIndex: 'singleWeight'
  },
  {
    title: '总重',
    dataIndex: 'totalWeight'
  },
  {
    title: '状态',
    dataIndex: 'status'
  },
  {
    title: '备注',
    dataIndex: 'remark'
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true,
    width: 160,
    render: (_, record) => formatToDate(record.updatedAt),
    hideInSearch: true
  }
]
