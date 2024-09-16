import { Modal } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import {
  ProForm,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components'
import { useRef } from 'react'
import { deptList } from '@/api/backend/api/systemDept'
import { roleList } from '@/api/backend/api/systemRole'
import { userCreate, userUpdate } from '../api'

export default NiceModal.create(
  ({ data, type = 'add' }: { data?: API.UserEntity; type?: 'add' | 'edit' }) => {
    const modal = useModal()
    const formRef = useRef<ProFormInstance>()

    const handleOk = async () => {
      const values = await formRef.current?.validateFields()
      values.avatar = values.avatar[0].response.data.filename
      if (type === 'add') {
        await userCreate(values)
      } else if (data?.id) {
        await userUpdate(data.id, values)
      } else {
        throw new Error('Invalid user ID for update')
      }
      modal.resolve(true)
    }

    return (
      <Modal
        title={type === 'add' ? '新增' : '编辑'}
        open={modal.visible}
        onOk={handleOk}
        onCancel={modal.remove}
        maskClosable={false}
      >
        <ProForm<API.UserEntity>
          formRef={formRef}
          initialValues={{ ...data, status: data?.status ?? 1 }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          submitter={false}
          layout="horizontal"
        >
          <ProFormSelect
            rules={[{ required: true, message: '请选择所属部门' }]}
            name="deptId"
            label="所属部门"
            request={() => deptList({ pageSize: -1 })}
            // disabled={!!data}
            fieldProps={{
              fieldNames: { value: 'id', label: 'name' },
              showSearch: true
            }}
          />
          <ProFormSelect
            rules={[{ required: true, type: 'array', min: 1, message: '请选择所属角色' }]}
            name="roleIds"
            label="所属角色"
            request={() => roleList({ pageSize: -1 })}
            // disabled={!!data}
            fieldProps={{
              mode: 'multiple',
              fieldNames: { value: 'id', label: 'name' },
              showSearch: true
            }}
          />
          <ProFormText
            rules={[{ required: true, message: '请输入用户名' }]}
            name="username"
            label="用户名"
          />
          <ProFormText.Password
            rules={[{ required: type === 'add', message: '请输入密码' }]}
            name="password"
            label="密码"
            placeholder={type === 'edit' ? '不修改请留空' : undefined}
          />
          <ProFormText name="nickname" label="昵称" />
          <ProFormTextArea name="remark" label="备注" />
          <ProFormRadio.Group
            name="status"
            label="状态"
            options={[
              { label: '启用', value: 1 },
              { label: '禁用', value: 0 }
            ]}
          />
        </ProForm>
      </Modal>
    )
  }
)
