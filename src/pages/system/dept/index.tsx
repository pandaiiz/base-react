import { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm } from 'antd'
import { baseColumns } from '@/pages/system/dept/columns.tsx'
import { useRef } from 'react'
import { useModal } from '@ebay/nice-modal-react'
import { Api } from '@/api'
import DeptModal from '@/pages/system/dept/dept-modal'

const deptCreateOrUpdate = async (modal: any, ref: any, record?: any) => {
  if (record) {
    await modal.show({
      data: record,
      type: 'edit'
    })
  } else {
    await modal.show()
  }
  modal.remove()
  ref.current?.reload()
}

const DeptIndex = () => {
  const modal = useModal(DeptModal)
  const actionRef = useRef<ActionType>()
  const dataSourceRef = useRef<any>()
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
        <Button type="link" key="edit" onClick={() => deptCreateOrUpdate(modal, actionRef, record)}>
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          title="确认删除吗？"
          onConfirm={async () => {
            await Api.systemDept.deptDelete({ id: record.id })
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
    <ProTable<API.DeptEntity>
      onDataSourceChange={(data) => {
        dataSourceRef.current = data
      }}
      columns={columns}
      actionRef={actionRef}
      request={(params) => Api.systemDept.deptList(params as API.DeptListParams)}
      rowKey="id"
      columnEmptyText={false}
      dateFormatter="string"
      scroll={{ y: 800 }}
      toolBarRender={() => [
        <Button type="primary" key="primary" onClick={() => deptCreateOrUpdate(modal, actionRef)}>
          新增
        </Button>
      ]}
    />
  )
}
export default DeptIndex
