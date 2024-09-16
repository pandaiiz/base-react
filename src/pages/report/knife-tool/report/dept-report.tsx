import { useEffect, useState } from 'react'

import { getDataList } from '@/utils/common'
import { Segmented, Table, TableProps, Typography } from 'antd'
interface DataType {
  name: string
  code: string
  inQuantity: number
  outQuantity: number
  scrapQuantity: number
  remainingQuantity: number
}
const DeptReport = () => {
  const [dataSource, setDataSource] = useState<any>()
  const [deptId, setDeptId] = useState<number>(0)
  const [data, setData] = useState<any>()

  const fetchData = async () => {
    const reportData = await getDataList('io/knife-tool/report/dept')
    setDataSource(reportData)
    setDeptId(reportData[0].deptId)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setData(dataSource?.find((item: { deptId: number }) => item.deptId === deptId)?.tools)
  }, [dataSource, deptId])

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '刀具',
      dataIndex: 'name',
      key: 'name',
      width: 100
    },
    {
      title: '归还数量',
      dataIndex: 'inQuantity',
      key: 'inQuantity',
      width: 100,
      sorter: (a, b) => a.inQuantity - b.inQuantity
    },
    {
      title: '借出数量',
      dataIndex: 'outQuantity',
      key: 'outQuantity',
      width: 100,
      sorter: (a, b) => a.outQuantity - b.outQuantity
    },
    {
      title: '员工报废',
      dataIndex: 'scrapQuantity',
      key: 'scrapQuantity',
      width: 100,
      sorter: (a, b) => a.scrapQuantity - b.scrapQuantity
    },
    {
      title: '余量',
      dataIndex: 'remainingQuantity',
      key: 'remainingQuantity',
      width: 100,
      sorter: (a, b) => a.remainingQuantity - b.remainingQuantity
    }
  ]

  return (
    <>
      <Segmented<number>
        options={dataSource?.map((item: { deptId: number; deptName: string }) => ({
          label: item.deptName,
          value: item.deptId
        }))}
        value={deptId}
        onChange={(value) => setDeptId(value)}
      />
      <div style={{ marginTop: 24 }}></div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="code"
        summary={(pageData) => {
          let totalOutQuantity = 0
          let totalInQuantity = 0
          let totalScrapQuantity = 0

          pageData.forEach(({ outQuantity, inQuantity, scrapQuantity }) => {
            totalOutQuantity += outQuantity
            totalInQuantity += inQuantity
            totalScrapQuantity += scrapQuantity
          })
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <Typography.Text type="danger">合计</Typography.Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <Typography.Text type="danger">{totalInQuantity}</Typography.Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <Typography.Text type="danger">{totalOutQuantity}</Typography.Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <Typography.Text type="danger">{totalScrapQuantity}</Typography.Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <Typography.Text type="danger">
                    {totalOutQuantity - totalInQuantity - totalScrapQuantity}
                  </Typography.Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          )
        }}
      />
    </>
  )
}
export default DeptReport
