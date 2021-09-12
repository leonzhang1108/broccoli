import React from "react"
import classnames from "classnames"
import "./index.less"

interface LayoutProps {
  children: React.ReactNode | Element
  className?: string
}

const Layout = (props: LayoutProps) => {
  const { children, className } = props
  return (
    <div className={classnames("app-layout-wrapper", className)}>
      {children}
    </div>
  )
}

Layout.Header = (props: LayoutProps) => {
  const { children, className } = props
  return (
    <div className={classnames("app-layout-header", className)}>{children}</div>
  )
}

Layout.Footer = (props: LayoutProps) => {
  const { children, className } = props
  return (
    <div className={classnames("app-layout-footer", className)}>{children}</div>
  )
}

Layout.Content = (props: LayoutProps) => {
  const { children, className } = props
  return (
    <div className={classnames("app-layout-content", className)}>
      {children}
    </div>
  )
}

export default Layout
