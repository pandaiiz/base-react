import { LogoutOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout
} from '@ant-design/pro-components';
import { Button, ConfigProvider, Dropdown } from 'antd';
import { Suspense, useState } from 'react';
import { defaultSetting } from '@/config/default-setting.ts';
import { useTokenStore } from '@/stores/user.store.ts';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import customMenu from '@/pages/common/layout/customMenu.ts';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const serviceData: any[] = customMenu;
export default () => {
  const logout = useTokenStore((state) => () => state.logout());
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [num, setNum] = useState(40);
  if (typeof document === 'undefined') {
    return <div />;
  }
  return (
    <div
      id="test-pro-layout"
      style={{
        // height: '100vh',
        // overflow: 'auto',
      }}
    >
      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById('test-pro-layout') || document.body;
          }}
        >
          <Suspense fallback={<h2>加载中11....</h2>}>
            <ProLayout
              location={{ pathname }}
              token={{
                header: {
                  colorBgMenuItemSelected: 'rgba(0,0,0,0.04)'
                }
              }}
              siderMenuType="group"
              menu={{
                request: async () => {
                  await waitTime(10);
                  return serviceData;
                }
              }}
              avatarProps={{
                src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                size: 'small',
                title: '七妮妮',
                render: (_props, dom) => {
                  return (
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: 'logout',
                            icon: <LogoutOutlined />,
                            label: '退出登录',
                            onClick: () => {
                              logout();
                              navigate('/login');
                            }
                          }
                        ]
                      }}
                    >
                      {dom}
                    </Dropdown>
                  );
                }
              }}
              headerTitleRender={(logo, title, _) => {
                const defaultDom = (
                  <a>
                    {logo}
                    {title}
                  </a>
                );
                if (typeof window === 'undefined') return defaultDom;
                if (document.body.clientWidth < 1400) {
                  return defaultDom;
                }
                if (_.isMobile) return defaultDom;
                return <>{defaultDom}</>;
              }}
              onMenuHeaderClick={(e) => console.log(e)}
              menuItemRender={(item, dom) => (
                <div onClick={() => navigate(item.path || '/welcome')}>
                  {dom}
                </div>
              )}
              {...defaultSetting}
            >
              <PageContainer
                token={{
                  paddingInlinePageContainerContent: num
                }}
                extra={[
                  <Button key="3">操作</Button>,
                  <Button key="2">操作</Button>,
                  <Button
                    key="1"
                    type="primary"
                    onClick={() => {
                      setNum(num > 0 ? 0 : 40);
                    }}
                  >
                    主操作
                  </Button>
                ]}
                subTitle="简单的描述"
              >
                <ProCard
                  style={{
                    // height: '200vh',
                    minHeight: 800
                  }}
                >
                  <Outlet />
                </ProCard>
              </PageContainer>
            </ProLayout>
          </Suspense>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
};
