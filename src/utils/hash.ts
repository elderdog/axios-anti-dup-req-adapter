import path from 'path'
import crypto from 'crypto'
import type { Method, ResponseType, AxiosRequestConfig } from 'axios'
import { sortedParamsString, sortedDataStringOrBuffer } from './params'

const md5 = (data: string | Buffer) => {
  return crypto.createHash('md5').update(data).digest('hex')
}

interface HashInitial {
  url: string
  method: Method
  params?: any
  data?: any
  responseType?: ResponseType
}

abstract class HashInitial {
  constructor(initial: HashInitial) {
    Object.assign(this, { ...initial })
  }
}

class Hash extends HashInitial {
  private getParamsHashCode() {
    const sortedString = sortedParamsString(this.params)
    return md5(sortedString)
  }

  private getDataHashCode() {
    const strOrBuf = sortedDataStringOrBuffer(this.data)
    return md5(strOrBuf)
  }

  getCode() {
    const url = this.url.toLowerCase()
    const method = this.method.toLowerCase()
    const signature = [url, method, this.getParamsHashCode(), this.getDataHashCode(), this.responseType].join()
    return md5(signature)
  }
}

const hash = (config: AxiosRequestConfig) => {
  const { baseURL, url, method, params, data, responseType } = config
  const result = new Hash({
    url: path.join(baseURL, url),
    method,
    params,
    data,
    responseType
  })
  return result.getCode()
}

export default hash
