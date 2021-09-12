import React from "react"
import Button from "@/components/button"
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

  return visible ? (
    <div className="dialog-wrapper">
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
