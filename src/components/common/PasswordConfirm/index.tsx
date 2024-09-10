import { Modal, message } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components'
import { useRef } from 'react'

export const PassWordConfirmModal = NiceModal.create(() => {
  const modal = useModal()

  const formRef = useRef<ProFormInstance>()
  const [messageApi, contextHolder] = message.useMessage()
  const onOk = async () => {
    const values = await formRef.current?.validateFields?.()
    if (values.password !== '123123') {
      modal.resolve(false)
      messageApi.error('密码错误！')
    }
    modal.resolve(true)
  }
  return (
    <Modal
      title="请输入密码"
      onOk={onOk}
      open={modal.visible}
      onClose={modal.remove}
      onCancel={modal.remove}
      maskClosable={false}
    >
      {contextHolder}
      <ProForm
        formRef={formRef}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        submitter={false}
        layout="horizontal"
      >
        <ProFormText.Password name="password" label="密码" />
      </ProForm>
    </Modal>
  )
})
