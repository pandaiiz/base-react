import { Modal } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import {
  ProForm,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger
} from '@ant-design/pro-components'
import { useRef } from 'react'
import { deptList } from '@/api/backend/api/systemDept'
import { roleList } from '@/api/backend/api/systemRole'

export default NiceModal.create(
  ({ data, type = 'add' }: { data: any; type: string; treeData: any[] }) => {
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
        <ProForm<API.UserEntity>
          formRef={formRef}
          initialValues={data || { status: 1 }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          submitter={false}
          layout="horizontal"
        >
          <ProFormUploadDragger label="头像" name="avatar" action="api/tools/upload" />

          <ProFormSelect
            rules={[{ required: true }]}
            name="deptId"
            label="所属部门"
            request={() => deptList({})}
            disabled={data}
            fieldProps={{
              fieldNames: {
                value: 'id',
                label: 'name'
              },
              showSearch: true
            }}
          />
          <ProFormSelect
            rules={[{ required: true, type: 'array', min: 1, message: '请选择所属角色' }]}
            name="roleIds"
            label="所属角色"
            request={async () => {
              const { list } = await roleList({})
              return list || []
            }}
            disabled={data}
            fieldProps={{
              mode: 'multiple',
              fieldNames: {
                value: 'id',
                label: 'name'
              },
              showSearch: true
            }}
          />
          <ProFormText rules={[{ required: true }]} name="username" label="用户名" />
          <ProFormText.Password rules={[{ required: true }]} name="password" label="密码" />
          <ProFormText name="nickname" label="呢称" />
          <ProFormText rules={[{ type: 'email' }]} name="email" label="邮箱" />
          <ProFormText name="phone" label="手机" />
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
