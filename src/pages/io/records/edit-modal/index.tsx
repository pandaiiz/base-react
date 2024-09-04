import { Button, Drawer } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import {
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components'
import { useRef } from 'react'
import { Api } from '@/api'
import CustomerEntity = API.CustomerEntity

const EditModal = NiceModal.create(({ data, type = 'add' }: { data: any; type: string }) => {
  const modal = useModal()
  const formRef = useRef<ProFormInstance>()

  const onOk = async () => {
    const values = await formRef.current?.validateFields?.()
    if (type === 'add') {
      await Api.ioOrder.ioOrderCreate(values)
    } else {
      await Api.ioOrder.ioOrderUpdate({ id: data.id }, values)
    }
    modal.resolve(values)
  }
  return (
    <Drawer
      title={type === 'add' ? '新增' : '编辑'}
      open={modal.visible}
      placement="bottom"
      onClose={modal.remove}
      maskClosable={false}
      height="100%"
      destroyOnClose
      footer={
        <Button type="primary" onClick={onOk}>
          确定
        </Button>
      }
    >
      <ProForm<CustomerEntity>
        formRef={formRef}
        initialValues={data || { status: 1 }}
        labelCol={{ span: 4 }}
        // wrapperCol={{ span: 16 }}
        submitter={false}
        layout="horizontal"
      >
        <ProFormDigit rules={[{ required: true }]} name="quantity" label="流程单号" />
        <ProFormDigit rules={[{ required: true }]} name="singleWeight" label="部门名称" />
        <ProFormDigit rules={[{ required: true }]} name="totalWeight" label="类型" />
        <ProFormDigit rules={[{ required: true }]} name="totalWeight" label="出入库" />
        <ProFormDigit rules={[{ required: true }]} name="totalWeight" label="重量" />
        <ProFormDigit rules={[{ required: true }]} name="totalWeight" label="件数" />
        <ProFormTextArea rules={[{ required: true }]} name="totalWeight" label="备注" />
        <ProFormDigit rules={[{ required: true }]} name="totalWeight" label="品名" />
        <ProFormText rules={[{ required: true }]} name="remark" label="备注" />
      </ProForm>
    </Drawer>
  )
})
export default EditModal
