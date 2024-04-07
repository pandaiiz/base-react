import { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { menuList } from '@/api/backend/api/systemMenu.ts';
import { baseColumns } from '@/pages/system/menu/columns.tsx';
import { useRef, useState } from 'react';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error'
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
        : '简短备注文案'
  });
}

const columns: ProColumns<TableListItem>[] = [
  ...baseColumns,
  {
    title: '操作',
    valueType: 'option',
    key: 'option', align: 'center',
    width: 120,
    fixed: 'right',
    render: (_text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="delete">
        删除
      </a>
    ]
  }
  /*{
    title: '状态',
    width: 80,
    dataIndex: 'status',
    initialValue: 'all',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
      error: { text: '异常', status: 'Error' }
    }
  },
  {
    title: '创建时间',
    tooltip: '这是一段描述',
    width: 140,
    key: 'since',
    hideInSearch: true,
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: (a, b) => a.createdAt - b.createdAt
  }*/
];

export default () => {
  const [expandKeys, setExpandKeys] = useState<any[]>([]);
  const actionRef = useRef<ActionType>();

  const getAllKeys = (data: any[]): any[] => {
    const keys: string[] = [];
    data.forEach((item) => {
      keys.push(item.id);
      const children = item['children'];
      if (children?.length) {
        keys.push(...getAllKeys(children));
      }
    });
    return keys;
  }
  const dataSourceRef = useRef<any>();

  return (
    <ProTable<TableListItem>
      onDataSourceChange={(data) => {
        dataSourceRef.current = data;
      }}
      columns={columns}
      actionRef={actionRef}
      request={async (params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        const data = await menuList({ name: params.name });

        return {
          data,
          // success 请返回 true，
          // 不然 table 会停止解析数据，即使有数据
          success: true
          // 不传会使用 data 的长度，如果是分页一定要传
          // total: number,
        };
      }}
      rowKey="id"
      pagination={{
        showQuickJumper: true
      }}
      search={{
        optionRender: false,
        collapsed: false
      }}
      expandable={{ expandedRowKeys: expandKeys }}
      columnEmptyText={false}
      dateFormatter="string"
      headerTitle="菜单管理"
      scroll={{ x: 2000, y: 800 }}
      toolBarRender={() => [
        <Button key="open" onClick={() => {
          setExpandKeys(getAllKeys(dataSourceRef.current))
        }}>展开全部</Button>,
        <Button key="close" onClick={() => {
          setExpandKeys([])
        }}>折叠全部</Button>,
        <Button type="primary" key="primary">
          新增
        </Button>
      ]}
    />
  );
};