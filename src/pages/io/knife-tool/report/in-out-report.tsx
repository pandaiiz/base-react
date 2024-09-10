import { List, Space } from 'antd'

export const InOutReport: React.FC<{
  data: {
    name: string
    suppliers?: {
      supplier: string
      inQuantity?: number
      outQuantity?: number
    }[]
  }[]
}> = ({ data }) => {
  return (
    <div>
      <List
        bordered
        dataSource={data}
        renderItem={(report) => (
          <List.Item>
            <div>
              <div>{report.name}</div>
              {report.suppliers?.map((supplier) => (
                <div key={supplier.supplier} style={{ marginTop: 10 }}>
                  <div>{supplier.supplier}</div>
                  <Space style={{ display: 'flex' }}>
                    <div>入库: {supplier.inQuantity ?? 0}</div>
                    <div>出库: {supplier.outQuantity ?? 0}</div>
                    <div>购入: {(supplier.inQuantity ?? 0) - (supplier.outQuantity ?? 0)}</div>
                  </Space>
                </div>
              ))}
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}
