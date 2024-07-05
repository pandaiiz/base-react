import { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm } from 'antd'
import { baseColumns } from '@/pages/relationship/employee/columns'
import { useRef } from 'react'
import { useModal } from '@ebay/nice-modal-react'
import EditModal from '@/pages/relationship/employee/edit-modal'
import { Api } from '@/api'
import EmployeeEntity = API.EmployeeEntity
import { relationshipEmployeeList } from '@/api/backend/api/relationshipEmployee.ts'

const employeeCreateOrUpdate = async (modal: any, ref: any, data?: any) => {
  if (data) {
    await modal.show({ data, type: 'edit' })
  } else {
    await modal.show()
  }
  modal.remove()
  ref.current?.reload()
}

const EmployeeIndex = () => {
  const modal = useModal(EditModal)
  const actionRef = useRef<ActionType>()
  const columns: ProColumns<EmployeeEntity>[] = [
    ...baseColumns,
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      align: 'center',
      width: 160,
      fixed: 'right',
      render: (_text, record) => [
        <Button
          type="link"
          key="edit"
          onClick={() => employeeCreateOrUpdate(modal, actionRef, record)}
        >
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          title="确认删除吗？"
          onConfirm={async () => {
            await Api.relationshipEmployee.relationshipEmployeeDelete({ id: record.id })
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
    <ProTable<EmployeeEntity>
      columns={columns}
      actionRef={actionRef}
      request={(params) => relationshipEmployeeList(params as API.EmployeeListParams)}
      rowKey="id"
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showQuickJumper: true
      }}
      columnEmptyText={false}
      dateFormatter="string"
      scroll={{ y: 800 }}
      toolBarRender={() => [
        <Button
          type="primary"
          key="primary"
          onClick={() => employeeCreateOrUpdate(modal, actionRef)}
        >
          新增
        </Button>
      ]}
    />
  )
}
export default EmployeeIndex
