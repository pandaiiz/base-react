import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LoginForm, ProFormText } from '@ant-design/pro-components'
import reactLogo from '../../../assets/react.svg'
import { useNavigate } from 'react-router-dom'
import { useSystemStore } from '@/stores/system.store'
import { accountInfo, accountMenus, accountPermissions, login } from './api'
import { FC, useEffect } from 'react'
import { useRequest, useAsyncEffect } from 'ahooks'

export const Login: FC = () => {
  const navigate = useNavigate()
  const { setUserInfo, setToken, token, setMenuList, setPermissions, setIsLoggedIn } =
    useSystemStore((state) => ({
      token: state.token,
      setToken: state.setToken,
      setUserInfo: state.setUserInfo,
      setMenuList: state.setMenuList,
      setPermissions: state.setPermissions,
      setIsLoggedIn: state.setIsLoggedIn
    }))

  const { data: tokenData, run: authLogin } = useRequest(login, {
    manual: true
  })

  useEffect(() => {
    if (tokenData?.token) setToken(tokenData.token)
  }, [tokenData, setToken])

  useAsyncEffect(async () => {
    if (token) {
      const [accountInfoResult, accountMenusResult, accountPermissionsResult] = await Promise.all([
        accountInfo(),
        accountMenus(),
        accountPermissions()
      ])
      setUserInfo(accountInfoResult)
      setMenuList(accountMenusResult)
      setPermissions(accountPermissionsResult)
      setIsLoggedIn(true)
      navigate('/')
    }
  }, [token])

  const onFinish = async (params: LoginDto) => {
    authLogin(params)
  }

  return (
    <LoginForm logo={reactLogo} title="Base" subTitle="Billy's Base React App" onFinish={onFinish}>
      <ProFormText
        name="username"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined className={'prefixIcon'} />
        }}
        placeholder={'admin'}
        rules={[
          {
            required: true,
            message: '请输入用户名!'
          }
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />
        }}
        placeholder={'a123456'}
        rules={[
          {
            required: true,
            message: '请输入密码！'
          }
        ]}
      />
    </LoginForm>
  )
}
