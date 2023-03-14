import axios, { type AxiosRequestConfig, type AxiosAdapter } from 'axios'
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

const adapterEnhancer = (adapter: AxiosAdapter = axios.defaults.adapter): AxiosAdapter => {
  return (config: AxiosRequestConfig) => {
    const request = adapter(config)
    const { useAdra = true } = config
    if (!useAdra) return request
    const key = hash(config)
    const target = cache.get(key)
    if (target) return target
    cache.set(key, request)
    return request
  }
}

export default adapterEnhancer()
export { adapterEnhancer }
