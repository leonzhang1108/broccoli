import React from "react"
import classnames from "classnames"
import "./index.less"

const Layout = (props: any) => {
  const { children, className } = props
  return (
    <div className={classnames("app-layout-wrapper", className)}>
      {children}
    </div>
  )
}


Layout.Header = (props: any) => {
  const { children, className } = props
  return (
    <div className={classnames("app-layout-header", className)}>{children}</div>
  )
}

Layout.Footer = (props: any) => {
  const { children, className } = props
  return (
    <div className={classnames("app-layout-footer", className)}>{children}</div>
  )
}

Layout.Content = (props: any) => {
  const { children, className } = props
  return (
    <div className={classnames("app-layout-content", className)}>
      {children}
    </div>
  )
}

export default Layout
