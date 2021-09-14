export const bindKeyDown = (func: any) => {
  document.onkeydown = null
  setTimeout(() => {
    document.onkeydown = func
  }, 300)
}

export const debounce = (action: any, idle: number) => {
  let last: any = null
  return function () {
    clearTimeout(last)
    last = setTimeout(action, idle)
  }
}
