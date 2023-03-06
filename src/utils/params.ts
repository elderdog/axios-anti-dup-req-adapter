export const isURLSearchParams = (params: any) => {
  return typeof URLSearchParams !== 'undefined' && params instanceof URLSearchParams
}

export const sortedParamsString = (params: any) => {
  if (!params) return ''
  if (typeof params === 'string') {
    params = new URLSearchParams(params)
  }
  let entries: [string, unknown][]
  if (isURLSearchParams(params)) {
    entries = Array.from((params as URLSearchParams).entries())
  } else {
    entries = Object.entries(params)
  }
  const obj = Object.fromEntries(entries.sort())
  return JSON.stringify(obj)
}

export const sortedDataStringOrBuffer = (data: any): string | Buffer => {
  if (!data) return ''
  if (data instanceof Buffer) {
    return data
  }
  if (data instanceof ArrayBuffer) {
    return Buffer.from(data)
  }
  const entries = Array.from(new URLSearchParams(data).entries())
  const obj = Object.fromEntries(entries.sort())
  return JSON.stringify(obj)
}
