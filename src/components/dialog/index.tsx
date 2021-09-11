import React from "react"
import Button from '@/components/button'
import './index.less'

const Dialog = (props: any) => {
  const { children, title, onConfirm, onCancel, visible, loading, confirmText } = props
  return visible ? (
    <div className="dialog-wrapper">
      <div className="dialog-content">
        <div className="dialog-title">
          <span>{title}</span>
          <span className="icon icon-cross"  onClick={onCancel}/>
        </div>
        <div className="dialog-content-wrapper">{children}</div>
        <div className="dialog-btn-wrapper">
          <Button loading={loading} className="dialog-send" onClick={onConfirm}>{confirmText || 'Confirm'}</Button>
        </div>
      </div>
    </div>
  ) : null
}

export default Dialog
