import { getCode } from '@/request/api'
import { userAsync } from '@/store/async'
import { RequestLoginParams } from '@/types'
import {
  HeartFilled,
  LockOutlined,
  MailOutlined,
  RedditCircleFilled,
  SlackCircleFilled,
  TwitterCircleFilled
} from '@ant-design/icons'
import { LoginForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-form'
import { Button, Form, FormInstance, Modal, Space, Tabs, message } from 'antd'
import { useState } from 'react'

type Props = {
  open: boolean
  onCancel: () => void
}

type LoginType = 'code' | 'password' | string;

export function LoginCard(props: {
  form: FormInstance<RequestLoginParams>
  onSuccess: () => void
}) {

  const [loginType, setLoginType] = useState<LoginType>('code');

  return (
    <LoginForm
      form={props.form}
      // logo={import.meta.env.VITE_APP_LOGO}
      title=""
      subTitle="您身边的的人工智能对话"
      // actions={(
      //   <Space>
      //     <HeartFilled />
      //     <RedditCircleFilled />
      //     <SlackCircleFilled />
      //     <TwitterCircleFilled />
      //   </Space>
      // )}
      contentStyle={{
        width: '100%',
        maxWidth: '340px',
        minWidth: '100px'
      }}
      submitter={false}
      onFinish={async (e) => {
        return new Promise((resolve, reject) => {
          console.log(1)
          userAsync
            .fetchLogin({ ...e })
            .then((res) => {
              if (res.code) {
                reject(false)
                return
              }
              props.onSuccess?.()
              resolve(true)
            })
            .catch(() => {
              reject(false)
            })
        })
      }}
    >
      <Tabs
        centered
        activeKey={loginType}
        onChange={(activeKey) => {
          setLoginType(activeKey)
        }}
      >
        <Tabs.TabPane key="code" tab="登录/注册" />
        <Tabs.TabPane key="password" tab="密码登录" />
      </Tabs>
      <ProFormText
        fieldProps={{
          size: 'large',
          prefix: <MailOutlined />
        }}
        name="account"
        placeholder="用户名"
        rules={[
          {
            required: true,
            message: '请输入用户名',
            // pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
          }
        ]}
      />
      {
        loginType === 'code' && (
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: '8位及以上至少包含一个字母和一个数字',
                pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
              },
            ]}
          />
        )
      }
      {
        loginType === 'password' && (
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: '8位及以上至少包含一个字母和一个数字',
                pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
              },
            ]}
          />
        )
      }
      {loginType === 'password' && (
        <Button style={{ width: '100%' }} type="primary" onClick={
          async () => {
            const values = await props.form.validateFields()
            console.log(values)
            return new Promise((resolve, reject) => {
              console.log(1)
              userAsync
                .fetchLogin({ ...values })
                .then((res) => {
                  if (res.code) {
                    reject(false)
                    return
                  }
                  localStorage.setItem('id', res?.data?.id?.toString())
                  props.onSuccess?.()
                  resolve(true)
                })
                .catch(() => {
                  reject(false)
                })
            })
          }
        }
        >登录
        </Button>
      )}
      {loginType === 'code' && (
        <Button style={{ width: '100%' }} type="primary" onClick={
          async () => {
            const values = await props.form.validateFields()
            console.log(values)
            return new Promise((resolve, reject) => {
              console.log(1)
              userAsync
                .fetchRegistry({ ...values })
                .then((res) => {
                  if (res.code) {
                    reject(false)
                    return
                  }
                  message.success(res?.data?.toString())
                  // props.onSuccess?.()
                  resolve(true)
                })
                .catch(() => {
                  reject(false)
                })
            })
          }
        }
        >注册
        </Button>
      )}
      <div
        style={{
          marginBlockEnd: 24
        }}
      />
    </LoginForm>
  )
}

// 登录注册弹窗
function LoginModal(props: Props) {
  const [loginForm] = Form.useForm()

  const onCancel = () => {
    props.onCancel()
    loginForm.resetFields()
  }

  return (
    <Modal open={props.open} footer={null} destroyOnClose onCancel={onCancel}>
      <LoginCard form={loginForm} onSuccess={onCancel} />
    </Modal>
  )
}

export default LoginModal
