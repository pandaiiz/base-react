import { formatToDate } from '@/utils/dateUtil'
import { ProColumns } from '@ant-design/pro-components'

export const baseColumns: ProColumns<API.RoleEntity>[] = [
  {
    align: 'center',
    title: '#',
    dataIndex: 'id',
    width: 55,
    hideInSearch: true
  },
  {
    align: 'center',
    title: '角色名称',
    width: 100,
    dataIndex: 'name'
  },
  {
    align: 'center',
    title: '角色值',
    width: 100,
    dataIndex: 'value'
  },
  {
    align: 'center',
    title: '状态',
    dataIndex: 'status',
    width: 80,
    valueType: 'select',
    valueEnum: {
      0: { text: '禁用', status: 'Error' },
      1: { text: '启用', status: 'Success' }
    }
  },
  {
    align: 'center',
    title: '备注',
    dataIndex: 'remark',
    hideInSearch: true
  },
  {
    align: 'center',
    title: '创建时间',
    dataIndex: 'createdAt',
    hideInSearch: true,
    render: (_, record) => {
      return formatToDate(record.createdAt)
    }
  },
  {
    align: 'center',
    title: '更新时间',
    dataIndex: 'updatedAt',
    hideInSearch: true,
    render: (_, record) => {
      return formatToDate(record.updatedAt)
    }
  }
]
