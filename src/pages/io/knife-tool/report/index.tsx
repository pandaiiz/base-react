import { Drawer, Radio } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useEffect, useState } from 'react'
import { getToolReport } from '../api'
import { InOutReport } from './in-out-report'
import { WorkShopReport } from './work-shop-report'
import { FixReport } from './fix-report'

export const ReportModal = NiceModal.create(() => {
  const modal = useModal()
  const [reportType, setReportType] = useState('a')
  const [reportData, setReportData] = useState({
    inOutReport: [],
    fixReport: [],
    workshopReport: []
  })
  useEffect(() => {
    getToolReport().then((res) => setReportData(res))
  }, [])

  return (
    <Drawer
      placement="bottom"
      open={modal.visible}
      height="100%"
      onClose={modal.remove}
      maskClosable={false}
      extra={
        <Radio.Group
          value={reportType}
          buttonStyle="solid"
          onChange={(e) => setReportType(e.target.value)}
        >
          <Radio.Button value="a">收发报表</Radio.Button>
          <Radio.Button value="b">车间报表</Radio.Button>
          <Radio.Button value="c">修磨报表</Radio.Button>
        </Radio.Group>
      }
    >
      {reportType === 'a' && <InOutReport data={reportData.inOutReport as any} />}
      {reportType === 'b' && <WorkShopReport data={reportData.workshopReport as any} />}
      {reportType === 'c' && <FixReport data={reportData.fixReport as any} />}
    </Drawer>
  )
})
