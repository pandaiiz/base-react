import { formatToDateTime } from '@/utils/dateUtil'
import { ProColumns } from '@ant-design/pro-components'
import { Avatar, Space, Tag } from 'antd'

/* export const baseColumns: ProColumns<API.UserEntity>[] = [
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
] */
const getAvatarUrl = (path: string) => {
  return /^https?:\/\//.test(path) ? path : '' + path
}
export const baseColumns: ProColumns<API.UserEntity>[] = [
  {
    align: 'center',
    title: '头像',
    width: 80,
    dataIndex: 'avatar',
    hideInSearch: true,
    render: (_, record) => <Avatar src={getAvatarUrl(record.avatar)} />
  },
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
    title: '邮箱',
    width: 120,
    dataIndex: 'email'
  },
  {
    align: 'center',
    title: '手机',
    width: 120,
    dataIndex: 'phone'
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
