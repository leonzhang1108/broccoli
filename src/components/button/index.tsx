import React from 'react'
import './index.less'

const Button = (props: any) => {
  const { children, onClick } = props
  return <div className="button" onClick={onClick}>{children}</div>
}

export default Button
