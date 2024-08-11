import { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm } from 'antd'
import { baseColumns } from '@/pages/io/order/columns'
import { useRef } from 'react'
import { useModal } from '@ebay/nice-modal-react'
import EditModal from '@/pages/io/order/edit-modal'
import { Api } from '@/api'
import { ioOrderList } from '@/api/backend/api/ioOrder'

const ioOrderCreateOrUpdate = async (modal: any, ref: any, data?: any) => {
  if (data) {
    await modal.show({ data, type: 'edit' })
  } else {
    await modal.show()
  }
  modal.remove()
  ref.current?.reload()
}

const IoOrderIndex = () => {
  const modal = useModal(EditModal)
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
        <Button
          type="link"
          key="edit"
          onClick={() => ioOrderCreateOrUpdate(modal, actionRef, record)}
        >
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          title="确认删除吗？"
          onConfirm={async () => {
            await Api.ioOrder.ioOrderDelete({ id: record.id })
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
    <ProTable<any>
      columns={columns}
      actionRef={actionRef}
      request={(params) => ioOrderList(params as API.EmployeeListParams)}
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
          onClick={() => ioOrderCreateOrUpdate(modal, actionRef)}
        >
          新增
        </Button>
      ]}
    />
  )
}
export default IoOrderIndex
