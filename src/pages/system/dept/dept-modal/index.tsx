import { Modal } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { ProForm, ProFormDigit, ProFormInstance, ProFormText } from '@ant-design/pro-components'
import { useRef } from 'react'

export const DeptModal = NiceModal.create(({ data, type = 'add' }: { data: any; type: string }) => {
  const modal = useModal()
  const formRef = useRef<ProFormInstance>()

  return (
    <Modal
      title={type === 'add' ? '新增' : '编辑'}
      open={modal.visible}
      onOk={async () => {
        const values = await formRef.current?.validateFields?.()
        modal.resolve(values)
      }}
      onCancel={modal.remove}
      maskClosable={false}
    >
      <ProForm<API.DeptEntity>
        formRef={formRef}
        initialValues={data}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        submitter={false}
        layout="horizontal"
      >
        <ProFormText rules={[{ required: true }]} name="name" label="部门名称" />
        <ProFormDigit label="排序号" name="sort" min={0} max={255} fieldProps={{ precision: 0 }} />
      </ProForm>
    </Modal>
  )
})
