import { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
import { baseColumns } from '@/pages/system/dict-item/columns.tsx'
import { useEffect, useRef } from 'react'
import { useModal } from '@ebay/nice-modal-react'
import { Api } from '@/api'
import deleteConfirm from '@/components/common/DeleteConfirm'
import { DictItemModal } from '@/pages/system/dict-item/dict-item-modal'
import { dictItemList } from '@/api/backend/api/systemDictItem.ts'
import { useParams } from 'react-router-dom'

export type TableListItem = any

const createOrUpdate = async (modal: any, ref: any, record?: any, type: string = 'add') => {
  await modal.show({ data: record, type })
  modal.remove()
  ref.current?.reload()
}

export default () => {
  const modal = useModal(DictItemModal)
  const { id } = useParams()
  const actionRef = useRef<ActionType>()
  const formRef = useRef<ProFormInstance>()

  useEffect(() => {
    if (id && formRef.current) {
      formRef.current.setFieldsValue({ typeId: Number(id) })
    }
  }, [formRef, id])

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
        <Button
          type="link"
          key="edit"
          onClick={() =>
            createOrUpdate(modal, actionRef, { ...record, typeId: Number(id) }, 'edit')
          }
        >
          编辑
        </Button>,
        <Button
          type="link"
          key="delete"
          onClick={() => deleteConfirm(Api.systemDictItem.dictItemDelete, record, actionRef)}
        >
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
      formRef={formRef}
      request={async (params) =>
        dictItemList(
          params.typeId
            ? (params as API.DictItemListParams)
            : ({
                ...params,
                typeId: Number(id)
              } as API.DictItemListParams)
        )
      }
      rowKey="id"
      // pagination={false}
      columnEmptyText={false}
      dateFormatter="string"
      scroll={{ y: 800 }}
      toolBarRender={() => [
        <Button
          type="primary"
          key="primary"
          onClick={() => createOrUpdate(modal, actionRef, { typeId: Number(id) })}
        >
          新增
        </Button>
      ]}
    />
  )
}
