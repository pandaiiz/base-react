import { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm } from 'antd'
import { baseColumns } from '@/pages/system/dict-item/columns.tsx'
import { useEffect, useRef } from 'react'
import { useModal } from '@ebay/nice-modal-react'
import { Api } from '@/api'
import DictItemModal from '@/pages/system/dict-item/dict-item-modal'
import { dictItemList } from '@/api/backend/api/systemDictItem.ts'
import { useParams } from 'react-router-dom'
import DictItemEntity = API.DictItemEntity

const createOrUpdate = async (modal: any, ref: any, data?: any, type: string = 'add') => {
  await modal.show({ data, type })
  modal.remove()
  ref.current?.reload()
}

const DictItemIndex = () => {
  const modal = useModal(DictItemModal)
  const { id } = useParams()
  const actionRef = useRef<ActionType>()
  const formRef = useRef<ProFormInstance>()

  useEffect(() => {
    if (id && formRef.current) {
      formRef.current.setFieldsValue({ typeId: Number(id) })
    }
  }, [formRef, id])

  const columns: ProColumns<DictItemEntity>[] = [
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
        <Popconfirm
          key="delete"
          title="确认删除吗？"
          onConfirm={async () => {
            await Api.systemDictItem.dictItemDelete({ id: record.id })
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
    <ProTable<DictItemEntity>
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
export default DictItemIndex
