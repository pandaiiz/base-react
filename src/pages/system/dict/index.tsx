import { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Modal } from 'antd'
import { baseColumns } from '@/pages/system/dict/columns.tsx'
import { useRef } from 'react'
import { useModal } from '@ebay/nice-modal-react'
import { DictTypeModal } from '@/pages/system/dict/dict-modal'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Api } from '@/api'
import { dictTypeList } from '@/api/backend/api/systemDictType.ts'

export type TableListItem = any
const { confirm } = Modal
const deleteConfirm = (record: any, ref: any) => {
  confirm({
    title: '确认删除吗？',
    icon: <ExclamationCircleFilled />,
    content: '删除后不可恢复！',
    onOk() {
      Api.systemDictType.dictTypeDelete({ id: record.id }).then(() => ref.current.reload())
    }
  })
}
const dictTypeCreate = async (modal: any, ref: any) => {
  await modal.show()
  modal.remove()
  ref.current?.reload()
}

const dictTypeUpdate = async (modal: any, record: any, ref: any) => {
  await modal.show({ data: record, type: 'edit' })
  modal.remove()
  ref.current?.reload()
}

export default () => {
  const modal = useModal(DictTypeModal)

  const actionRef = useRef<ActionType>()
  const columns: ProColumns<TableListItem>[] = [
    ...baseColumns,
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      align: 'center',
      width: 160,
      fixed: 'right',
      render: (_text, record) => [
        <Button type="link" key="edit" onClick={() => dictTypeUpdate(modal, record, actionRef)}>
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
        <Button type="primary" key="primary" onClick={() => dictTypeCreate(modal, actionRef)}>
          新增
        </Button>
      ]}
    />
  )
}
