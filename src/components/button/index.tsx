import React, { useCallback } from "react"
import classnames from "classnames"
import "./index.less"

const Button = (props: any) => {
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
