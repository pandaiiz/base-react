import { Button, Drawer, Form, Input, Popconfirm, Space, message } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import {
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText
} from '@ant-design/pro-components'
import { useRef, useState } from 'react'
import { addData, getDataList, updateData } from '@/utils/common'
import { ToolDto, ToolEntity } from '../types'
import { createDictItemByDictCode } from '@/pages/system/dict-item/api'
import { nanoid } from 'nanoid'
import { operationTypes } from '../columns'

export const EditModal = NiceModal.create(
  ({ data, type = 'add' }: { data: ToolEntity; type: string }) => {
    const modal = useModal()
    const [refresh, setRefresh] = useState(false)
    const formRef = useRef<ProFormInstance>()
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const [currentOperationType, setCurrentOperationType] = useState()

    const onOk = async () => {
      const values = await formRef.current?.validateFields?.()
      if (type === 'add') {
        await addData('io/knife-tool', values)
      } else {
        await updateData(`io/knife-tool/${data.id}`, values)
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
          <Space style={{ float: 'right' }}>
            <Button onClick={() => modal.remove()}>取消</Button>
            <Button type="primary" onClick={onOk}>
              确定
            </Button>
          </Space>
        }
      >
        {contextHolder}
        <ProForm<ToolDto>
          formRef={formRef}
          initialValues={data || { status: 1, quantity: 1 }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          submitter={false}
          layout="horizontal"
        >
          <ProFormRadio.Group
            rules={[{ required: true }]}
            radioType="button"
            fieldProps={{
              buttonStyle: 'solid',
              onChange: (e) => setCurrentOperationType(e.target.value)
            }}
            name="operationType"
            label="操作类型"
            options={operationTypes}
          />
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
            rules={[
              {
                required:
                  currentOperationType !== 11 &&
                  currentOperationType !== 12 &&
                  currentOperationType !== 31
              }
            ]}
            disabled={
              currentOperationType === 11 ||
              currentOperationType === 12 ||
              currentOperationType === 31
            }
            name="supplierId"
            showSearch
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
            rules={[
              {
                required:
                  currentOperationType === 11 ||
                  currentOperationType === 12 ||
                  currentOperationType === 31
              }
            ]}
            disabled={
              currentOperationType !== 11 &&
              currentOperationType !== 12 &&
              currentOperationType !== 31
            }
            name="deptId"
            showSearch
            label="部门"
            request={async () => {
              const response = await getDataList('system/depts', { pageSize: -1 })
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
