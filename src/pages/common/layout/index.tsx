import { LogoutOutlined } from '@ant-design/icons'
import { PageContainer, ProConfigProvider, ProLayout } from '@ant-design/pro-components'
import { ConfigProvider, Dropdown } from 'antd'
import { Suspense } from 'react'
import { defaultSetting } from '@/config/default-setting.ts'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSystemStore } from '@/stores/system.store'

const Layout = () => {
  const { menuList, logout, userInfo } = useSystemStore((state) => ({
    menuList: state.menuList,
    logout: state.logout,
    userInfo: state.userInfo,
    setMenuList: state.setMenuList,
    setPermissions: state.setPermissions
  }))

  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    menuList &&
    menuList.length > 0 && (
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
                  request: async () => menuList || []
                }}
                avatarProps={{
                  src: userInfo?.avatar,
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
                              onClick: () => {
                                logout()
                                navigate('/login')
                              }
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
