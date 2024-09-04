import { formatToDateTime } from '@/utils/dateUtil'
import { ProColumns } from '@ant-design/pro-components'
import { ToolEntity } from './types'
import { getDataList } from '@/utils/common'

export const operationTypes = [
  { value: 2, label: '刀具出库', type: 'primary' },
  { value: 1, label: '刀具入库' },
  { value: 11, label: '刀具借出', type: 'primary' },
  { value: 12, label: '刀具归还' },
  { value: 21, label: '刀具修磨发出', type: 'primary' },
  { value: 22, label: '刀具修磨收回' }
]

export const baseColumns: ProColumns<ToolEntity>[] = [
  {
    title: '刀具名称',
    dataIndex: 'code',
    render: (_, record) => record.name,
    request: async () => {
      const response = await getDataList('system/dict-item/by-dict-code', {
        dictCode: 'KNIFE_TOOL'
      })
      return response.map((item: any) => ({
        label: item.label,
        value: item.value
      }))
    }
  },
  {
    title: '供应商',
    dataIndex: 'supplierId',
    render: (_, record) => record.supplier?.name,
    request: async () => {
      const response = await getDataList('relationship/supplier', { pageSize: -1 })
      return response.map((item: any) => ({
        label: item.name,
        value: item.id
      }))
    }
  },
  {
    title: '件数',
    dataIndex: 'quantity',
    hideInSearch: true
  },
  {
    title: '领取人员',
    dataIndex: 'receiverId',
    render: (_, record) => record.receiver?.name,
    request: async () => {
      const response = await getDataList('relationship/employee', { pageSize: -1 })
      return response.map((item: any) => ({
        label: item.name,
        value: item.id
      }))
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    sorter: true,
    width: 160,
    render: (_, record) => formatToDateTime(record.createdAt),
    valueType: 'dateTimeRange',
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1]
        }
      }
    }
  },
  {
    title: '操作人员',
    render: (_, record) => record.creator?.nickname,
    hideInSearch: true
  },
  {
    title: '操作类型',
    render: (_, record) =>
      operationTypes.find((type) => type.value === record.operationType)?.label,
    hideInSearch: true
  },
  {
    title: '备注',
    dataIndex: 'remark',
    hideInSearch: true
  },
  {
    title: '修改时间',
    dataIndex: 'updatedAt',
    sorter: true,
    width: 160,
    render: (_, record) => formatToDateTime(record.updatedAt),
    hideInSearch: true
  }
]
