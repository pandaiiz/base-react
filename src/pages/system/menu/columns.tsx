// import type { TableColumn } from '@/components/core/dynamic-table';
// import { Icon } from '@/components/basic/icon';
import { formatToDateTime } from '@/utils/dateUtil'
import { Tag } from 'antd'
import { ProColumns } from '@ant-design/pro-components'
import IconPicker from '@/components/basic/Icon'

// export type TableListItem = API.MenuItemInfo;
// export type TableColumnItem = TableColumn<TableListItem>;

/**
 * 将对应菜单类型转为字符串字意
 */
const getMenuType = (type: any) => {
  switch (type) {
    case 0:
      return <Tag color="warning">目录</Tag>
    case 1:
      return <Tag color="success">菜单</Tag>
    case 2:
      return <Tag color="error">权限</Tag>
    default:
      return ''
  }
}

export const baseColumns: ProColumns[] = [
  {
    title: '名称',
    dataIndex: 'name',
    fixed: 'left',
    width: 140
  },
  {
    title: '图标',
    width: 40,
    dataIndex: 'icon',
    align: 'center',
    hideInSearch: true,
    render: (_, record) => record.icon && <IconPicker icon={record.icon} size={16} />
  },
  {
    title: '类型',
    width: 80,
    dataIndex: 'type',
    align: 'center',
    hideInSearch: true,
    render: (type) => getMenuType(type)
  },
  {
    title: '节点路由',
    dataIndex: 'path',
    align: 'center',
    width: 180,
    ellipsis: true
  },
  {
    title: '文件路径',
    width: 180,
    dataIndex: 'component',
    align: 'center'
  },
  {
    title: '权限标识',
    width: 180,
    dataIndex: 'permission',
    align: 'center',
    hideInSearch: true,
    render: (permission) => permission && <Tag color="processing">{permission}</Tag>
  },
  {
    title: '排序',
    width: 50,
    dataIndex: 'sort',
    align: 'center',
    hideInSearch: true
  },
  {
    title: '是否显示',
    dataIndex: 'show',
    width: 80,
    align: 'center',
    hideInSearch: true,
    render: (_, record) => {
      const show = record.show
      const enable = ~~show === 1
      const color = enable ? 'green' : 'red'
      const text = enable ? '显示' : '隐藏'
      return <Tag color={color}>{text}</Tag>
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    align: 'center',
    hideInSearch: true,
    render: (_, record) => {
      const status = record.status
      const enable = ~~status === 1
      const color = enable ? 'green' : 'red'
      const text = enable ? '启用' : '停用'
      return <Tag color={color}>{text}</Tag>
    }
  },
  {
    title: '更新时间',
    width: 180,
    align: 'center',
    dataIndex: 'updatedAt',
    hideInSearch: true,
    render(text) {
      return formatToDateTime(text as string)
    }
  }
]
