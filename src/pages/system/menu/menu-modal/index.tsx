import { Modal } from 'antd';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
  ProForm,
  ProFormCascader,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTreeSelect
} from '@ant-design/pro-components';
import { str2tree } from '@/utils/common.ts';
import { asyncRoutes } from '@/routers/asyncModules';
import { Api } from '@/api';

/** 菜单类型 0: 目录 | 1: 菜单 | 2: 按钮 */
const isDir = (type: API.MenuDto['type']) => type === 0;
const isMenu = (type: API.MenuDto['type']) => type === 1;
const isButton = (type: API.MenuDto['type']) => type === 2;
export const MenuModal =
  NiceModal.create(({ data, type = 'add' }: { data: any; type: string; }) => {
    const modal = useModal();
    return (
      <Modal
        title={type === 'add' ? '新增' : '编辑'}
        open={modal.visible}
        onOk={modal.hide}
        onCancel={modal.hide}
        afterClose={modal.remove}
      >
        <ProForm<{
          name: string;
          company?: string;
          useMode?: string;
        }>
          initialValues={{ ...data, parentId: data.parentId || -1 }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          submitter={false}
          layout="horizontal"
          /*submitter={{
            render: (props, doms) => {
              return formLayoutType === LAYOUT_TYPE_HORIZONTAL ? (
                <Row>
                  <Col span={14} offset={4}>
                    <Space>{doms}</Space>
                  </Col>
                </Row>
              ) : (
                doms
              );
            },
          }}*/
          onFinish={async (values) => {
            // await waitTime(2000);
            console.log(values);
            // message.success('提交成功');
          }}
        >
          <ProFormRadio.Group
            required
            name="type"
            label="菜单类型"
            options={[
              { label: '目录', value: 0 },
              { label: '菜单', value: 1 },
              { label: '权限', value: 2 }
            ]}
          />
          <ProFormText
            required
            name="name"
            label="权限/节点名称"
            placeholder="请输入权限名称/节点名称"

          />
          <ProFormTreeSelect
            required
            label="上级节点"
            name="parentId"
            allowClear
            secondary
            request={async () => {
              const menuTree = await Api.systemMenu.menuList({});
              return [{ id: -1, name: '根目录', children: menuTree }];
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
            {({ type }) =>
              <>
                {!isDir(type) && <ProFormText name="permission" label="权限" required={isButton(type)} />}
                {!isButton(type) && <ProFormText name="path" label="路由地址" required />}
                {isMenu(type) &&
                  <ProFormCascader
                    name="component"
                    label="文件路径"
                    required
                    fieldProps={{
                      options: Object.keys(asyncRoutes).reduce(
                        (prev, curr) => (str2tree(curr, prev, '/'), prev),
                        []
                      )
                    }}
                  />}
                {
                  !isButton(type) &&
                  <ProFormRadio.Group
                    name="show"
                    label="是否显示"
                    options={[
                      { label: '是', value: 1 },
                      { label: '否', value: 0 }
                    ]}
                  />
                }
              </>
            }
          </ProFormDependency>
          <ProFormDigit
            label="排序号"
            name="orderNo"
            min={1}
            max={255}
            fieldProps={{ precision: 0 }}
          />
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
    );
  });