import React, { useState, useCallback, useRef, useMemo } from 'react'
import Layout from '@/components/app-layout'
import Button from '@/components/button'
import Dialog from '@/components/dialog'
import Input from '@/components/input'
import { requestPost } from '@/utils/api'
import './App.less'

const { Header, Footer, Content } = Layout

const emailRules = [
  {
    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    msg: 'Please enter valid email address'
  }
]

const fullNameRules = [
  {
    pattern: /^.{3,}$/,
    msg: 'Full name must be longer then 2 characters'
  }
]

const initialFormData = {
  fullName: '',
  email: '',
  confirmEmail: ''
}

const App = () => {
  const formRef = useRef<any>([])

  const [dialogVisible, setDialogVisible] = useState(false)
  const [successDialogVisible, setSuccessDialogVisible] = useState(false)
  const [requestLoading, setRequestLoading] = useState(false)

  const [formData, setFormData] = useState(initialFormData)

  const openFormDialog = useCallback(() => {
    setFormData(initialFormData)
    setDialogVisible(true)
  }, [])

  const doSetFormData = useCallback((v: any) => {
    setFormData(data => ({
      ...data,
      ...v,
    }))
  }, [])

  const onConfirm = useCallback(() => {
    const pass = formRef.current.map((item: any) => item.validateVal()).some((item: any) => item)
    if (pass) {
      const params = {
        name: formData.fullName,
        email: formData.email
      }
      setRequestLoading(true)
      requestPost({
        url: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
        data: params
      }).then(res => {
        console.log(res)
        if (res === 'Registered') {
          setDialogVisible(false)
          setSuccessDialogVisible(true)
        }
      }).finally(() => {
        setRequestLoading(false)
      })
    }
  }, [formData])

  const confirmEmailRules = useMemo(() => {
    return [
      {
        pattern: RegExp(`^${formData.email}$`, 'i'),
        msg: 'Please confirm your email address'
      }
    ]
  }, [formData.email])

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
          >
            <Input
              ref={el => (formRef.current[0] = el)}
              value={formData.fullName}
              required
              requiredMsg="Please enter your full name"
              rules={fullNameRules}
              placeholder="Full name"
              type="text"
              setValue={(v: any) => doSetFormData({ fullName: v })}
            />
            <Input
              ref={el => (formRef.current[1] = el)}
              value={formData.email}
              required
              requiredMsg="Please enter your email address"
              rules={emailRules}
              placeholder="Email"
              type="text"
              setValue={(v: any) => doSetFormData({ email: v })}
            />
            <Input
              ref={el => (formRef.current[2] = el)}
              value={formData.confirmEmail}
              required
              requiredMsg="Please enter your email address"
              rules={confirmEmailRules}
              placeholder="Confirm Email"
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
            <div>You will be one of the first to experience Broccoli & Co. when we launch. </div>
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
