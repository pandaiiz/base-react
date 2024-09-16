import { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
import { baseColumns } from '@/pages/system/user/columns.tsx'
import { useRef } from 'react'
import { useModal } from '@ebay/nice-modal-react'
import UserModal from '@/pages/system/user/user-modal'
import { userList, userRead } from './api'

// const { confirm } = Modal
// const deleteConfirm = (record: any, ref: any) => {
//   confirm({
//     title: '确认删除吗？',
//     icon: <ExclamationCircleFilled />,
//     content: '删除后不可恢复！',
//     onOk() {
//       userDelete({ id: record.id }).then(() => ref.current.reload())
//     }
//   })
// }
// const userCreateMethod = async (modal: any, ref: any) => {
//   const treeData = await menuList()
//   const values: API.UserDto = await modal.show({ treeData })
//   try {
//     await userCreate(values)
//     modal.remove()
//     ref.current?.reload()
//   } catch (e) {
//     /* empty */
//   }
// }

// const userUpdateMethod = async (modal: any, record: any, ref: any) => {
//   const treeData = await menuList()
//   const data = await userRead({ id: record.id })
//   const values: API.UserDto = await modal.show({ data, treeData, type: 'edit' })
//   try {
//     await userUpdate({ id: record.id }, values as API.UserDto)
//     modal.remove()
//     ref.current?.reload()
//   } catch (e) {
//     /* empty */
//   }
// }

export default () => {
  const modal = useModal(UserModal)
  const actionRef = useRef<ActionType>()

  const openModal = async (id?: number) => {
    if (id) {
      const data = await userRead({ id })
      data.roleIds = data.roles.map((item) => item.id)
      await modal.show({ data, type: 'edit' })
    } else {
      await modal.show()
    }
    modal.remove()
    actionRef.current?.reload()
  }
  const deleteRocord = (id: number) => {
    console.log(id)
  }
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
        <Button type="link" key="edit" onClick={() => openModal(record.id)}>
          编辑
        </Button>,
        <Button type="link" key="delete" onClick={() => deleteRocord(record.id)}>
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
        const data = await userList(params)
        return { data: data.list, success: true, total: data.pagination?.total }
      }}
      rowKey="id"
      columnEmptyText={false}
      dateFormatter="string"
      scroll={{ y: 800 }}
      toolBarRender={() => [
        <Button type="primary" key="primary" onClick={() => openModal()}>
          新增
        </Button>
      ]}
    />
  )
}
