import axios, { type AxiosRequestConfig } from 'axios'
import hash from './utils/hash'
import cache from './utils/cache'

const adapter = (config: AxiosRequestConfig) => {
  const key = hash(config)
  const target = cache.get(key)
  if (target) return target
  const request = axios.defaults.adapter(config)
  cache.set(key, request)
  return request
}

export default adapter
