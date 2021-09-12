import React, {
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
} from "react"
import "./index.less"

const labelClick = (e: any) => {
  const input = (e.target.parentNode.getElementsByTagName("input") || [])[0]
  input && input.focus()
}

interface rule {
  pattern?: RegExp
  exact?: string
  required?: boolean
  msg: string
}

interface InputState {
  value: any
  type: string
  setValue: any
  placeholder?: string
  rules?: rule[]
}

const Input = (props: InputState, ref: any) => {
  const { value, type, setValue, placeholder, rules = [] } = props
  const [errorMsg, setErrorMsg] = useState("")

  const { required, msg: requiredMeg }: any = useMemo(() => {
    return rules.find((item) => item.required)
  }, [rules])

  const innerRules = useMemo(() => {
    return rules.filter((item) => !item.required)
  }, [rules])

  const validate = useCallback((v: string, rules: any, required: boolean) => {
    if (required && !v) {
      setErrorMsg(requiredMeg || "please enter value")
      return false
    }

    if (rules.length) {
      const notMatch = rules.some((rule: rule) => {
        const { pattern, msg = "please enter value", exact } = rule

        // 正则匹配
        if (pattern && !pattern.test(v)) {
          setErrorMsg(msg)
          return true
        }

        // 完全匹配
        if (exact && exact !== v) {
          setErrorMsg(msg)
          return true
        }

        return false
      })

      if (!notMatch) {
        setErrorMsg("")
      }

      return !notMatch
    } else {
      setErrorMsg("")
      return true
    }
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      validateVal: () => validate(value, innerRules, required),
    }),
    [innerRules, required]
  )

  const doSetValue = useCallback(
    (v: any) => {
      setValue(v)
      validate(v, innerRules, required)
    },
    [innerRules, required]
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
