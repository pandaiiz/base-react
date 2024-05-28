import { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
import { baseColumns } from '@/pages/system/dept/columns.tsx'
import { useRef } from 'react'
import { useModal } from '@ebay/nice-modal-react'
import { Api } from '@/api'
import deleteConfirm from '@/components/common/DeleteConfirm'
import { DeptModal } from '@/pages/system/dept/dept-modal'
import { deptList } from '@/api/backend/api/systemDept.ts'

const deptCreate = async (modal: any, ref: any) => {
  const treeData = await Api.systemMenu.menuList({})
  const values: API.DeptDto = await modal.show({ treeData })
  try {
    await Api.systemDept.deptCreate(values as API.DeptDto)
    modal.remove()
    ref.current?.reload()
  } catch (e) {
    /* empty */
  }
}

const deptUpdate = async (modal: any, record: any, ref: any) => {
  const values: API.DeptDto = await modal.show({
    data: { ...record, parentId: record.parentId },
    type: 'edit'
  })
  try {
    await Api.systemDept.deptUpdate({ id: record.id }, values as API.DeptDto)
    modal.remove()
    ref.current?.reload()
  } catch (e) {
    /* empty */
  }
}

export default () => {
  const modal = useModal(DeptModal)

  const actionRef = useRef<ActionType>()
  const columns: ProColumns<API.DeptEntity>[] = [
    ...baseColumns,
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      align: 'center',
      width: 160,
      fixed: 'right',
      render: (_text, record) => [
        <Button type="link" key="edit" onClick={() => deptUpdate(modal, record, actionRef)}>
          编辑
        </Button>,
        <Button
          type="link"
          key="delete"
          onClick={() => deleteConfirm(Api.systemDept.deptDelete, record, actionRef)}
        >
          删除
        </Button>
      ]
    }
  ]

  const dataSourceRef = useRef<any>()

  return (
    <ProTable<API.DeptEntity>
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
        const data = await deptList(params as API.DeptListParams)
        return { data: data, success: true }
      }}
      rowKey="id"
      columnEmptyText={false}
      dateFormatter="string"
      scroll={{ y: 800 }}
      toolBarRender={() => [
        <Button type="primary" key="primary" onClick={() => deptCreate(modal, actionRef)}>
          新增
        </Button>
      ]}
    />
  )
}
