import { Modal } from 'antd';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
  ProForm, ProFormInstance,
  ProFormRadio,
  ProFormText, ProFormTextArea
} from '@ant-design/pro-components';
import { useRef } from 'react';

export const DictTypeModal =
  NiceModal.create(({ data, type = 'add'}: { data: any; type: string; }) => {
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
          <ProFormText
            rules={[{ required: true }]}
            name="name"
            label="字典名称"
          />
          <ProFormText
            rules={[{ required: true }]}
            name="code"
            label="字典编码"
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