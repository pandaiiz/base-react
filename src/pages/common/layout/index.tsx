import { LogoutOutlined } from '@ant-design/icons'
import { PageContainer, ProConfigProvider, ProLayout } from '@ant-design/pro-components'
import { ConfigProvider, Dropdown } from 'antd'
import { Suspense, useEffect } from 'react'
import { defaultSetting } from '@/config/default-setting.ts'
import { usePermissionStore, useTokenStore, useUserStore } from '@/stores/user.store.ts'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const Layout = () => {
  const { menus, getPermissions } = usePermissionStore((state) => ({
    menus: state.menus,
    getPermissions: state.getPermissions
  }))
  const logout = useTokenStore((state) => () => state.logout())
  const userInfo = useUserStore((state) => state.userInfo)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => {
    if (menus.length === 0) getPermissions()
  }, [getPermissions, menus.length])

  return (
    menus &&
    menus.length > 0 && (
      <div
        id="test-pro-layout"
        style={
          {
            // height: '100vh',
            // overflow: 'auto',
          }
        }
      >
        <ProConfigProvider hashed={false}>
          <ConfigProvider
            getTargetContainer={() => {
              return document.getElementById('test-pro-layout') || document.body
            }}
          >
            <Suspense fallback={<h2>加载中....</h2>}>
              <ProLayout
                /*headerContentRender={() => {
                return <ProBreadcrumb />;
              }}*/
                location={{ pathname }}
                token={{
                  header: {
                    colorBgMenuItemSelected: 'rgba(0,0,0,0.04)'
                  }
                }}
                siderMenuType="group"
                menu={{
                  request: async () => menus || []
                }}
                avatarProps={{
                  src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                  size: 'small',
                  title: userInfo?.nickname,
                  render: (_props, dom) => {
                    return (
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: 'logout',
                              icon: <LogoutOutlined />,
                              label: '退出登录',
                              onClick: () => logout()
                            }
                          ]
                        }}
                      >
                        {dom}
                      </Dropdown>
                    )
                  }
                }}
                headerTitleRender={(logo, title, _) => {
                  const defaultDom = (
                    <a>
                      {logo}
                      {title}
                    </a>
                  )
                  if (document.body.clientWidth < 1400) {
                    return defaultDom
                  }
                  if (_.isMobile) return defaultDom
                  return <>{defaultDom}</>
                }}
                onMenuHeaderClick={(e) => console.log(e)}
                menuItemRender={(item, dom) => (
                  <div onClick={() => navigate(item.path || '/welcome')}>{dom}</div>
                )}
                {...defaultSetting}
              >
                <PageContainer
                  header={{ breadcrumb: {}, title: '' }}
                  token={{ paddingInlinePageContainerContent: 40 }}
                >
                  <Outlet />
                </PageContainer>
              </ProLayout>
            </Suspense>
          </ConfigProvider>
        </ProConfigProvider>
      </div>
    )
  )
}

export default Layout
