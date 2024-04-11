import { formatToDate } from '@/utils/dateUtil';
import { ProColumns } from '@ant-design/pro-components';

export const baseColumns: ProColumns[] = [
  {
    title: '部门名称',
    dataIndex: 'name',
    align: 'left'
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 50,
    hideInSearch: true
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 200,
    hideInSearch: true,
    render: (_, record) => formatToDate(record.createdAt)
  }
];