import { formatToDate } from '@/utils/dateUtil'
import { ProColumns } from '@ant-design/pro-components'
import { Tag } from 'antd'
import { dictTypeGetAll } from '@/api/backend/api/systemDictType.ts'

export const baseColumns: ProColumns[] = [
  {
    title: '字典名称',
    dataIndex: 'typeId',
    hideInTable: true,
    valueType: 'select',
    request: () => dictTypeGetAll(),
    fieldProps: {
      disabled: true,
      fieldNames: {
        value: 'id',
        label: 'name'
      },
      showSearch: true
    }
  },
  {
    title: '字典项键名',
    dataIndex: 'label'
  },
  {
    title: '字典项值',
    dataIndex: 'value'
  },
  {
    title: '排序',
    dataIndex: 'sort',
    sorter: true,
    hideInSearch: true
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
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
