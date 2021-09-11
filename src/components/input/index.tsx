import React, {
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from "react"
import "./index.less"

const labelClick = (e: any) => {
  const input = (e.target.parentNode.getElementsByTagName("input") || [])[0]
  input && input.focus()
}

interface rule {
  pattern: RegExp
  msg: string
}

interface InputState {
  value: any
  type: string
  setValue: any
  placeholder?: string
  required: boolean
  requiredMsg?: string
  rules?: rule[]
}

const Input = (props: InputState, ref: any) => {
  const {
    value,
    type,
    setValue,
    placeholder,
    required,
    requiredMsg = "",
    rules = [],
  } = props
  const [errorMsg, setErrorMsg] = useState("")

  const validate = useCallback((v: string, rules: any) => {
    if (required && !v) {
      setErrorMsg(requiredMsg || "please enter value")
      return false
    }

    if (rules.length) {
      const pass = rules.some((rule: rule) => {
        const { pattern, msg } = rule
        if (pattern.test(v)) {
          return true
        } else {
          setErrorMsg(msg)
          return false
        }
      })
      if (pass) {
        setErrorMsg("")
        return true
      } else {
        return false
      }
    } else {
      setErrorMsg("")
      return true
    }
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      validateVal: () => validate(value, rules),
    }),
    [rules]
  )

  const doSetValue = useCallback(
    (v: any) => {
      setValue(v)
      validate(v, rules)
    },
    [rules]
  )

  return (
    <div className="input-wrapper">
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        // 禁止粘贴
        onPaste={(e) => e.preventDefault()}
        onChange={(v) => {
          doSetValue(v.target.value)
        }}
      />
      <label onClick={labelClick}>{placeholder}</label>
      {errorMsg ? <div className="error">{errorMsg}</div> : null}
      {value ? (
        <i
          className="icon icon-cross"
          onClick={(e) => {
            doSetValue("")
            labelClick(e)
          }}
        />
      ) : null}
    </div>
  )
}

export default forwardRef(Input)
