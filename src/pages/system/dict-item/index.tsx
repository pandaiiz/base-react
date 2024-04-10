import { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { baseColumns } from '@/pages/system/dict-item/columns.tsx';
import { useRef } from 'react';
import { useModal } from '@ebay/nice-modal-react';
import { Api } from '@/api';
import deleteConfirm from '@/components/common/DeleteConfirm';
import { DictItemModal } from '@/pages/system/dict-item/dict-item-modal';
import { dictItemList } from '@/api/backend/api/systemDictItem.ts';

export type TableListItem = any
const dictItemCreate = async (modal: any, ref: any) => {
  // const treeData = await Api.systemMenu.menuList({});
  const values: API.DictItemDto = await modal.show();

  try {
    await Api.systemDictItem.dictItemCreate(values as API.DictItemDto);
    modal.remove();
    ref.current?.reload();
  } catch (e) { /* empty */
  }
};

const dictItemUpdate = async (modal: any, record: any, ref: any) => {
  const values: API.DictItemDto = await modal.show({ data: record, type: 'edit' });
  try {
    await Api.systemDictItem.dictItemUpdate({ id: record.id }, values as API.DictItemDto);
    modal.remove();
    ref.current?.reload();
  } catch (e) { /* empty */
  }

};


export default () => {
  const modal = useModal(DictItemModal);

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    ...baseColumns,
    {
      title: '操作',
      valueType: 'option',
      key: 'option', align: 'center',
      width: 160,
      fixed: 'right',
      render: (_text, record) => [
        <Button type="link" key="edit" onClick={() => dictItemUpdate(modal, record, actionRef)}>编辑</Button>,
        <Button type="link" key="delete"
                onClick={() => deleteConfirm(Api.systemDictItem.dictItemDelete, record, actionRef)}>删除</Button>
      ]
    }
  ];

  const dataSourceRef = useRef<any>();

  return (
    <ProTable<TableListItem>
      onDataSourceChange={(data) => {
        dataSourceRef.current = data;
      }}
      columns={columns}
      actionRef={actionRef}
      request={async (params) => {
        // if (params.name === '') delete params.name;
        // if (params.path === '') delete params.path;
        // if (params.component === '') delete params.component;
        // 表单搜索项会从 params 传入，传递给后端接口。
        const data = await dictItemList(params as API.DictItemListParams);
        return { data: data.items, success: true, total: data.meta?.itemCount };
      }}
      rowKey="id"
      // pagination={false}
      columnEmptyText={false}
      dateFormatter="string"
      scroll={{ y: 800 }}
      toolBarRender={() => [
        <Button type="primary" key="primary" onClick={() => dictItemCreate(modal, actionRef)}>
          新增
        </Button>
      ]}
    />
  );
};