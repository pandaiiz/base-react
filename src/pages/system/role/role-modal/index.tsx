import { Card, Modal, Tree } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import {
  ProForm,
  ProFormInstance,
  ProFormRadio,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components'
import { useRef } from 'react'

export const RoleModal = NiceModal.create(
  ({ data, type = 'add', treeData = [] }: { data: any; type: string; treeData: any[] }) => {
    const treeCheckedKeys = data?.menuIds || []
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
          <ProFormText rules={[{ required: true }]} name="name" label="角色名称" />
          <ProFormText rules={[{ required: true }]} name="value" label="角色值" />
          <ProFormRadio.Group
            name="status"
            label="状态"
            options={[
              { label: '启用', value: 1 },
              { label: '禁用', value: 0 }
            ]}
          />
          <ProFormTextArea name="remark" label="备注" />
          <ProForm.Item label="菜单权限" name="menuIds">
            <Card style={{ maxHeight: 200, overflowY: 'auto', padding: 0 }}>
              <Tree
                checkable
                onCheck={(checkedKeys) => {
                  formRef.current?.setFieldValue('menuIds', checkedKeys)
                }}
                defaultCheckedKeys={treeCheckedKeys}
                fieldNames={{ title: 'name', key: 'id' }}
                treeData={treeData}
              />
            </Card>
          </ProForm.Item>
        </ProForm>
      </Modal>
    )
  }
)
