import { Modal } from 'antd';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

export const MyAntdModal = NiceModal.create(({ title, data, component }: { data: any; title: string; component: any }) => {
  const modal = useModal();
  console.log(data);
  return (
    <Modal
      title={title}
      open={modal.visible}
      onOk={modal.hide}
      onCancel={modal.hide}
      afterClose={modal.remove}
    >
      Greetings: {title}!
      {component}
    </Modal>
  );
});