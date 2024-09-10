import { List, Space } from 'antd'

export const FixReport: React.FC<{
  data: {
    supplier: string
    items?: {
      code: string
      name: string
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
              <div>{report.supplier}</div>
              {report.items?.map((item) => (
                <div key={item.code} style={{ marginTop: 10 }}>
                  <div>{item.name}</div>
                  <Space style={{ display: 'flex' }}>
                    <div>发出: {item.outQuantity ?? 0}</div>
                    <div>收回: {item.inQuantity ?? 0}</div>
                    <div>欠: {(item.outQuantity ?? 0) - (item.inQuantity ?? 0)}</div>
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