import React, { useRef, useEffect, useState } from 'react'
import classnames from 'classnames'
import initWebGL from './webGL'
import { debounce } from '@/utils'
import './index.less'

const Background = (props: any) => {
  const { className, children } = props
  const [size, setSize] = useState({
    height: 0,
    width: 0,
  })

  const wrapper = useRef<any>()
  const canvas = useRef<any>()
  const cancel = useRef<any>()

  useEffect(() => {
    function onResize() {
      const { offsetHeight: height, offsetWidth: width } = wrapper.current || {}
      setSize({
        height,
        width,
      })
    }
    onResize()
    window.onresize = debounce(onResize, 300)
    return () => {
      cancel.current && cancel.current()
      window.onresize = null
    }
  }, [])

  useEffect(() => {
    cancel.current && cancel.current()
    cancel.current = initWebGL(canvas.current, false)
  }, [size])

  return (
    <div className={classnames('bg-wrapper', className)} ref={wrapper}>
      <div className="bg-content">{children}</div>
      <canvas ref={canvas} height={size.height} width={size.width} />
    </div>
  )
}

export default Background
