import { Modal } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import {
  ProForm,
  ProFormCascader,
  ProFormDependency,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormText,
  ProFormTreeSelect
} from '@ant-design/pro-components'
import { str2tree } from '@/utils/common.ts'
import { asyncRoutes } from '@/routers/asyncModules'
import { Api } from '@/api'
import { useRef } from 'react'

/** 菜单类型 0: 目录 | 1: 菜单 | 2: 按钮权限 */
// const isDir = (type: API.MenuDto['type']) => type === "CATALOG"
const isMenu = (type: API.MenuDto['type']) => type === "MENU"
const isButton = (type: API.MenuDto['type']) => type === "ACCESS"
export default NiceModal.create(({ data, type = 'add' }: { data: any; type: string }) => {
  const modal = useModal()
  const formRef = useRef<ProFormInstance>()
  let initialValues: any = { type: 0, show: 1, status: 1, sort: 0 }
  // 从列表新增，自动填充父级菜单
  if (type === 'add' && data) {
    initialValues = { ...initialValues, parentId: data.id || -1 }
  }
  // 直接新增，填充
  if (type === 'edit') {
    initialValues = { ...data, parentId: data.parentId || -1 }
  }

  return (
    <Modal
      title={type === 'add' ? '新增' : '编辑'}
      open={modal.visible}
      onOk={async () => {
        const formData = await formRef.current?.validateFields?.()
        const values = {
          ...formData,
          parentId: formData.parentId === -1 ? undefined : formData.parentId
        }

        try {
          if (type === 'add') {
            await Api.systemMenu.menuCreate(values as API.MenuDto)
          } else {
            await Api.systemMenu.menuUpdate({ id: data.id }, values as API.MenuDto)
          }
          modal.resolve()
        } catch {
          modal.reject()
        }
      }}
      onCancel={modal.remove}
      maskClosable={false}
    >
      <ProForm<API.MenuEntity>
        formRef={formRef}
        initialValues={initialValues}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        submitter={false}
        layout="horizontal"
      >
        <ProFormRadio.Group
          name="type"
          label="菜单类型"
          rules={[{ required: true }]}
          options={[
            { label: '目录', value: 'CATALOG' },
            { label: '菜单', value: 'MENU' },
            { label: '权限', value: 'ACCESS' }
          ]}
        />
        <ProFormText
          rules={[{ required: true }]}
          name="name"
          label="名称"
          placeholder="请输入名称"
        />
        <ProFormTreeSelect
          rules={[{ required: true }]}
          label="上级节点"
          name="parentId"
          allowClear
          secondary
          request={async () => {
            const menuTree = await Api.systemMenu.menuList({})
            return [{ id: -1, name: '根目录', children: menuTree }]
          }}
          fieldProps={{
            suffixIcon: null,
            filterTreeNode: true,
            showSearch: true,
            popupMatchSelectWidth: false,
            autoClearSearchValue: true,
            treeNodeFilterProp: 'name',
            fieldNames: { label: 'name', value: 'id', children: 'children' }
          }}
        />
        <ProFormDependency name={['type']}>
          {({ type }) => (
            <>
              {isButton(type) && (
                <ProFormText
                  name="permission"
                  label="权限"
                  rules={[{ required: isButton(type) }]}
                />
              )}
              {!isButton(type) && (
                <ProFormText name="path" label="路由地址" rules={[{ required: true }]} />
              )}
              {isMenu(type) && (
                <ProFormCascader
                  name="component"
                  label="文件路径"
                  rules={[{ required: true }]}
                  fieldProps={{
                    options: Object.keys(asyncRoutes).reduce(
                      (prev, curr) => (str2tree(curr, prev, '/'), prev),
                      []
                    ),
                    onChange: (_: any, selectOptions: string | any[]) => {
                      const path = selectOptions[selectOptions.length - 1].path.replace(/:/g, '/')
                      formRef.current?.setFieldsValue({ component: path })
                    }
                  }}
                />
              )}
              {!isButton(type) && (
                <ProFormRadio.Group
                  name="show"
                  label="是否显示"
                  options={[
                    { label: '是', value: 1 },
                    { label: '否', value: 0 }
                  ]}
                />
              )}
            </>
          )}
        </ProFormDependency>
        <ProFormDigit label="排序号" name="sort" min={0} max={255} fieldProps={{ precision: 0 }} />
        <ProFormRadio.Group
          name="status"
          label="状态"
          tooltip="不会生成路由,同时左侧菜单不可见"
          options={[
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ]}
        />
      </ProForm>
    </Modal>
  )
})
