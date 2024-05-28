import { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Modal } from 'antd'
import { baseColumns } from '@/pages/system/user/columns.tsx'
import { useRef } from 'react'
import { useModal } from '@ebay/nice-modal-react'
import UserModal from '@/pages/system/user/user-modal'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Api } from '@/api'
import { userList } from '@/api/backend/api/systemUser.ts'

const { confirm } = Modal
const deleteConfirm = (record: any, ref: any) => {
  confirm({
    title: '确认删除吗？',
    icon: <ExclamationCircleFilled />,
    content: '删除后不可恢复！',
    onOk() {
      Api.systemUser.userDelete({ id: record.id }).then(() => ref.current.reload())
    }
  })
}
const userCreate = async (modal: any, ref: any) => {
  const treeData = await Api.systemMenu.menuList({})
  const values: API.UserDto = await modal.show({ treeData })

  try {
    await Api.systemUser.userCreate(values as API.UserDto)
    modal.remove()
    console.log(123)
    ref.current?.reload()
  } catch (e) {
    /* empty */
  }
}

const userUpdate = async (modal: any, record: any, ref: any) => {
  const treeData = await Api.systemMenu.menuList({})
  const data = await Api.systemUser.userRead({ id: record.id })
  const values: API.UserDto = await modal.show({ data, treeData, type: 'edit' })
  try {
    await Api.systemUser.userUpdate({ id: record.id }, values as API.UserDto)
    modal.remove()
    ref.current?.reload()
  } catch (e) {
    /* empty */
  }
}

export default () => {
  const modal = useModal(UserModal)

  const actionRef = useRef<ActionType>()
  const columns: ProColumns<API.UserEntity>[] = [
    ...baseColumns,
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      align: 'center',
      width: 160,
      fixed: 'right',
      render: (_text, record) => [
        <Button type="link" key="edit" onClick={() => userUpdate(modal, record, actionRef)}>
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
    <ProTable<API.UserEntity>
      headerTitle="用户列表"
      onDataSourceChange={(data) => {
        dataSourceRef.current = data
      }}
      columns={columns}
      actionRef={actionRef}
      request={async (params) => {
        const data = await userList(params as API.UserListParams)
        return { data: data.list, success: true, total: data.pagination?.total }
      }}
      rowKey="id"
      columnEmptyText={false}
      dateFormatter="string"
      scroll={{ y: 800 }}
      toolBarRender={() => [
        <Button type="primary" key="primary" onClick={() => userCreate(modal, actionRef)}>
          新增
        </Button>
      ]}
    />
  )
}
