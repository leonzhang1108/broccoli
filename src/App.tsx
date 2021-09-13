import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react'
import Layout from '@/components/app-layout'
import Button from '@/components/button'
import Dialog from '@/components/dialog'
import Input from '@/components/input'
import { request } from '@/utils/api'
import { bindKeyDown } from '@/utils'
import './App.less'

const { Header, Footer, Content } = Layout

const emailRules = [
  {
    required: true,
    msg: 'Please enter your email address',
  },
  {
    pattern:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    msg: 'Please enter valid email address',
  },
  {
    max: 50,
    msg: 'Your email address is too long',
  },
]

const fullNameRules = [
  {
    required: true,
    msg: 'Please enter your full name',
  },
  {
    pattern: /^.{3,}$/,
    msg: 'Full name needs to be least 3 characters',
  },
  {
    max: 25,
    msg: 'Your name is too long',
  },
]

const initialFormData = {
  fullName: '',
  email: '',
  confirmEmail: '',
}

const App = () => {
  const formRef = useRef<any>([])

  const [dialogVisible, setDialogVisible] = useState(false)
  const [successDialogVisible, setSuccessDialogVisible] = useState(false)
  const [requestLoading, setRequestLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<any>('')
  const [formData, setFormData] = useState(initialFormData)

  // 打开 invite 对话框
  const openFormDialog = useCallback(() => {
    setFormData(initialFormData)
    setErrorMsg('')
    setDialogVisible(true)
    setTimeout(() => {
      ;((formRef?.current || [])[0] || {}).ref?.current?.focus()
    }, 300)
  }, [])

  // 设置 form 表单值
  const doSetFormData = useCallback((v: any) => {
    setFormData((data) => ({
      ...data,
      ...v,
    }))
  }, [])

  // 确认发送
  const onConfirm = useCallback(() => {
    const pass = formRef.current
      .map((item: any) => item?.validateVal())
      .every((item: any) => item)
    if (pass) {
      // set blur
      ;(formRef?.current || []).forEach((item: any) => {
        const { ref } = item || {}
        ref?.current?.blur()
      })
      const params = {
        name: formData.fullName,
        email: formData.email,
      }
      setRequestLoading(true)
      request({
        url: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
        data: params,
        method: 'POST',
      })
        .then((res: any) => {
          if (res === 'Registered') {
            setDialogVisible(false)
            setSuccessDialogVisible(true)
          }
        })
        .catch((error: any) => {
          if (error instanceof Error) {
            setErrorMsg(error?.message)
          } else if (error instanceof XMLHttpRequest) {
            setErrorMsg(error?.response?.errorMessage)
          }
        })
        .finally(() => {
          setRequestLoading(false)
        })
    }
  }, [formData])

  // 验证 emial 规则
  const confirmEmailRules = useMemo(() => {
    return [
      {
        required: true,
        msg: 'Please enter your email address',
      },
      {
        exact: formData.email,
        msg: 'Please confirm your email address',
      },
      {
        max: 50,
        msg: 'Your email address is too long',
      },
    ]
  }, [formData.email])

  // 绑定回车事件
  useEffect(() => {
    if (!dialogVisible && !successDialogVisible) {
      // 回车打开 form 对话框
      bindKeyDown((e: any) => {
        switch (e.keyCode) {
          case 13:
            openFormDialog()
            break
          default:
        }
      })
    }
    return () => {
      document.onkeydown = null
    }
  }, [dialogVisible, successDialogVisible, requestLoading])

  return (
    <Layout className="app-wrapper">
      <Header>
        <div className="title">BROCCOLI & CO.</div>
      </Header>
      <Content>
        <div className="main-content">
          <div className="slogan">
            <div>A better way</div>
            <div>to enjoy every day. </div>
          </div>
          <div className="hint">Be the first to know when we launch. </div>
          <Button onClick={openFormDialog}>Request an invite</Button>
          <Dialog
            title="Request an invite"
            confirmText={requestLoading ? 'Sending, please wait...' : 'Send'}
            visible={dialogVisible}
            setVisible={setDialogVisible}
            loading={requestLoading}
            onConfirm={onConfirm}
            onCancel={() => setDialogVisible(false)}
            errorMsg={errorMsg}
          >
            <Input
              ref={(el) => (formRef.current[0] = el)}
              value={formData.fullName}
              rules={fullNameRules}
              placeholder="Full name"
              type="text"
              setValue={(v: any) => doSetFormData({ fullName: v })}
            />
            <Input
              ref={(el) => (formRef.current[1] = el)}
              value={formData.email}
              rules={emailRules}
              placeholder="Email"
              type="text"
              setValue={(v: any) => doSetFormData({ email: v })}
            />
            <Input
              ref={(el) => (formRef.current[2] = el)}
              value={formData.confirmEmail}
              rules={confirmEmailRules}
              placeholder="Confirm email"
              type="text"
              setValue={(v: any) => doSetFormData({ confirmEmail: v })}
            />
          </Dialog>
          <Dialog
            title="All done! "
            confirmText="OK"
            visible={successDialogVisible}
            setVisible={setSuccessDialogVisible}
            onConfirm={() => setSuccessDialogVisible(false)}
            onCancel={() => setSuccessDialogVisible(false)}
          >
            <div style={{ textAlign: 'center', width: '20rem' }}>
              You will be one of the first to experience Broccoli & Co. when we
              launch.
            </div>
          </Dialog>
        </div>
      </Content>
      <Footer>
        <div className="copy-right">
          <div>Made with ❤ in Melbourne</div>
          <div>© 2016 Broccoli & Co. All rights reserved.</div>
        </div>
      </Footer>
    </Layout>
  )
}

export default App
