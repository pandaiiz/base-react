import { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm } from 'antd'
import { baseColumns } from '@/pages/system/role/columns.tsx'
import { useRef } from 'react'
import { useModal } from '@ebay/nice-modal-react'
import RoleModal from '@/pages/system/role/role-modal'
import { Api } from '@/api'
import { roleList } from '@/api/backend/api/systemRole.ts'

const roleCreateOrUpdate = async (modal: any, ref: any, record?: any) => {
  const treeData = await Api.systemMenu.menuList({})
  if (record) {
    const data = await Api.systemRole.roleInfo({ id: record.id })
    await modal.show({ data, treeData, type: 'edit' })
  } else {
    await modal.show({ treeData })
  }
  modal.remove()
  ref.current?.reload()
}

const RoleIndex = () => {
  const modal = useModal(RoleModal)
  const actionRef = useRef<ActionType>()
  const dataSourceRef = useRef<any>()
  const columns: ProColumns<API.RoleEntity>[] = [
    ...baseColumns,
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      align: 'center',
      width: 160,
      fixed: 'right',
      render: (_text, record) => [
        <Button type="link" key="edit" onClick={() => roleCreateOrUpdate(modal, actionRef, record)}>
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          title="确认删除吗？"
          onConfirm={async () => {
            await Api.systemRole.roleDelete({ id: record.id })
            actionRef?.current?.reload()
          }}
        >
          <Button type="link" danger>
            删除
          </Button>
        </Popconfirm>
      ]
    }
  ]

  return (
    <ProTable<API.RoleEntity>
      headerTitle="角色列表"
      onDataSourceChange={(data) => {
        dataSourceRef.current = data
      }}
      columns={columns}
      actionRef={actionRef}
      request={(params) => roleList(params as API.RoleListParams)}
      rowKey="id"
      columnEmptyText={false}
      dateFormatter="string"
      scroll={{ y: 800 }}
      toolBarRender={() => [
        <Button type="primary" key="primary" onClick={() => roleCreateOrUpdate(modal, actionRef)}>
          新增
        </Button>
      ]}
    />
  )
}

export default RoleIndex
