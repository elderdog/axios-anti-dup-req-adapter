import axios, { type AxiosRequestConfig } from 'axios'
import hash from './utils/hash'
import cache from './utils/cache'

declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * Whether or not to use cache, default to `true`
     */
    useAdra?: boolean
  }
}

const adapter = (config: AxiosRequestConfig) => {
  const request = axios.defaults.adapter(config)
  const { useAdra = true } = config
  if (!useAdra) return request
  const key = hash(config)
  const target = cache.get(key)
  if (target) return target
  cache.set(key, request)
  return request
}

export default adapter
