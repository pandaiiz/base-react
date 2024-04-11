import { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { baseColumns } from '@/pages/system/dict-item/columns.tsx';
import { useEffect, useRef } from 'react';
import { useModal } from '@ebay/nice-modal-react';
import { Api } from '@/api';
import deleteConfirm from '@/components/common/DeleteConfirm';
import { DictItemModal } from '@/pages/system/dict-item/dict-item-modal';
import { dictItemList } from '@/api/backend/api/systemDictItem.ts';
import { useParams } from 'react-router-dom';

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
  const { id } = useParams();


  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (id && formRef.current) {
      formRef.current.setFieldsValue({ typeId: Number(id) });
    }
  }, [formRef, id]);


  const columns: ProColumns<TableListItem>[] = [
    ...baseColumns,
    {
      title: '操作',
      valueType: 'option',
      key: 'option', align: 'center',
      width: 160,
      fixed: 'right',
      render: (_text, record) => [
        <Button type="link" key="edit"
                onClick={() => dictItemUpdate(modal, { ...record, typeId: Number(id) }, actionRef)}>编辑</Button>,
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
      formRef={formRef}
      request={async (params) => {
        // if (params.name === '') delete params.name;
        // if (params.path === '') delete params.path;
        // if (params.component === '') delete params.component;
        // 表单搜索项会从 params 传入，传递给后端接口。
        const data = await dictItemList(params.typeId ? params as API.DictItemListParams : {
          ...params,
          typeId: Number(id)
        } as API.DictItemListParams);
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