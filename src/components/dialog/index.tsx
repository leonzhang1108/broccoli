import React from "react"
import './index.less'

const Dialog = (props: any) => {
  const { children, title, onConfirm, onCancel, visible } = props
  return visible ? (
    <div className="dialog-wrapper">
      <div className="dialog-content">
        <div className="dialog-title" onClick={onCancel}>
          <span>{title}</span>
          <span className="icon icon-cross" />
        </div>
        <div className="dialog-content-wrapper">{children}</div>
        <div className="dialog-btn-wrapper">
          <div className="cancel" onClick={onCancel}>Cancel</div>
          <div className="cancel" onClick={onConfirm}>Confirm</div>
        </div>
      </div>
    </div>
  ) : null
}

export default Dialog
