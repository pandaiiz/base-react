import { Button, Drawer, Form, Input, Popconfirm, Space, message } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import {
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormSelect,
  ProFormText
} from '@ant-design/pro-components'
import { useRef, useState } from 'react'
import { addData, getDataList, updateData } from '@/utils/common'
import { ToolDto, ToolEntity } from '../types'
import { createDictItemByDictCode } from '@/pages/system/dict-item/api'
import { nanoid } from 'nanoid'

export const EditModal = NiceModal.create(
  ({ data, type = 'add' }: { data: ToolEntity; type: string }) => {
    const modal = useModal()
    const [refresh, setRefresh] = useState(false)
    const formRef = useRef<ProFormInstance>()
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()

    const onOk = async (operationType: number) => {
      const values = await formRef.current?.validateFields?.()
      if (type === 'add') {
        await addData('relationship/tool', { ...values, operationType })
      } else {
        await updateData('relationship/tool', { id: data.id }, { ...values, operationType })
      }
      modal.resolve(values)
    }
    return (
      <Drawer
        placement="bottom"
        title={type === 'add' ? '新增' : '编辑'}
        open={modal.visible}
        height="100%"
        onClose={modal.remove}
        maskClosable={false}
        extra={
          <Popconfirm
            title=""
            icon={false}
            onConfirm={async () => {
              await createDictItemByDictCode({
                dictCode: 'KNIFE_TOOL',
                ...form.getFieldsValue(),
                value: nanoid(12)
              })
              messageApi.success('创建成功！')
              setRefresh((refresh) => !refresh)
            }}
            onOpenChange={() => form.resetFields()}
            description={
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
              >
                <Form.Item
                  label="刀具名称"
                  name="label"
                  rules={[{ required: true, message: '请输入刀具名称' }]}
                >
                  <Input />
                </Form.Item>
              </Form>
            }
            cancelText="取消"
            okText="提交"
          >
            <Button>新建刀具</Button>
          </Popconfirm>
        }
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Space>
              <Button type="dashed" danger onClick={() => onOk(2)}>
                刀具出库
              </Button>
              <Button onClick={() => onOk(1)}>刀具入库</Button>
              <Button type="dashed" danger onClick={() => onOk(21)}>
                刀具修磨发出
              </Button>
              <Button onClick={() => onOk(22)}>刀具修磨收回</Button>
            </Space>
            <Space>
              <Button type="primary" onClick={() => onOk(11)}>
                刀具借出
              </Button>
              <Button onClick={() => onOk(12)}>刀具归还</Button>
            </Space>
          </div>
        }
      >
        {contextHolder}
        <ProForm<ToolDto>
          formRef={formRef}
          initialValues={data || { status: 1, quantity: 1 }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          submitter={false}
          layout="horizontal"
        >
          <ProFormSelect
            name="name"
            showSearch
            label="刀具名称"
            rules={[{ required: true }]}
            params={{ refresh }}
            request={() =>
              getDataList('system/dict-item/by-dict-code', {
                dictCode: 'KNIFE_TOOL'
              })
            }
            onChange={(_value, option) => {
              formRef.current?.setFieldsValue({ name: option.title })
              formRef.current?.setFieldsValue({ code: option.value })
            }}
          />
          <ProFormText name="code" label="刀具代码" hidden />
          <ProFormDigit
            name="quantity"
            label="件数"
            rules={[{ required: true, message: '请输入件数' }]}
            min={1}
            fieldProps={{ precision: 0 }}
          />
          <ProFormSelect
            name="supplierId"
            label="供应商"
            request={async () => {
              const response = await getDataList('relationship/supplier', { pageSize: -1 })
              return response.map((item: any) => ({
                label: item.name,
                value: item.id
              }))
            }}
          />
          <ProFormSelect
            name="receiverId"
            label="领取人员"
            request={async () => {
              const response = await getDataList('relationship/employee', { pageSize: -1 })
              return response.map((item: any) => ({
                label: item.name,
                value: item.id
              }))
            }}
          />
          <ProFormText name="remark" label="备注" />
        </ProForm>
      </Drawer>
    )
  }
)
