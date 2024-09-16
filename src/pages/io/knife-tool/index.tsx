import { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm, Segmented, Tag } from 'antd'
import { useRef, useState } from 'react'
import { useModal } from '@ebay/nice-modal-react'

import { ToolEntity, ToolListParams } from './types'
import { deleteData, getDataList } from '@/utils/common'
import { PassWordConfirmModal } from '@/components/common/PasswordConfirm'
import { EditModal } from './edit'
import { baseColumns } from './columns'
import Permission from '@/components/common/Permission'
import { useNavigate } from 'react-router-dom'

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
  const [tableType, setTableType] = useState<string>('全部')
  const [summaryData, setSummaryData] = useState<any>({})
  const editModal = useModal(EditModal)
  const navigate = useNavigate()
  const passWordConfirmModal = useModal(PassWordConfirmModal)
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

  const RenderTag = () => {
    switch (tableType) {
      /* case '全部':
        return (
          <>
            <Tag color="green">刀具入库：{summaryData[1] || 0}</Tag>
            <Tag color="red">刀具出库：{summaryData[2] || 0}</Tag>
            <Tag color="green">刀具归还：{summaryData[12] || 0}</Tag>
            <Tag color="red">刀具借出：{summaryData[11] || 0}</Tag>
            <Tag color="green">修磨收回：{summaryData[22] || 0}</Tag>
            <Tag color="red">修磨发出：{summaryData[21] || 0}</Tag>
            <Tag color="red">员工报废：{summaryData[31] || 0}</Tag>
            <Tag color="red">修磨报废：{summaryData[32] || 0}</Tag>
          </>
        ) */
      case '部门':
        return (
          <>
            <Tag color="green">刀具归还：{summaryData[11] || 0}</Tag>
            <Tag color="red">刀具借出：{summaryData[12] || 0}</Tag>
            <Tag color="red">员工报废：{summaryData[31] || 0}</Tag>
            <Tag color="blue">
              余量：{(summaryData[12] || 0) - (summaryData[11] || 0) - (summaryData[31] || 0)}
            </Tag>
          </>
        )
      case '厂商':
        return (
          <>
            <Tag color="green">刀具入库：{summaryData[1] || 0}</Tag>
            <Tag color="red">刀具出库：{summaryData[2] || 0}</Tag>
          </>
        )
      case '修磨':
        return (
          <>
            <Tag color="green">修磨收回：{summaryData[21] || 0}</Tag>
            <Tag color="red">修磨发出：{summaryData[22] || 0}</Tag>
            <Tag color="red">修磨报废：{summaryData[32] || 0}</Tag>
            <Tag color="blue">
              余量：{(summaryData[22] || 0) - (summaryData[21] || 0) - (summaryData[32] || 0)}
            </Tag>
          </>
        )
      case '报废':
        return (
          <>
            <Tag color="red">员工报废：{summaryData[31] || 0}</Tag>
            <Tag color="red">修磨报废：{summaryData[32] || 0}</Tag>
          </>
        )
      default:
        return <></>
    }
  }

  return (
    <ProTable<ToolEntity, ToolListParams>
      columns={columns}
      actionRef={actionRef}
      request={async (params) => {
        const { data, total, success, summary } = await getDataList<ToolEntity>('io/knife-tool', {
          ...params,
          tableType
        })
        setSummaryData(summary)
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
        <RenderTag />,
        <Segmented<string>
          options={['全部', '部门', '厂商', '修磨', '报废']}
          value={tableType}
          onChange={(value) => {
            setTableType(value) // string
            actionRef.current?.reload()
          }}
        />,
        <Button onClick={() => navigate('/report/knife-tool')}>报表</Button>,
        <Permission permissionName="io:knife-tool:create">
          <Button
            type="primary"
            key="primary"
            onClick={() => toolCreateOrUpdate(editModal, actionRef)}
          >
            新增
          </Button>
        </Permission>
      ]}
    />
  )
}
export default KnifeToolIndex
