import Footer from '@/components/Footer';
import {login, loginMailCheck, loginMailSend} from '@/services/ant-design-pro/api';
import {LockOutlined, MailOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-form';
import {Divider, FormInstance, message, Tabs} from 'antd';
import React, {useRef, useState} from 'react';
import {history, Link} from 'umi';
import styles from './index.less';
import {SYSTEM_LOGO} from "@/constants";
import {useModel} from "@@/plugin-model/useModel";
import {ProFormCaptcha} from "@ant-design/pro-form";

const Login: React.FC = () => {
  // const [setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  const formRef = useRef<FormInstance>();
  const mailRegex = /^[A-Za-z0-9+_.-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,8}$/;

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };
  const handleSubmit = async (values: API.LoginParams | API.LoginWithMailParams) => {
    try {
      let data;
      // 登录
      if (type === 'account') {
        data = await login({
          ...values,
        });
      } else if (type === 'mail') {
        data = await loginMailCheck({
          ...values,
        });
      }
      if (data) {
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location;
        const {redirect} = query as {
          redirect: string;
        };
        history.push(redirect || '/welcome');
        // setUserLoginState(data);
        return;
      }
    } catch (error) {
      message.error('登录失败，请重试！');
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src={SYSTEM_LOGO}/>}
          title="Project Helper"
          subTitle={<a>Project Helper是您最好的Project助手</a>}
          formRef={formRef}
          onFinish={async (values: any) => {
            if (type === 'account') {
              await handleSubmit(values as API.LoginParams);
            } else if (type === 'mail') {
              await handleSubmit(values as API.LoginWithMailParams);
            }
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'学工号密码登录'}/>
            <Tabs.TabPane key="mail" tab={'邮箱验证码登录'}/>
          </Tabs>

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入学工号'}
                rules={[
                  {
                    required: true,
                    message: '学工号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入密码 (初始密码与学工号相同)'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}
          {type === 'mail' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined className={styles.prefixIcon} />,
                }}
                name="mailAddress"
                placeholder={'请输入邮箱'}
                rules={[
                  {
                    required: true,
                    message: '邮箱是必填项！',
                  },
                  {
                    pattern: mailRegex,
                    message: '邮箱格式不正确！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'秒后重新获取'}`;
                  }
                  return '获取验证码';
                }}
                name="verificationCode"
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项！',
                  },
                ]}
                onGetCaptcha={async () => {
                  try {
                    const mailAddress = formRef.current?.getFieldValue('mailAddress')
                    // 校验邮箱格式
                    if (!mailRegex.test(mailAddress)) {
                      message.error('邮箱格式不正确！');
                      return Promise.reject('邮箱格式不正确');
                    }
                    const result = await loginMailSend(mailAddress);
                    // @ts-ignore
                    if (result === null || result === false) {
                      // 获取验证码失败，不启动倒计时
                      return Promise.reject('获取验证码失败');
                    } else {
                      // 获取验证码成功，返回一个成功的promise以启动倒计时
                      return Promise.resolve();
                    }
                  } catch (error) {
                    // 处理异常情况，不启动倒计时
                    return Promise.reject('获取验证码过程中出现错误');
                  }
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <a>
              忘记密码?那就忘了吧
            </a>
            <Divider type={"vertical"}/>
            <Link
              style={{
                float: 'right',
              }}
              to={"/user/register"}
            >
              注册新用户
            </Link>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Login;
