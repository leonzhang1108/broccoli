import React, { useEffect, useState } from "react"
import Button from "@/components/button"
import classnames from "classnames"
import { bindKeyDown } from "@/utils"
import "./index.less"

interface DialogProps {
  children: React.ReactNode | Element
  title: string
  onConfirm: any
  onCancel: any
  setVisible: any
  visible: boolean
  loading?: boolean
  confirmText: string
  errorMsg?: string
}

const Dialog = (props: DialogProps) => {
  const {
    children,
    title,
    onConfirm,
    onCancel,
    visible,
    loading,
    confirmText,
    errorMsg,
  } = props

  const [isClosing, setIsClosing] = useState(false)
  const [innerVisible, setInnerVisible] = useState(false)

  useEffect(() => {
    if (visible) {
      setIsClosing(false)
      setInnerVisible(visible)
    } else {
      setIsClosing(true)
      setTimeout(() => {
        setInnerVisible(visible)
        setInnerVisible(false)
      }, 300)
    }
  }, [visible])

  // 绑定回车按钮
  useEffect(() => {
    if (visible && !loading) {
      bindKeyDown((e: any) => {
        switch (e.keyCode) {
          case 13:
            onConfirm && onConfirm()
            break
          case 27:
            onCancel && onCancel()
            break
          default:
        }
      })
    }
    return () => {
      document.onkeydown = null
    }
  }, [visible, loading, onConfirm])

  return innerVisible ? (
    <div className={classnames("dialog-wrapper", { closing: isClosing })}>
      <div className="dialog-content">
        <div className="dialog-title-wrapper">
          <span className="dialog-title">{title}</span>
          <span className="icon icon-cross" onClick={onCancel} />
        </div>
        <div className="dialog-content-wrapper">{children}</div>
        <div className="dialog-btn-wrapper">
          <Button loading={loading} className="dialog-send" onClick={onConfirm}>
            {confirmText || "Confirm"}
          </Button>
          {errorMsg ? <div className="dialog-error">{errorMsg}</div> : null}
        </div>
        {loading ? (
          <div className="loading-mask">
            <span className="icon icon-loading"></span>
          </div>
        ) : null}
      </div>
    </div>
  ) : null
}

export default Dialog
