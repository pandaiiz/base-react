import { Modal } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import {
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormSwitch,
  ProFormText
} from '@ant-design/pro-components'
import { useRef } from 'react'
import { Api } from '@/api'

const DeptModal = NiceModal.create(({ data, type = 'add' }: { data: any; type: string }) => {
  const modal = useModal()
  const formRef = useRef<ProFormInstance>()
  const onOk = async () => {
    const values = await formRef.current?.validateFields?.()
    if (type === 'add') {
      await Api.systemDept.deptCreate(values)
    } else {
      await Api.systemDept.deptUpdate({ id: data.id }, values)
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
      <ProForm<API.DeptEntity>
        formRef={formRef}
        initialValues={data}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        submitter={false}
        layout="horizontal"
      >
        <ProFormText rules={[{ required: true }]} name="name" label="部门名称" />
        <ProFormSwitch name="useKnifeTool" label="使用刀具" />
        <ProFormDigit label="排序号" name="sort" min={0} max={255} fieldProps={{ precision: 0 }} />
      </ProForm>
    </Modal>
  )
})

export default DeptModal
