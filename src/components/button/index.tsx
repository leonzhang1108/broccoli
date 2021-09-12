import React, { useCallback } from "react"
import classnames from "classnames"
import "./index.less"

interface ButtonProps {
  children: React.ReactChild
  onClick: any
  className?: string
  loading?: boolean
}

const Button = (props: ButtonProps) => {
  const { children, onClick, className, loading } = props

  const doOnClick = useCallback(() => {
    !loading && onClick()
  }, [loading, onClick])

  return (
    <div
      className={classnames("button", className, { loading })}
      onClick={doOnClick}
    >
      {children}
    </div>
  )
}

export default Button
