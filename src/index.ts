import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const adapter = (config: AxiosRequestConfig) => {
  console.log('>>> using custom adapter')
  return axios.defaults.adapter(config)
}

export default adapter
