import { useState } from 'react'

import { Card, DatePicker, Divider, Segmented, TimeRangePickerProps } from 'antd'
import DeptReport from './report/dept-report'
import SupplierReport from './report/supplier-report'
import PolishReport from './report/polish-report'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const { RangePicker } = DatePicker
const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
  if (dates) {
    console.log('From: ', dates[0], ', to: ', dates[1])
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
  } else {
    console.log('Clear')
  }
}

const rangePresets: TimeRangePickerProps['presets'] = [
  { label: '最近7天', value: [dayjs().subtract(7, 'day'), dayjs()] },
  { label: '最近14天', value: [dayjs().subtract(14, 'day'), dayjs()] },
  { label: '最近30天', value: [dayjs().subtract(30, 'day'), dayjs()] }
]
const KnifeToolReport = () => {
  const [reportType, setReportType] = useState<string>('部门')
  return (
    <Card>
      <Segmented<string>
        options={['部门', '修磨', '供应商']}
        value={reportType}
        onChange={(value) => {
          setReportType(value)
        }}
      />
      <RangePicker presets={rangePresets} onChange={onRangeChange} variant="filled" />

      <Divider />
      {reportType === '部门' && <DeptReport />}
      {reportType === '修磨' && <PolishReport />}
      {reportType === '供应商' && <SupplierReport />}
    </Card>
  )
}
export default KnifeToolReport
