import { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm, Segmented } from 'antd'
import { useRef, useState } from 'react'
import { useModal } from '@ebay/nice-modal-react'

import { ToolEntity, ToolListParams } from './types'
import { deleteData, getDataList } from '@/utils/common'
import { ReportModal } from './report'
import { PassWordConfirmModal } from '@/components/common/PasswordConfirm'
import { EditModal } from './edit'
import { baseColumns } from './columns'

const toolCreateOrUpdate = async (modal: any, ref: any, data?: any) => {
  if (data) {
    await modal.show({ data, type: 'edit' })
  } else {
    await modal.show()
  }
  modal.remove()
  ref.current?.reload()
}

const KnifeToolIndex = () => {
  // const [summary, setSummary] = useState<any>({})
  const [tableType, setTableType] = useState<string>('全部')
  const editModal = useModal(EditModal)
  const passWordConfirmModal = useModal(PassWordConfirmModal)
  const reportModal = useModal(ReportModal)
  const actionRef = useRef<ActionType>()
  const columns: ProColumns<ToolEntity>[] = [
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
          onClick={async () => {
            const validatePass = await passWordConfirmModal.show()
            if (validatePass) {
              passWordConfirmModal.remove()
              toolCreateOrUpdate(editModal, actionRef, record)
            }
          }}
        >
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          title="确认删除吗？"
          onConfirm={async () => {
            const validatePass = await passWordConfirmModal.show()
            if (validatePass) {
              passWordConfirmModal.remove()
              await deleteData('io/knife-tool', record.id)
              actionRef?.current?.reload()
            }
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
    <ProTable<ToolEntity, ToolListParams>
      columns={columns}
      actionRef={actionRef}
      request={async (params) => {
        const { data, total, success } = await getDataList<ToolEntity>('io/knife-tool', {
          ...params,
          tableType
        })
        // setSummary(summary)
        return {
          data,
          success,
          total
        }
      }}
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
        <Segmented<string>
          options={['全部', '部门', '厂商', '修磨', '报废']}
          value={tableType}
          onChange={(value) => {
            setTableType(value) // string
            actionRef.current?.reload()
          }}
        />,
        <Button onClick={() => reportModal.show()}>报表</Button>,
        <Button
          type="primary"
          key="primary"
          onClick={() => toolCreateOrUpdate(editModal, actionRef)}
        >
          新增
        </Button>
      ]}

      /* { <Tag color="red">刀具入库：{summary[1] || 0}</Tag>,
        <Tag color="red">刀具出库：{summary[2] || 0}</Tag>,
        <Tag color="green">刀具借出：{summary[11] || 0}</Tag>,
        <Tag color="green">刀具归还：{summary[12] || 0}</Tag>,
        <Tag color="blue">刀具修磨发出：{summary[21] || 0}</Tag>,
        <Tag color="blue">刀具修磨收回：{summary[22] || 0}</Tag>, } */
    />
  )
}
export default KnifeToolIndex
