import { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm } from 'antd'
import { baseColumns } from '@/pages/system/dict-type/columns'
import { useRef } from 'react'
import { useModal } from '@ebay/nice-modal-react'
import DictTypeModal from '@/pages/system/dict-type/dict-modal'
import { Api } from '@/api'
import { dictTypeList } from '@/api/backend/api/systemDictType.ts'
import DictTypeEntity = API.DictTypeEntity

const dictTypeCreateOrUpdate = async (modal: any, ref: any, data?: any) => {
  if (data) {
    await modal.show({ data, type: 'edit' })
  } else {
    await modal.show()
  }
  modal.remove()
  ref.current?.reload()
}

const DictIndex = () => {
  const modal = useModal(DictTypeModal)
  const actionRef = useRef<ActionType>()
  const columns: ProColumns<DictTypeEntity>[] = [
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
          onClick={() => dictTypeCreateOrUpdate(modal, actionRef, record)}
        >
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          title="确认删除吗？"
          onConfirm={async () => {
            await Api.systemDictType.dictTypeDelete({ id: record.id })
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
    <ProTable<DictTypeEntity>
      columns={columns}
      actionRef={actionRef}
      request={(params) => dictTypeList(params as API.DictTypeListParams)}
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
          onClick={() => dictTypeCreateOrUpdate(modal, actionRef)}
        >
          新增
        </Button>
      ]}
    />
  )
}
export default DictIndex
