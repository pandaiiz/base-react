import { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { useRef } from 'react'

import { getDataList } from '@/utils/common'
import { baseColumns } from './columns'

const KnifeToolIndex = () => {
  const actionRef = useRef<ActionType>()
  const columns: ProColumns[] = [...baseColumns]

  return (
    <ProTable<any>
      columns={columns}
      actionRef={actionRef}
      request={async (params) => {
        let data = await getDataList('io/knife-tool/report', params)
        if (params.keyword) {
          const keyword = params.keyword.toLowerCase()
          data = data.filter(
            (item: any) =>
              item.name.toLowerCase().includes(keyword) ||
              item.departments.some((dept: any) => dept.deptName.toLowerCase().includes(keyword)) ||
              item.suppliers.some((supplier: any) =>
                supplier.supplierName.toLowerCase().includes(keyword)
              )
          )
        }
        return {
          data,
          success: true
        }
      }}
      rowKey="code"
      pagination={false}
      columnEmptyText={false}
      dateFormatter="string"
      scroll={{ y: 800 }}
      options={{
        search: true
      }}
    />
  )
}
export default KnifeToolIndex
