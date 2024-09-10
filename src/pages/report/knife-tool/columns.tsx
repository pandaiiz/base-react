import { ProColumns } from '@ant-design/pro-components'

export const baseColumns: ProColumns<any>[] = [
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    hideInTable: true,
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
    title: '刀具名称',
    dataIndex: 'name',
    width: 120,
    align: 'center',
    hideInSearch: true
  },
  {
    title: '收发库存',
    dataIndex: 'currentStock',
    width: 120,
    align: 'center',
    hideInSearch: true,
    sorter: (a, b) => a.currentStock - b.currentStock
  },
  {
    title: '累计报废',
    render: (_, record) => record.operations[31] || 0,
    width: 120,
    align: 'center',
    hideInSearch: true,
    sorter: (a, b) => (a.operations[31] || 0) - (b.operations[31] || 0)
  },
  {
    title: '可用合计',
    render: (_, record) => record.availableTotal || 0,
    width: 120,
    align: 'center',
    hideInSearch: true,
    sorter: (a, b) => (a.availableTotal || 0) - (b.availableTotal || 0)
  },
  {
    title: '部门',
    render: (_, record) => {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {record.departments.map(
            (item: { deptId: string; deptName: string; pureQuantity: number }) => (
              <div key={item.deptId} style={{ textAlign: 'center', marginLeft: 10 }}>
                {item.deptName}
                <div>{item.pureQuantity}</div>
              </div>
            )
          )}
        </div>
      )
    },
    align: 'center',
    hideInSearch: true
  },
  {
    title: '修磨',
    // width: 300,
    render: (_, record) => {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {record.suppliers.map(
            (item: { supplierId: string; supplierName: string; pureGrindingQuantity: number }) => (
              <div key={item.supplierId} style={{ textAlign: 'center', marginLeft: 10 }}>
                {item.supplierName}
                <div>{item.pureGrindingQuantity}</div>
              </div>
            )
          )}
        </div>
      )
    },
    align: 'center',
    hideInSearch: true
  }
]
