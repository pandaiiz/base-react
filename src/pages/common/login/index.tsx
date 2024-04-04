import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormText
} from '@ant-design/pro-components';
import { theme } from 'antd';
import reactLogo from '../../../assets/react.svg';
import { useTokenStore, useUserStore } from '@/stores/user.store.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default  () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const { login, loginToken } = useTokenStore((state) => ({
    login: state.login,
    loginToken: state.token
  }));

  const { userInfo, getUserInfo } = useUserStore((state) => ({
    userInfo: state.userInfo,
    getUserInfo: state.getUserInfo
  }));

  useEffect(() => {
    if (!loginToken) return;
    if (userInfo && userInfo.id) {
      navigate('/');
      return;
    }
    getUserInfo();
  }, [getUserInfo, loginToken, userInfo]);

  const onFinish = async (params: any) => {
    login(params);
  };

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          logo={reactLogo}
          title="Base"
          subTitle="Billy's Base React App"
          onFinish={onFinish}
        >
          <>
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
          </>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
