import { useEffect, useState } from 'react'

import { getDataList } from '@/utils/common'
import { Segmented, Table, TableProps } from 'antd'
interface DataType {
  name: string
  code: string
  inQuantity: number
  outQuantity: number
  scrapQuantity: number
}
const SupplierReport = () => {
  const [dataSource, setDataSource] = useState<any>()
  const [supplierId, setSupplierId] = useState<number>(0)
  const [data, setData] = useState<any>()

  const fetchData = async () => {
    const reportData = await getDataList('io/knife-tool/report/supplier')
    setDataSource(reportData)
    setSupplierId(reportData[0].supplierId)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setData(
      dataSource?.find((item: { supplierId: number }) => item.supplierId === supplierId)?.tools
    )
  }, [dataSource, supplierId])

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '刀具',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '入库数量',
      dataIndex: 'inQuantity',
      key: 'inQuantity'
    },
    {
      title: '出库数量',
      dataIndex: 'outQuantity',
      key: 'outQuantity'
    },
    {
      title: '购入数量',
      dataIndex: 'remainingQuantity',
      key: 'remainingQuantity'
    }
  ]

  return (
    <>
      <Segmented<number>
        options={dataSource?.map((item: { supplierId: number; supplierName: string }) => ({
          label: item.supplierName,
          value: item.supplierId
        }))}
        value={supplierId}
        onChange={(value) => setSupplierId(value)}
      />

      <div style={{ marginTop: 24 }}></div>
      <Table columns={columns} dataSource={data} pagination={false} rowKey="code" />
    </>
  )
}
export default SupplierReport
