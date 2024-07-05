import { Modal } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components'
import { useRef } from 'react'
import { Api } from '@/api'
import CustomerEntity = API.CustomerEntity

const EditModal = NiceModal.create(({ data, type = 'add' }: { data: any; type: string }) => {
  const modal = useModal()
  const formRef = useRef<ProFormInstance>()

  const onOk = async () => {
    const values = await formRef.current?.validateFields?.()
    if (type === 'add') {
      await Api.relationshipCustomer.relationshipCustomerCreate(values)
    } else {
      await Api.relationshipCustomer.relationshipCustomerUpdate({ id: data.id }, values)
    }
    modal.resolve(values)
  }
  return (
    <Modal
      title={type === 'add' ? '新增' : '编辑'}
      open={modal.visible}
      onOk={onOk}
      onCancel={modal.remove}
      maskClosable={false}
    >
      <ProForm<CustomerEntity>
        formRef={formRef}
        initialValues={data || { status: 1 }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        submitter={false}
        layout="horizontal"
      >
        <ProFormText rules={[{ required: true }]} name="name" label="客户名称" />
        <ProFormText rules={[{ required: true }]} name="code" label="客户编码" />
      </ProForm>
    </Modal>
  )
})
export default EditModal
