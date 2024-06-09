import { Modal } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components'
import { useRef } from 'react'
import { Api } from '@/api'

export const EditModal = NiceModal.create(({ data, type = 'add' }: { data: any; type: string }) => {
  const modal = useModal()
  const formRef = useRef<ProFormInstance>()

  const onOk = async () => {
    const values = await formRef.current?.validateFields?.()
    if (type === 'add') {
      await Api.relationshipSupplier.relationshipSupplierCreate(values as API.DictTypeDto)
    } else {
      await Api.relationshipSupplier.relationshipSupplierUpdate(
        { id: data.id },
        values as API.DictTypeDto
      )
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
      <ProForm<{
        name: string
        company?: string
        useMode?: string
      }>
        formRef={formRef}
        initialValues={data || { status: 1 }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        submitter={false}
        layout="horizontal"
      >
        <ProFormText rules={[{ required: true }]} name="name" label="供应商名称" />
        <ProFormText rules={[{ required: true }]} name="code" label="供应商编码" />
      </ProForm>
    </Modal>
  )
})
