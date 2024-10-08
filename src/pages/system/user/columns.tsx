import { formatToDateTime } from '@/utils/dateUtil'
import { ProColumns } from '@ant-design/pro-components'
import { Space, Tag } from 'antd'
export const baseColumns: ProColumns<API.UserEntity>[] = [
  {
    align: 'center',
    title: '用户名',
    width: 120,
    dataIndex: 'username'
  },
  {
    align: 'center',
    title: '呢称',
    width: 120,
    hideInSearch: true,
    dataIndex: 'nickname'
  },
  {
    align: 'center',
    title: '所在部门',
    dataIndex: 'dept',
    hideInSearch: true,
    width: 180,
    render: (_, record) => {
      return <Tag>{record.dept?.name}</Tag>
    }
  },
  {
    align: 'center',
    title: '所属角色',
    dataIndex: 'roleNames',
    hideInSearch: true,
    width: 220,
    render: (_, record) => (
      <Space>
        {record.roles.map((item) => (
          <Tag color={'success'} key={item.id}>
            {item.name}
          </Tag>
        ))}
      </Space>
    )
  },
  {
    align: 'center',
    title: '备注',
    width: 120,
    dataIndex: 'remark'
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
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 120,
    hideInSearch: true,
    render: (_, record) => {
      return formatToDateTime(record.createdAt)
    }
  },
  {
    align: 'center',
    title: '修改时间',
    dataIndex: 'updatedAt',
    width: 120,
    hideInSearch: true,
    render: (_, record) => {
      return formatToDateTime(record.createdAt)
    }
  }
]
