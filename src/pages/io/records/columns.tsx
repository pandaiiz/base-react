import { formatDate } from '@/utils/common'
import { ProColumns } from '@ant-design/pro-components'

export const baseColumns: ProColumns[] = [
  {
    title: '收发单号',
    dataIndex: 'orderNumber'
  },
  {
    title: '部门',
    dataIndex: 'department'
  },
  {
    title: '收发类型',
    dataIndex: 'ioType'
  },
  {
    title: '状态',
    dataIndex: 'status'
  },
  {
    title: '品名',
    dataIndex: 'category'
  },
  {
    title: '类型',
    dataIndex: 'productType'
  },
  {
    title: '重量',
    dataIndex: 'weight'
  },
  {
    title: '件数',
    dataIndex: 'quantity'
  },
  {
    title: '时间',
    dataIndex: 'createdAt',
    render: (_, record) => {
      return formatDate(record.createdAt)
    }
  },
  {
    title: '备注',
    dataIndex: 'remark'
  }
]
