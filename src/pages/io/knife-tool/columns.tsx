import { formatToDateTime } from '@/utils/dateUtil'
import { ProColumns } from '@ant-design/pro-components'
import { ToolEntity } from './types'
import { getDataList } from '@/utils/common'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Space } from 'antd'
// 操作类型 1刀具入库 2刀具出库  11刀具收回 12刀具借出 21刀具修磨发出 22刀具修磨收回 31刀具报废

export const operationTypes = [
  {
    value: 12,
    label: (
      <Space>
        刀具借出
        <ArrowUpOutlined style={{ color: 'red' }} />
      </Space>
    )
  },
  {
    value: 11,
    label: (
      <Space>
        刀具归还
        <ArrowDownOutlined style={{ color: 'lightgreen' }} />
      </Space>
    )
  },
  {
    value: 2,
    label: (
      <Space>
        刀具出库
        <ArrowUpOutlined style={{ color: 'red' }} />
      </Space>
    )
  },
  {
    value: 1,
    label: (
      <Space>
        刀具入库
        <ArrowDownOutlined style={{ color: 'lightgreen' }} />
      </Space>
    )
  },
  {
    value: 22,
    label: (
      <Space>
        刀具修磨发出
        <ArrowUpOutlined style={{ color: 'red' }} />
      </Space>
    )
  },
  {
    value: 21,
    label: (
      <Space>
        刀具修磨收回
        <ArrowDownOutlined style={{ color: 'lightgreen' }} />
      </Space>
    )
  },
  {
    value: 31,
    label: (
      <Space>
        员工报废
        <ArrowDownOutlined style={{ color: 'red' }} />
      </Space>
    )
  },
  {
    value: 32,
    label: (
      <Space>
        修磨报废
        <ArrowDownOutlined style={{ color: 'red' }} />
      </Space>
    )
  }
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
    title: '部门',
    dataIndex: 'deptId',
    render: (_, record) => record.dept?.name,
    request: async () => {
      const response = await getDataList('system/depts', { pageSize: -1, useKnifeTool: true })
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
