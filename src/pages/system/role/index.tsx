import { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Modal } from 'antd'
import { baseColumns } from '@/pages/system/role/columns.tsx'
import { useRef } from 'react'
import { useModal } from '@ebay/nice-modal-react'
import { RoleModal } from '@/pages/system/role/role-modal'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Api } from '@/api'
import { roleList } from '@/api/backend/api/systemRole.ts'

const { confirm } = Modal
const deleteConfirm = (record: any, ref: any) => {
  confirm({
    title: '确认删除吗？',
    icon: <ExclamationCircleFilled />,
    content: '删除后不可恢复！',
    onOk() {
      Api.systemRole.roleDelete({ id: record.id }).then(() => ref.current.reload())
    }
  })
}
const roleCreate = async (modal: any, ref: any) => {
  const treeData = await Api.systemMenu.menuList({})
  const values: API.RoleDto = await modal.show({ treeData })

  try {
    await Api.systemRole.roleCreate(values as API.RoleDto)
    modal.remove()
    console.log(123)
    ref.current?.reload()
  } catch (e) {
    /* empty */
  }
}

const roleUpdate = async (modal: any, record: any, ref: any) => {
  const treeData = await Api.systemMenu.menuList({})
  const data = await Api.systemRole.roleInfo({ id: record.id })
  const values: API.RoleDto = await modal.show({ data, treeData, type: 'edit' })
  try {
    await Api.systemRole.roleUpdate({ id: record.id }, values as API.RoleDto)
    modal.remove()
    ref.current?.reload()
  } catch (e) {
    /* empty */
  }
}

export default () => {
  const modal = useModal(RoleModal)

  const actionRef = useRef<ActionType>()
  const columns: ProColumns<any>[] = [
    ...baseColumns,
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      align: 'center',
      width: 160,
      fixed: 'right',
      render: (_text, record) => [
        <Button type="link" key="edit" onClick={() => roleUpdate(modal, record, actionRef)}>
          编辑
        </Button>,
        <Button type="link" key="delete" onClick={() => deleteConfirm(record, actionRef)}>
          删除
        </Button>
      ]
    }
  ]

  const dataSourceRef = useRef<any>()

  return (
    <ProTable<TableListItem>
      onDataSourceChange={(data) => {
        dataSourceRef.current = data
      }}
      columns={columns}
      actionRef={actionRef}
      request={async (params) => {
        // if (params.name === '') delete params.name;
        // if (params.path === '') delete params.path;
        // if (params.component === '') delete params.component;
        // 表单搜索项会从 params 传入，传递给后端接口。
        const data = await roleList(params as API.RoleListParams)
        return { data, success: true, total: data.meta?.itemCount }
      }}
      rowKey="id"
      // pagination={false}
      columnEmptyText={false}
      dateFormatter="string"
      scroll={{ y: 800 }}
      toolBarRender={() => [
        <Button type="primary" key="primary" onClick={() => roleCreate(modal, actionRef)}>
          新增
        </Button>
      ]}
    />
  )
}
