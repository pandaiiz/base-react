import { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { menuList } from '@/api/backend/api/systemMenu.ts';
import { baseColumns } from '@/pages/system/menu/columns.tsx';
import { useRef, useState } from 'react';
import { useModal } from '@ebay/nice-modal-react';
import { MenuModal } from '@/pages/system/menu/menu-modal';

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

export default () => {
  const modal = useModal(MenuModal);


  const columns: ProColumns<TableListItem>[] = [
    ...baseColumns,
    {
      title: '操作',
      valueType: 'option',
      key: 'option', align: 'center',
      width: 160,
      fixed: 'right',
      render: (_text, record) => [
        <Button type="link" key="edit" onClick={() => modal.show({ data: record, type: 'edit' })}>
          编辑
        </Button>,
        <Button type="link" key="add" onClick={() => modal.show()}>新增</Button>
        // <Button type="link" key="delete" onClick={() => modal.show({ data: record, title: '编辑' })}>删除</Button>,
      ]
    }
  ];

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
  };
  const dataSourceRef = useRef<any>();

  return (
    <ProTable<TableListItem>
      onDataSourceChange={(data) => {
        dataSourceRef.current = data;
      }}
      columns={columns}
      actionRef={actionRef}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      request={async (params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        // console.log(params, sorter, filter);
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
      expandable={{ expandedRowKeys: expandKeys.length === 0 ? undefined : expandKeys }}
      columnEmptyText={false}
      dateFormatter="string"
      headerTitle="菜单管理"
      scroll={{ x: 2000, y: 800 }}
      toolBarRender={() => [
        <Button key="open" onClick={() => {
          setExpandKeys(getAllKeys(dataSourceRef.current));
        }}>展开全部</Button>,
        <Button key="close" onClick={() => {
          setExpandKeys([]);
        }}>折叠全部</Button>,
        <Button type="primary" key="primary" onClick={() => modal.show()}>
          新增
        </Button>
      ]}
    />
  );
};