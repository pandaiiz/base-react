import { formatToDateTime } from '@/utils/dateUtil'
import { ProColumns } from '@ant-design/pro-components'
import { Tag } from 'antd'

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
    title: '使用刀具',
    dataIndex: 'useKnifeTool',
    hideInSearch: true,
    render: (_, record) =>
      record.useKnifeTool ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>
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
