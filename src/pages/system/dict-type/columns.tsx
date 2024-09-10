import { formatToDate } from '@/utils/dateUtil'
import { ProColumns } from '@ant-design/pro-components'
import { Tag } from 'antd'
import { Link } from 'react-router-dom'

export const baseColumns: ProColumns[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    width: 60,
    hideInSearch: true
  },
  {
    title: '字典名称',
    dataIndex: 'label'
  },
  {
    title: '字典编码',
    dataIndex: 'code',
    render: (_, record) => (
      <Link to={{ pathname: `/system/dict/type/${record.id}` }}>{record.code}</Link>
    )
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    render: (_, record) => {
      const status = record.status
      const enable = ~~status === 1
      const color = enable ? 'green' : 'red'
      const text = enable ? '启用' : '停用'
      return <Tag color={color}>{text}</Tag>
    },
    hideInSearch: true
  },
  {
    title: '备注',
    dataIndex: 'remark',
    hideInSearch: true
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
