interface requestProps {
  url: string
  data: any
  method: "GET" | "POST"
}

const obj2qs = function (obj: any) {
  const qs = []
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      qs.push(key + "=" + encodeURIComponent(obj[key]))
    }
  }
  return qs.join("&")
}

export const request = ({ url, data, method }: requestProps) => {
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.responseType = "json"

  switch (method) {
    case "POST":
      xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8")
      break
    case "GET":
      url += `&${obj2qs(data)}`
      break
  }

  return new Promise((resolve, reject) => {
    xhr.addEventListener("load", () => {
      const { status } = xhr
      if ((status >= 200 && status < 300) || status === 304) {
        resolve(xhr.response)
      } else {
        reject(xhr)
      }
    })
    xhr.addEventListener("error", () => {
      reject(new Error("network error"))
    })
    xhr.addEventListener("abort", () => {
      reject(new Error("request abort"))
    })

    xhr.send(JSON.stringify(data))
  })
}
