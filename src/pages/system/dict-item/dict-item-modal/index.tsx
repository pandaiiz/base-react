import { Modal } from 'antd';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
  ProForm, ProFormDigit, ProFormInstance,
  ProFormRadio, ProFormSelect,
  ProFormText, ProFormTextArea
} from '@ant-design/pro-components';
import { useRef } from 'react';
import { dictTypeGetAll } from '@/api/backend/api/systemDictType.ts';

export const DictItemModal =
  NiceModal.create(({ data, type = 'add' }: { data: any; type: string; }) => {
    const modal = useModal();
    const formRef = useRef<ProFormInstance>();

    return (
      <Modal
        title={type === 'add' ? '新增' : '编辑'}
        open={modal.visible}
        onOk={async () => {
          const values = await formRef.current?.validateFields?.();
          modal.resolve(values);
        }}
        onCancel={modal.remove}
        maskClosable={false}
      >
        <ProForm<{
          name: string;
          company?: string;
          useMode?: string;
        }>
          formRef={formRef}
          initialValues={data || { status: 1 }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          submitter={false}
          layout="horizontal"
        >
          <ProFormSelect
            rules={[{ required: true }]}
            name="typeId"
            label="所属字典类型"
            request={() => dictTypeGetAll()}
            disabled={data}
            fieldProps={{
              fieldNames: {
                value: 'id',
                label: 'name'
              },
              showSearch: true
            }}
          />
          <ProFormText
            rules={[{ required: true }]}
            name="label"
            label="字典项名称"
          />
          <ProFormText
            rules={[{ required: true }]}
            name="value"
            label="字典项值"
          />
          <ProFormDigit
            label="排序号"
            name="orderNo"
            min={0}
            max={255}
            fieldProps={{ precision: 0 }}
          />
          <ProFormRadio.Group
            name="status"
            label="状态"
            options={[
              { label: '启用', value: 1 },
              { label: '禁用', value: 0 }
            ]}
          />
          <ProFormTextArea
            name="remark"
            label="备注"
          />
        </ProForm>
      </Modal>
    );
  });