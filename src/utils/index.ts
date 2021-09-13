export const bindKeyDown = (func: any) => {
  document.onkeydown = null
  setTimeout(() => {
    document.onkeydown = func
  }, 300)
}
