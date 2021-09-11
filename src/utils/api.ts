export const requestPost = ({ url, data }: any) => {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', url)
  xhr.responseType = 'json'
  xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')

  return new Promise((resolve, reject) => {
    xhr.addEventListener('load', () => {
      const { status } = xhr
      if ((status >= 200 && status < 300) || status === 304) {
        resolve(xhr.response)
      } else {
        reject(xhr)
      }
    })
    xhr.addEventListener('error', () => {
      reject(new Error('network error'))
    })
    xhr.addEventListener('abort', () => {
      reject(new Error('request abort'))
    })

    xhr.send(JSON.stringify(data))
  })
}