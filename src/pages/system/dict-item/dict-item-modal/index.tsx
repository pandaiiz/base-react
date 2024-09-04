import { Modal } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import {
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components'
import { useRef } from 'react'
import { Api } from '@/api'

const DictItemModal = NiceModal.create(({ data, type = 'add' }: { data: any; type: string }) => {
  const modal = useModal()
  const formRef = useRef<ProFormInstance>()
  const onOK = async () => {
    const values = { ...(await formRef.current?.validateFields?.()), typeId: data.typeId }
    if (type === 'add') {
      await Api.systemDictItem.dictItemCreate(values as API.DictItemDto)
    } else {
      await Api.systemDictItem.dictItemUpdate({ id: data.id }, values as API.DictItemDto)
    }
    modal.resolve(values)
  }
  return (
    <Modal
      title={type === 'add' ? '新增' : '编辑'}
      open={modal.visible}
      onOk={onOK}
      onCancel={modal.remove}
      maskClosable={false}
    >
      <ProForm<{
        name: string
        company?: string
        useMode?: string
      }>
        formRef={formRef}
        initialValues={type === 'add' ? { status: 1 } : data}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        submitter={false}
        layout="horizontal"
      >
        <ProFormText rules={[{ required: true }]} name="label" label="字典项名称" />
        <ProFormText rules={[{ required: true }]} name="value" label="字典项值" />
        <ProFormDigit label="排序号" name="sort" min={0} max={255} fieldProps={{ precision: 0 }} />
        <ProFormRadio.Group
          name="status"
          label="状态"
          options={[
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ]}
        />
        <ProFormTextArea name="remark" label="备注" />
      </ProForm>
    </Modal>
  )
})
export default DictItemModal
