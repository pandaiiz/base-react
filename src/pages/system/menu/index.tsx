import { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Modal } from 'antd'
import { menuList } from '@/api/backend/api/systemMenu.ts'
import { baseColumns } from '@/pages/system/menu/columns.tsx'
import { useRef, useState } from 'react'
import { useModal } from '@ebay/nice-modal-react'
import MenuModal from '@/pages/system/menu/menu-modal'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Api } from '@/api'

export type TableListItem = any
const { confirm } = Modal
const deleteConfirm = (record: any, ref: any) => {
  confirm({
    title: '确认删除吗？',
    icon: <ExclamationCircleFilled />,
    content: '删除后不可恢复！',
    onOk() {
      Api.systemMenu.menuDelete({ id: record.id }).then(() => ref.current.reload())
    }
  })
}

const menuCreateOutRow = async (modal: any, record: any, ref: any) => {
  try {
    await modal.show({ data: record })
    console.log(123123)
    modal.remove()
    ref.current?.reload()
  } catch (e) {
    modal.reject(new Error('something went wrong'))
    console.log(e)
  }
}

const menuCreate = async (modal: any, record: any, ref: any) => {
  const values: API.MenuDto = await modal.show({ data: record })
  await Api.systemMenu.menuCreate(values as API.MenuDto)
  modal.remove()
  ref.current?.reload()
}

const menuUpdate = async (modal: any, record: any, ref: any) => {
  const values: API.MenuDto = await modal.show({ data: record, type: 'edit' })
  await Api.systemMenu.menuUpdate({ id: record.id }, values as API.MenuDto)
  modal.remove()
  ref.current?.reload()
}

export default () => {
  const modal = useModal(MenuModal)

  const [expandKeys, setExpandKeys] = useState<any[]>([])
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
        <Button
          type="link"
          key="add"
          onClick={() => menuCreate(modal, record, actionRef)}
          disabled={record.type === 2}
        >
          新增
        </Button>,
        <Button type="link" key="edit" onClick={() => menuUpdate(modal, record, actionRef)}>
          编辑
        </Button>,
        <Button type="link" key="delete" onClick={() => deleteConfirm(record, actionRef)}>
          删除
        </Button>
      ]
    }
  ]

  const getAllKeys = (data: any[]): any[] => {
    const keys: string[] = []
    data.forEach((item) => {
      keys.push(item.id)
      const children = item['children']
      if (children?.length) {
        keys.push(...getAllKeys(children))
      }
    })
    return keys
  }
  const dataSourceRef = useRef<any>()

  return (
    <ProTable<TableListItem>
      onDataSourceChange={(data) => {
        dataSourceRef.current = data
      }}
      columns={columns}
      actionRef={actionRef}
      request={async (params) => {
        if (params.name === '') delete params.name
        if (params.path === '') delete params.path
        if (params.component === '') delete params.component
        // 表单搜索项会从 params 传入，传递给后端接口。
        const data = await menuList(params as API.MenuListParams)
        return { data, success: true }
      }}
      rowKey="id"
      pagination={false}
      expandable={{ expandedRowKeys: expandKeys.length === 0 ? undefined : expandKeys }}
      columnEmptyText={false}
      dateFormatter="string"
      scroll={{ x: 2000, y: 800 }}
      toolBarRender={() => [
        <Button
          key="open"
          onClick={() => {
            setExpandKeys(getAllKeys(dataSourceRef.current))
          }}
        >
          展开全部
        </Button>,
        <Button
          key="close"
          onClick={() => {
            setExpandKeys([])
          }}
        >
          折叠全部
        </Button>,
        <Button type="primary" key="primary" onClick={() => menuCreateOutRow(modal, {}, actionRef)}>
          新增
        </Button>
      ]}
    />
  )
}
