import React, {
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import './index.less'

const labelClick = (e: any) => {
  const input = (e.target.parentNode.getElementsByTagName('input') || [])[0]
  input && input.focus()
}

interface Rule {
  pattern?: RegExp
  exact?: string
  required?: boolean
  max?: number
  min?: number
  msg: string
}

interface InputState {
  value: any
  type: string
  setValue: any
  placeholder?: string
  rules?: Rule[]
}

const Input = (props: InputState, ref: any) => {
  const { value, type, setValue, placeholder, rules = [] } = props
  const inputRef = useRef<any>()
  const [errorMsg, setErrorMsg] = useState('')

  const { required, msg: requiredMeg }: any = useMemo(() => {
    return rules.find((item) => item.required) || {}
  }, [rules])

  const innerRules = useMemo(() => {
    return rules.filter((item) => !item.required)
  }, [rules])

  const validate = useCallback((v: string, rules: any, required: boolean) => {
    if (required && !v) {
      setErrorMsg(requiredMeg || 'please enter value')
      return false
    }

    if (rules.length) {
      const notMatch = rules.some((rule: Rule) => {
        const { pattern, msg = 'please enter value', exact, max, min } = rule

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

        // 长度匹配
        if (max && min && (v.length <= min || v.length >= max)) {
          setErrorMsg(msg)
          return true
        } else if (max && v.length >= max) {
          setErrorMsg(msg)
          return true
        } else if (min && v.length <= min) {
          setErrorMsg(msg)
          return true
        }

        return false
      })

      if (!notMatch) {
        setErrorMsg('')
      }

      return !notMatch
    } else {
      setErrorMsg('')
      return true
    }
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      validateVal: () => validate(value, innerRules, required),
      ref: inputRef,
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
        ref={inputRef}
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
            doSetValue('')
            labelClick(e)
          }}
        />
      ) : null}
    </div>
  )
}

export default forwardRef(Input)
